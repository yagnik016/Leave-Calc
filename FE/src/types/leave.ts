export enum LeaveType {
  PAID = 'paid',
  UNPAID = 'unpaid',
  SICK = 'sick',
}

export interface Leave {
  _id: string;
  userId: string;
  startDate: string;
  endDate: string;
  days: number;
  type: LeaveType;
  reason: string;
  createdAt: string;
}

export interface CreateLeaveRequest {
  startDate: string;
  endDate: string;
  days: number;
  type: LeaveType;
  reason: string;
}

export interface LeaveSummary {
  yearlyQuota: number;
  accrued: number;
  taken: number;
  remaining: number;
  currentMonth: number;
  currentYear: number;
}
