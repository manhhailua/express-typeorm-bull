import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Notification {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    title: string;

    @Column({
        default: false,
    })
    read: boolean;

}
