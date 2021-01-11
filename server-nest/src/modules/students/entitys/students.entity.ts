import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {ApiProperty} from "@nestjs/swagger";

@Entity()
export class Students {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    first_name: string;

    @ApiProperty()
    @Column()
    last_name: string;

    @ApiProperty()
    @Column()
    age: number;
}
