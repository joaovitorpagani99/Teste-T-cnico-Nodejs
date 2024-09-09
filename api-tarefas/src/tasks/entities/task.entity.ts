import { IsBoolean, IsNumber, IsString, IsOptional } from "class-validator";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

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

  @ManyToOne(() => User, (user) => user.tasks)
  user: User;
}
