import {ApiProperty} from "@nestjs/swagger";

export class CreateCourseDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    time: number;
}

export class UpdateCourseDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    description: string;
    @ApiProperty()
    time: number;
}