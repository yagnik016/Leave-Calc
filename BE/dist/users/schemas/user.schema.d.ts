import { Document } from 'mongoose';
export type UserDocument = User & Document;
export declare class User {
    email: string;
    password: string;
    yearlyLeaveQuota: number;
    createdAt: Date;
}
export declare const UserSchema: any;
