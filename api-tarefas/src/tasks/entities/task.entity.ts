import { CreateTaskDto } from "./../dto/create-task.dto";
import { IsBoolean, IsNumber, IsString, IsOptional } from "class-validator";
import { User } from "src/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @IsNumber()
  id: number;

  @Column()
  @IsString()
  title: string;

  @Column()
  @IsString()
  description: string;

  @Column({ default: false })
  @IsBoolean()
  isCompleted: boolean;

  @Column({ type: "date", nullable: true })
  @IsOptional()
  dueDate: string;

  @Column({ type: "date", nullable: true })
  @IsOptional()
  completedDate: string;

  @CreateDateColumn()
  createAt: Date;

  @UpdateDateColumn()
  updateAt: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
