import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Courses } from './entitys/courses.entity';
import { CourseController } from './controllers/courses.controller';
import { CoursesService } from './services/courses.service';

@Module({
  imports: [TypeOrmModule.forFeature([Courses])],
  controllers: [CourseController],
  providers: [CoursesService],
})
export class CoursesModule {}
