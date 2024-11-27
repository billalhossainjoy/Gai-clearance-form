import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async createStudent(student: Prisma.StudentCreateInput) {
    try {
      const newStudent = await this.prisma.student.create({
        data: student,
      });

      if (!newStudent)
        return new HttpException(
          'Student not found.',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );

      return newStudent;
    } catch (error) {
      throw new HttpException(
        `Error creating student: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateStudent(id: string, student: Prisma.StudentUpdateInput) {
    try {
      const existingStudent = await this.prisma.student.findUnique({
        where: { id },
      });

      if (!existingStudent)
        throw new HttpException('Student not found.', HttpStatus.NOT_FOUND);

      const updatedStudent = await this.prisma.student.update({
        where: { id },
        data: student,
      });

      return updatedStudent;
    } catch (error) {
      throw new HttpException(
        `Error updating student: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteStudent(id: string) {
    try {
      const existingStudent = await this.prisma.student.findUnique({
        where: { id },
      });

      if (!existingStudent)
        throw new HttpException('Student not found.', HttpStatus.NOT_FOUND);

      return await this.prisma.student.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error deleting student: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async student(id: string) {
    try {
      const existingStudent = await this.prisma.student.findUnique({
        where: { id },
      });

      if (!existingStudent)
        throw new HttpException('Student not found.', HttpStatus.NOT_FOUND);

      return await this.prisma.student.findUnique({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        `Error fetching student: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
  async studentByRoll(roll: number) {
    try {
      const existingStudent = await this.prisma.student.findUnique({
        where: { roll },
      });


      if (!existingStudent)
        throw new HttpException('Student not found. ', HttpStatus.NOT_FOUND);

      return await this.prisma.student.findUnique({
        where: { id: existingStudent.id },
      });
    } catch (error) {
      throw new HttpException(
        `Error fetching student by roll: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async students() {
    try {
      return await this.prisma.student.findMany();
    } catch (error) {
      throw new HttpException(
        `Error fetching students: ${error.message}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
