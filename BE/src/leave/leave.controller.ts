import { Controller, Get, Post, Delete, Param, Body, UseGuards, Request, HttpException, HttpStatus } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('leaves')
@UseGuards(JwtAuthGuard)
export class LeaveController {
  constructor(private readonly leaveService: LeaveService) {}

  @Post()
  async create(@Body() createLeaveDto: CreateLeaveDto, @Request() req) {
    try {
      return await this.leaveService.create(createLeaveDto, req.user.userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async findAll(@Request() req) {
    return this.leaveService.findAll(req.user.userId);
  }

  @Get('summary')
  async getSummary(@Request() req) {
    try {
      return await this.leaveService.getLeaveSummary(req.user.userId);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get('month/:year/:month')
  async getLeavesByMonth(@Param('year') year: number, @Param('month') month: number, @Request() req) {
    return this.leaveService.getLeavesByMonth(req.user.userId, year, month);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req) {
    const leave = await this.leaveService.findOne(id, req.user.userId);
    if (!leave) {
      throw new HttpException('Leave not found', HttpStatus.NOT_FOUND);
    }
    return leave;
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Request() req) {
    try {
      await this.leaveService.remove(id, req.user.userId);
      return { message: 'Leave deleted successfully' };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
