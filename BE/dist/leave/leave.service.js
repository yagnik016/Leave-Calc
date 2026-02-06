"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const leave_schema_1 = require("./schemas/leave.schema");
const users_service_1 = require("../users/users.service");
let LeaveService = class LeaveService {
    constructor(leaveModel, usersService) {
        this.leaveModel = leaveModel;
        this.usersService = usersService;
    }
    async create(createLeaveDto, userId) {
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
    async findAll(userId) {
        return this.leaveModel.find({ userId }).sort({ createdAt: -1 }).exec();
    }
    async findOne(id, userId) {
        return this.leaveModel.findOne({ _id: id, userId }).exec();
    }
    async remove(id, userId) {
        const result = await this.leaveModel.deleteOne({ _id: id, userId }).exec();
        if (result.deletedCount === 0) {
            throw new Error('Leave not found or unauthorized');
        }
    }
    async getLeaveSummary(userId) {
        const currentYear = new Date().getFullYear();
        const startOfYear = new Date(currentYear, 0, 1);
        const endOfYear = new Date(currentYear, 11, 31);
        const user = await this.usersService.findById(userId);
        if (!user) {
            throw new Error('User not found');
        }
        const currentMonth = new Date().getMonth() + 1;
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
    async getLeavesByMonth(userId, year, month) {
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0);
        return this.leaveModel.find({
            userId,
            $or: [
                { startDate: { $gte: startDate, $lte: endDate } },
                { endDate: { $gte: startDate, $lte: endDate } },
            ],
        }).exec();
    }
};
exports.LeaveService = LeaveService;
exports.LeaveService = LeaveService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(leave_schema_1.Leave.name)),
    __metadata("design:paramtypes", [typeof (_a = typeof mongoose_2.Model !== "undefined" && mongoose_2.Model) === "function" ? _a : Object, users_service_1.UsersService])
], LeaveService);
//# sourceMappingURL=leave.service.js.map