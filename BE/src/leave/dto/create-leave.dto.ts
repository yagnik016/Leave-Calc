import { IsDateString, IsEnum, IsNotEmpty, IsNumber, Min, Max } from 'class-validator';
import { LeaveType } from '../schemas/leave.schema';

export class CreateLeaveDto {
  @IsDateString()
  @IsNotEmpty()
  startDate: string;

  @IsDateString()
  @IsNotEmpty()
  endDate: string;

  @IsNumber()
  @Min(0.5)
  @Max(365)
  days: number;

  @IsEnum(LeaveType)
  @IsNotEmpty()
  type: LeaveType;

  @IsNotEmpty()
  reason: string;
}
