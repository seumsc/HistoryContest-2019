import { Entity, BaseEntity, PrimaryGeneratedColumn, Column }from "typeorm"

@Entity()
export class JudgmentQuestion extends BaseEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    text:string;

    @Column()
    answer:number;
}