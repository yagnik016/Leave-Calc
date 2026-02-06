import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
declare const JwtStrategy_base: any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersService;
    constructor(configService: ConfigService, usersService: UsersService);
    validate(payload: any): unknown;
}
export {};
