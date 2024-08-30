import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from '../entities/task.entity';
import { Repository } from 'typeorm';


@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) { }

  findAll(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  findOne(id: number): Promise<Task> {
    return this.tasksRepository.findOneBy({ id });
  }

  async create(task: Task): Promise<Task> {
    return this.tasksRepository.save(task);
  }

  async update(id: number, task: Task): Promise<void> {
    await this.tasksRepository.update(id, task);
  }

  async remove(id: number): Promise<void> {
    await this.tasksRepository.delete(id);
  }
}
