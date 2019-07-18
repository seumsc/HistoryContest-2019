import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";
import { SSL_OP_NO_COMPRESSION } from "constants";

@Entity()
export class Student extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
    length:10
    })
    name: string;

    @Column()
    username: string;

    @Column()
    password: string;

    @Column({default:0})
    identity:string;//0:学生；1：管理员；2：辅导员

    @Column()
    department:string;

    @Column({default:-1})
    score:number;

    @Column({default:-1})
    time:number;


}
