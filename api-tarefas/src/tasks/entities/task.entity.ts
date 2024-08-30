import { User } from "src/users/entities/user.entity";
import { Column, Entity, Long, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ default: false })
    isCompleted: boolean;

    @ManyToOne(() => User, user => user.tasks)
    user: User;
}
