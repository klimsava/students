import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Students } from './entitys/students.entity';
import { StudentsController } from './controllers/students.controller';
import { StudentsService } from './services/students.service';

@Module({
  imports: [TypeOrmModule.forFeature([Students])],
  controllers: [StudentsController],
  providers: [StudentsService],
})
export class StudentsModule {}
