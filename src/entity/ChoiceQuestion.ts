import { Entity, BaseEntity, PrimaryGeneratedColumn, Column }from "typeorm"


@Entity()
export class ChoiceQuestion extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    text:string;

    @Column()
    a:string;

    @Column()
    b:string;

    @Column()
    c:string;

    @Column()
    d:string;
    
    @Column()
    answer:number;
}