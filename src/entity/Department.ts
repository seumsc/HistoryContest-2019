import { Entity,BaseEntity,PrimaryColumn,Column }from "typeorm"
import { isDate } from "util";

@Entity()
export class Department extends BaseEntity{

    @PrimaryColumn()
    id:number;

    @Column()
    name:string;

    @Column()
    average:number;

    @Column()
    tested_number:number;
    
    @Column()
    total_number:number;
}