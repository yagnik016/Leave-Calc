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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    async register(registerDto) {
        const existingUser = await this.usersService.findByEmail(registerDto.email);
        if (existingUser) {
            throw new Error('User with this email already exists');
        }
        const user = await this.usersService.create({
            ...registerDto,
            yearlyLeaveQuota: 18,
        });
        const payload = { sub: user._id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user._id,
                email: user.email,
                yearlyLeaveQuota: user.yearlyLeaveQuota,
            },
        };
    }
    async login(loginDto) {
        const user = await this.usersService.findByEmail(loginDto.email);
        if (!user) {
            throw new Error('Invalid credentials');
        }
        const isPasswordValid = await this.usersService.validatePassword(loginDto.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid credentials');
        }
        const payload = { sub: user._id, email: user.email };
        return {
            access_token: this.jwtService.sign(payload),
            user: {
                id: user._id,
                email: user.email,
                yearlyLeaveQuota: user.yearlyLeaveQuota,
            },
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService, typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object])
], AuthService);
//# sourceMappingURL=auth.service.js.map