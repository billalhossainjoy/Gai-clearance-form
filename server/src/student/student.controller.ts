import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { Prisma } from '@prisma/client';
import { AuthGuard } from '@nestjs/passport';

@Controller('student')
export class StudentController {
  constructor(private studentService: StudentService) {}

  @Post('add')
  @UseGuards(AuthGuard('jwt'))
  addStudent(@Body() data: Prisma.StudentCreateInput) {
    try {
      const student = this.studentService.createStudent(data);
      return student;
    } catch (error) {
      throw new HttpException(
        'add student failed',
        HttpStatus.EXPECTATION_FAILED,
      );
    }
  }

  @Put('update/:id')
  @UseGuards(AuthGuard('jwt'))
  updateStudent(
    @Param('id') id: string,
    @Body() data: Prisma.StudentUpdateInput,
  ) {
    try {
      const student = this.studentService.updateStudent(id, data);
      return student;
    } catch (error) {
      throw new HttpException('update failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Delete('remove/:id')
  @UseGuards(AuthGuard('jwt'))
  deleteStudent(@Param('id') id: string) {
    try {
      return this.studentService.deleteStudent(id);
    } catch (error) {
      throw new HttpException('delete Failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('all')
  @UseGuards(AuthGuard('jwt'))
  async getStudents() {
    try {
      return await this.studentService.students();
    } catch (error) {
      throw new HttpException('fetch failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async getStudent(@Param('id') id: string) {
    try {
      return await this.studentService.student(id);
    } catch (error) {
      throw new HttpException('fetch failed', HttpStatus.EXPECTATION_FAILED);
    }
  }

  @Get('get/:roll')
  async getStudentByRoll(@Param('roll') roll: string) {
    try {
      const rollNumber = parseInt(roll, 10);
      const student = await this.studentService.studentByRoll(rollNumber);

      return student;
    } catch (error) {
      throw error;
    }
  }
}
