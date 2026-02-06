import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
export declare class LeaveController {
    private readonly leaveService;
    constructor(leaveService: LeaveService);
    create(createLeaveDto: CreateLeaveDto, req: any): unknown;
    findAll(req: any): unknown;
    getSummary(req: any): unknown;
    getLeavesByMonth(year: number, month: number, req: any): unknown;
    findOne(id: string, req: any): unknown;
    remove(id: string, req: any): unknown;
}
