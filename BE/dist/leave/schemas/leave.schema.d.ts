import { Document } from 'mongoose';
export type LeaveDocument = Leave & Document;
export declare enum LeaveType {
    PAID = "paid",
    UNPAID = "unpaid",
    SICK = "sick"
}
export declare class Leave {
    userId: string;
    startDate: Date;
    endDate: Date;
    days: number;
    type: LeaveType;
    reason: string;
    createdAt: Date;
}
export declare const LeaveSchema: any;
