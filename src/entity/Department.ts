import { Entity,BaseEntity,PrimaryGeneratedColumn,Column }from "typeorm"

@Entity()
export class Department extends BaseEntity{

    @PrimaryGeneratedColumn()
    test:number;

    @Column()
    id:number;
    
    @Column()
    name:string;

    @Column({default:0})
    average:number;

    @Column({default:0})
    tested_number:number;
    
    @Column({default:0})
    total_number:number;
}