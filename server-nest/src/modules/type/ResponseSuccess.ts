import {ApiProperty} from "@nestjs/swagger";

export class ResponseSuccess {
    @ApiProperty()
    status: boolean;
    @ApiProperty()
    message: string;
}