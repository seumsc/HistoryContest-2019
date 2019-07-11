import{Entity,PrimaryGeneratedColumn,Column}from "typeorm"

@Entity()
export class Admin {

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

    @Column()
    identity:number;//0:学生；1：管理员；2：辅导员

    @Column()
    department:number;

}