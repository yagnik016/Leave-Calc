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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaveSchema = exports.Leave = exports.LeaveType = void 0;
const mongoose_1 = require("@nestjs/mongoose");
var LeaveType;
(function (LeaveType) {
    LeaveType["PAID"] = "paid";
    LeaveType["UNPAID"] = "unpaid";
    LeaveType["SICK"] = "sick";
})(LeaveType || (exports.LeaveType = LeaveType = {}));
let Leave = class Leave {
};
exports.Leave = Leave;
__decorate([
    (0, mongoose_1.Prop)({ required: true, type: 'ObjectId', ref: 'User' }),
    __metadata("design:type", String)
], Leave.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Leave.prototype, "startDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], Leave.prototype, "endDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, min: 0.5 }),
    __metadata("design:type", Number)
], Leave.prototype, "days", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true, enum: LeaveType, default: LeaveType.PAID }),
    __metadata("design:type", String)
], Leave.prototype, "type", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Leave.prototype, "reason", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], Leave.prototype, "createdAt", void 0);
exports.Leave = Leave = __decorate([
    (0, mongoose_1.Schema)()
], Leave);
exports.LeaveSchema = mongoose_1.SchemaFactory.createForClass(Leave);
//# sourceMappingURL=leave.schema.js.map