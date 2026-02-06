import { LeaveType } from '../schemas/leave.schema';
export declare class CreateLeaveDto {
    startDate: string;
    endDate: string;
    days: number;
    type: LeaveType;
    reason: string;
}
