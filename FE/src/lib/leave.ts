import api from './api';
import { Leave, CreateLeaveRequest, LeaveSummary } from '@/types/leave';

export const leaveService = {
  async getAll(): Promise<Leave[]> {
    const response = await api.get('/leaves');
    return response.data;
  },

  async create(leaveData: CreateLeaveRequest): Promise<Leave> {
    const response = await api.post('/leaves', leaveData);
    return response.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/leaves/${id}`);
  },

  async getSummary(): Promise<LeaveSummary> {
    const response = await api.get('/leaves/summary');
    return response.data;
  },

  async getLeavesByMonth(year: number, month: number): Promise<Leave[]> {
    const response = await api.get(`/leaves/month/${year}/${month}`);
    return response.data;
  },
};
