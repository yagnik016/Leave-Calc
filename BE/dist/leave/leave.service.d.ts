import { Model } from 'mongoose';
import { Leave, LeaveDocument } from './schemas/leave.schema';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { UsersService } from '../users/users.service';
export declare class LeaveService {
    private leaveModel;
    private usersService;
    constructor(leaveModel: Model<LeaveDocument>, usersService: UsersService);
    create(createLeaveDto: CreateLeaveDto, userId: string): Promise<Leave>;
    findAll(userId: string): Promise<Leave[]>;
    findOne(id: string, userId: string): Promise<Leave | null>;
    remove(id: string, userId: string): Promise<void>;
    getLeaveSummary(userId: string): unknown;
    getLeavesByMonth(userId: string, year: number, month: number): unknown;
}
