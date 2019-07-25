import { Entity, BaseEntity, PrimaryGeneratedColumn, Column }from "typeorm"


@Entity()
export class ChoiceQuestion extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    text:string;

    @Column({type:"simple-array"})
    options:string[];

    @Column()
    answer:number;//1:A,2:B,3:C,4:D
}