import {ConflictException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Courses } from '../entitys/courses.entity';

@Injectable()
export class CoursesService {
    constructor(
        @InjectRepository(Courses)
        private coursesRepository: Repository<Courses>,
    ) {}

    async findAllCourses(): Promise<Courses[]> {
        return await this.coursesRepository.find();
    }

    async findOne(id: string): Promise<Courses> {
        return await this.coursesRepository.findOne(id);
    }

    async createNewCourse({name, description, time}): Promise<Courses> {
        if ((await this.coursesRepository.findOne({ name: name }))){
            throw new ConflictException('Course already exist');
        }

        const course = new Courses();
        course.name = name;
        course.description = description;
        course.time = time;

        return await this.coursesRepository.save(course);
    }

    async removeCourse(id: string): Promise<void> {
        await this.coursesRepository.delete(id);
    }

    async updateCourse(Course: Courses): Promise<Courses> {
        return await this.coursesRepository.save(Course);
    }
}
