import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Leave, LeaveDocument } from './schemas/leave.schema';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class LeaveService {
  constructor(
    @InjectModel(Leave.name) private leaveModel: Model<LeaveDocument>,
    private usersService: UsersService,
  ) {}

  async create(createLeaveDto: CreateLeaveDto, userId: string): Promise<Leave> {
    // Check if user has enough leave balance
    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const summary = await this.getLeaveSummary(userId);
    
    if (createLeaveDto.type === 'paid' && summary.remaining < createLeaveDto.days) {
      throw new Error('Insufficient leave balance');
    }

    const leave = new this.leaveModel({
      ...createLeaveDto,
      userId,
      startDate: new Date(createLeaveDto.startDate),
      endDate: new Date(createLeaveDto.endDate),
    });

    return leave.save();
  }

  async findAll(userId: string): Promise<Leave[]> {
    return this.leaveModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async findOne(id: string, userId: string): Promise<Leave | null> {
    return this.leaveModel.findOne({ _id: id, userId }).exec();
  }

  async remove(id: string, userId: string): Promise<void> {
    const result = await this.leaveModel.deleteOne({ _id: id, userId }).exec();
    if (result.deletedCount === 0) {
      throw new Error('Leave not found or unauthorized');
    }
  }

  async getLeaveSummary(userId: string) {
    const currentYear = new Date().getFullYear();
    const startOfYear = new Date(currentYear, 0, 1);
    const endOfYear = new Date(currentYear, 11, 31);

    const user = await this.usersService.findById(userId);
    if (!user) {
      throw new Error('User not found');
    }

    const currentMonth = new Date().getMonth() + 1; // 1-12
    const accruedLeaves = Math.min(currentMonth * 1.5, user.yearlyLeaveQuota);

    const leaves = await this.leaveModel.find({
      userId,
      startDate: { $gte: startOfYear, $lte: endOfYear },
    }).exec();

    const takenLeaves = leaves.reduce((total, leave) => {
      if (leave.type === 'paid') {
        return total + leave.days;
      }
      return total;
    }, 0);

    const remaining = Math.max(0, accruedLeaves - takenLeaves);

    return {
      yearlyQuota: user.yearlyLeaveQuota,
      accrued: accruedLeaves,
      taken: takenLeaves,
      remaining,
      currentMonth,
      currentYear,
    };
  }

  async getLeavesByMonth(userId: string, year: number, month: number) {
    const startDate = new Date(year, month - 1, 1);
    const endDate = new Date(year, month, 0); // Last day of the month

    return this.leaveModel.find({
      userId,
      $or: [
        { startDate: { $gte: startDate, $lte: endDate } },
        { endDate: { $gte: startDate, $lte: endDate } },
      ],
    }).exec();
  }
}
