import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Students } from '../entitys/students.entity';
import {AllCourse} from '../controllers/studentsDto';
import moment from 'moment';

@Injectable()
export class StudentsService {
    constructor(
        @InjectRepository(Students)
        private studentsRepository: Repository<Students>,
    ) {}

    async findAllStudents(): Promise<Students[]> {
        return await this.studentsRepository.find();
    }

    async findOne(id: string): Promise<Students> {
        return await this.studentsRepository.findOne(id);
    }

    async  createNewStudent({first_name, last_name, age}): Promise<Students> {
        if ((await this.studentsRepository.findOne({ first_name }))){
            throw new ConflictException('Student already exist');
        }

        const student = new Students();
        student.first_name = first_name;
        student.last_name = last_name;
        student.age = age;

        return await this.studentsRepository.save(student);
    }

    async updateStudent(student: Students): Promise<Students> {
        return await this.studentsRepository.save(student);
    }

    async removeStudent(id: string): Promise<void> {
        await this.studentsRepository.delete(id);
    }

    async selectCourse(studentId: number, courseId: number):Promise<void> {
        return await this.studentsRepository.query("INSERT INTO student_courses SET ?", [{
            studentId,
            courseId
        }]);
    }

    async getAllCourseTimeStudent(studentId: number):Promise<void> {
        let data = await this.studentsRepository.query("SELECT studentId, time FROM students JOIN student_courses ON students.id = student_courses.studentId JOIN courses on student_courses.courseId = courses.id WHERE student_courses.studentId = ?", [studentId]);

        return data.map(item => {
            return {studentId: item.studentId, time: item.time};
        });
    }

    async getTimeCourse(courseId: number):Promise<void> {
        return (await this.studentsRepository.query("SELECT time FROM `nest_students`.`courses` WHERE `id`= ?", [courseId]))[0].time;
    }

    async checkingExistCourse(allCourses: any, timeOfSelectedCourse: any):Promise<any> {
        let result = [];

        for (let i = 0; i < allCourses.length; i++) {
            result.push(allCourses[i].time);
        }

        for (const item of result) {
            let time = item.match(/(\d+):(\d+):(\d+)/);
            let hourСurrentСourse = parseInt(time[1]);
            let minuteСurrentСourse = parseInt(time[2]);
            if (await this.compareTime(hourСurrentСourse, minuteСurrentСourse, timeOfSelectedCourse)) return true;
        }
    }

    async compareTime(hourСurrentСourse: number, minuteСurrentСourse: number, timeOfSelectedCourse: string):Promise<any> {
        const timeRegex = /(\d+):(\d+):(\d+)/;
        let intervalTime = this.buildIntervalTime(hourСurrentСourse, minuteСurrentСourse).match(timeRegex);
        let selectedCourseTime = timeOfSelectedCourse.match(timeRegex);

        return ((+hourСurrentСourse === +selectedCourseTime[1] && +minuteСurrentСourse === +selectedCourseTime[2]) || !((+intervalTime[1] <= +selectedCourseTime[1]) && (+selectedCourseTime[2] > +intervalTime[2]) || +selectedCourseTime[1] < hourСurrentСourse));
    }

    buildIntervalTime(hourСurrentСourse: number, minuteСurrentСourse: number):string {
        let intervalTime, intervalHour, intervalMinute;
        intervalMinute = minuteСurrentСourse + 45;

        if (intervalMinute >= 60) {
            intervalHour = hourСurrentСourse + 1;
            intervalMinute = intervalMinute - 60;

            return intervalHour + ':' + intervalMinute + ':' + '00';
        }

        return `${hourСurrentСourse}:${intervalMinute}:00`;
    }
}
