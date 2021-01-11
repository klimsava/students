import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoursesModule } from './modules/courses/courses.module';
import {StudentsModule} from './modules/students/students.module';

@Module({
  imports: [TypeOrmModule.forRoot(), CoursesModule, StudentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
