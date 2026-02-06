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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveController = void 0;
const common_1 = require("@nestjs/common");
const leave_service_1 = require("./leave.service");
const create_leave_dto_1 = require("./dto/create-leave.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let LeaveController = class LeaveController {
    constructor(leaveService) {
        this.leaveService = leaveService;
    }
    async create(createLeaveDto, req) {
        try {
            return await this.leaveService.create(createLeaveDto, req.user.userId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async findAll(req) {
        return this.leaveService.findAll(req.user.userId);
    }
    async getSummary(req) {
        try {
            return await this.leaveService.getLeaveSummary(req.user.userId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async getLeavesByMonth(year, month, req) {
        return this.leaveService.getLeavesByMonth(req.user.userId, year, month);
    }
    async findOne(id, req) {
        const leave = await this.leaveService.findOne(id, req.user.userId);
        if (!leave) {
            throw new common_1.HttpException('Leave not found', common_1.HttpStatus.NOT_FOUND);
        }
        return leave;
    }
    async remove(id, req) {
        try {
            await this.leaveService.remove(id, req.user.userId);
            return { message: 'Leave deleted successfully' };
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.NOT_FOUND);
        }
    }
};
exports.LeaveController = LeaveController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_leave_dto_1.CreateLeaveDto, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('summary'),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "getSummary", null);
__decorate([
    (0, common_1.Get)('month/:year/:month'),
    __param(0, (0, common_1.Param)('year')),
    __param(1, (0, common_1.Param)('month')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "getLeavesByMonth", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LeaveController.prototype, "remove", null);
exports.LeaveController = LeaveController = __decorate([
    (0, common_1.Controller)('leaves'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [leave_service_1.LeaveService])
], LeaveController);
//# sourceMappingURL=leave.controller.js.map