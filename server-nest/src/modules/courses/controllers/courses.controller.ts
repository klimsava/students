import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  Header,
  ConflictException
} from '@nestjs/common';
import { Courses } from '../entitys/courses.entity';
import { CreateCourseDto, UpdateCourseDto } from './dto';
import {CoursesService} from '../services/courses.service';
import {ApiBody, ApiResponse, ApiTags} from '@nestjs/swagger';
import {NotFoundResponse} from '../../type/notFoundResponse';
import {ResponseSuccess} from '../../type/ResponseSuccess';

@ApiTags('courses')
@Controller('api/courses')
export class CourseController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Show all courses.', type: Courses})
  @ApiResponse({ status: 404, description: 'Not Found Error.', type: NotFoundResponse})
  async getListAllCourses(): Promise<Courses[]> {
    return await this.coursesService.findAllCourses();
  }

  @Post()
  @ApiBody({ type: CreateCourseDto })
  @ApiResponse({ status: 200, description: 'Added new course.', type: Courses})
  @ApiResponse({ status: 404, description: 'Not Found Error.', type: NotFoundResponse})
  @Header('Cache-Control', 'none')
  async createNewCourse(@Body() createCourseDto: CreateCourseDto): Promise<ResponseSuccess> {
    await this.coursesService.createNewCourse(createCourseDto)

    return {
      status: true,
      message: 'Added new course.'
    };
  }

  @Put(':id')
  @ApiBody({ type: UpdateCourseDto })
  @ApiResponse({ status: 200, description: 'Update course.', type: Courses})
  @ApiResponse({ status: 409, description: 'Not Found Error.', type: NotFoundResponse})
  async updateCourse(
      @Param('id') id: string,
      @Body() {name, description, time}: UpdateCourseDto): Promise<ResponseSuccess> {

    const course = await this.coursesService.findOne(id);

    if (course === undefined) {
      throw new NotFoundException(`Course with id = ${id} not exists`);
    }

    course.name = name;
    course.description = description;
    course.time = time;

    let allCourses = await this.coursesService.findAllCourses();
    let findName = !!allCourses.find(courses => courses.name.toLowerCase() === course.name.toLowerCase());

    if (findName) {
      throw new ConflictException(`Course already exist!`);
    }

    await this.coursesService.updateCourse(course);
    return {
      status: true,
      message: 'Course updated successfully!'
    };
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'This course has been deleted.', type: Courses})
  @ApiResponse({ status: 404, description: 'Not Found Error.', type: NotFoundResponse})
  async deleteCourse(@Param('id') id: string): Promise<void> {
    return this.coursesService.removeCourse(id);
  }
}
