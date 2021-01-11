import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    NotFoundException,
    ConflictException, Header,
} from '@nestjs/common';
import { Students } from '../entitys/students.entity';
import {CreateStudentsDto, SelectCourse, UpdateStudentsDto} from './studentsDto';
import { StudentsService } from '../services/students.service';
import {ApiBody, ApiResponse, ApiTags} from '@nestjs/swagger';
import {NotFoundResponse} from '../../type/notFoundResponse';
import {ResponseSuccess} from '../../type/ResponseSuccess';

@ApiTags('students')
@Controller('api/students')
export class StudentsController {
    constructor(private readonly studentsService: StudentsService) {}

    @Get()
    @ApiResponse({ status: 200, description: 'Show all students.', type: Students})
    @ApiResponse({ status: 404, description: 'Not Found Error.', type: NotFoundResponse})
    async getListAllStudents(): Promise<Students[]> {
        return await this.studentsService.findAllStudents();
    }

    @Post()
    @ApiBody({ type: CreateStudentsDto })
    @ApiResponse({ status: 200, description: 'Added new student.', type: Students})
    @ApiResponse({ status: 404, description: 'Not Found Error.', type: NotFoundResponse})
    @Header('Cache-Control', 'none')
    async createNewCourse(@Body() createStudentsDto: CreateStudentsDto): Promise<ResponseSuccess> {
        await this.studentsService.createNewStudent(createStudentsDto)

        return {
            status: true,
            message: 'Added new student.'
        };
    }

    @Put(':id')
    @ApiBody({ type: UpdateStudentsDto })
    @ApiResponse({ status: 200, description: 'Update student.', type: Students})
    @ApiResponse({ status: 409, description: 'Not Found Error.', type: NotFoundResponse})
    async updateCourse(
        @Param('id') id: string,
        @Body() {first_name, last_name, age}: UpdateStudentsDto): Promise<ResponseSuccess> {

        const student = await this.studentsService.findOne(id);

        if (student === undefined) {
            throw new NotFoundException(`Student with id = ${id} not exists`);
        }

        student.first_name = first_name;
        student.last_name = last_name;
        student.age = age;

        let allStudents = await this.studentsService.findAllStudents();
        let findPerson = !!allStudents.find(students => students.first_name.toLowerCase() === student.first_name.toLowerCase() && students.last_name.toLowerCase() === student.last_name.toLowerCase());

        if (findPerson) {
            throw new ConflictException(`Student already exist!`);
        }

        await this.studentsService.updateStudent(student);
        return {
            status: true,
            message: 'Course updated successfully!'
        };
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'This student has been deleted.', type: Students})
    @ApiResponse({ status: 404, description: 'Not Found Error.', type: NotFoundResponse})
    async deleteCourse(@Param('id') id: string): Promise<void> {
        return this.studentsService.removeStudent(id);
    }

    @Post('/chosen-course')
    @ApiBody({ type: CreateStudentsDto })
    @ApiResponse({ status: 200, description: 'Added new student.', type: Students})
    @ApiResponse({ status: 404, description: 'Not Found Error.', type: NotFoundResponse})
    @Header('Cache-Control', 'none')
    async selectCourse(@Body() selectCourse: SelectCourse): Promise<ResponseSuccess> {
        let allCourse = await this.studentsService.getAllCourseTimeStudent(selectCourse.studentId);
        let courseTime = await this.studentsService.getTimeCourse(selectCourse.courseId);

        if (await this.studentsService.checkingExistCourse(allCourse, courseTime)) {
            throw new ConflictException('You already have a course at this time!');
        }

        await this.studentsService.selectCourse(selectCourse.studentId, selectCourse.courseId);

        return {
            status: true,
            message: 'The course was successfully selected!',
        };
    }
}
