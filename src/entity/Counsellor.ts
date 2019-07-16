import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm"

@Entity()
export class Counsellor extends BaseEntity{

    @PrimaryGeneratedColumn()
    id:number;

    @Column({
    length:10
    })
    name: string;
    
    @Column()
    username: string;
    
    @Column()
    password: string;

    @Column({default:2})
    identity:string;//0:学生；1：管理员；2：辅导员

    @Column()
    department:string;
}