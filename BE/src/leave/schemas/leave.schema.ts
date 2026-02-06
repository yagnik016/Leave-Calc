import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type LeaveDocument = Leave & Document;

export enum LeaveType {
  PAID = 'paid',
  UNPAID = 'unpaid',
  SICK = 'sick',
}

@Schema()
export class Leave {
  @Prop({ required: true, type: 'ObjectId', ref: 'User' })
  userId: string;

  @Prop({ required: true })
  startDate: Date;

  @Prop({ required: true })
  endDate: Date;

  @Prop({ required: true, min: 0.5 })
  days: number;

  @Prop({ required: true, enum: LeaveType, default: LeaveType.PAID })
  type: LeaveType;

  @Prop({ required: true })
  reason: string;

  @Prop({ default: Date.now })
  createdAt: Date;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);
