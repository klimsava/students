import {ApiProperty} from "@nestjs/swagger";

export class CreateStudentsDto {
    @ApiProperty()
    first_name: string;
    @ApiProperty()
    last_name: string;
    @ApiProperty()
    age: number;
}

export class UpdateStudentsDto {
    @ApiProperty()
    first_name: string;
    @ApiProperty()
    last_name: string;
    @ApiProperty()
    age: number;
}

export class SelectCourse {
    @ApiProperty()
    studentId: number;
    courseId: number;
}

export class AllCourse {
    @ApiProperty()
    studentId: number;
    time: string;
}