import { UpdateTaskDto } from "./../dto/update-task.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entities/task.entity";
import { Repository } from "typeorm";
import { UsersService } from "src/users/service/users.service";

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
    private usersService: UsersService
  ) {}

  async findAll(userId: number): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({
      where: { user: { id: userId } },
    });
    if (tasks.length == 0) {
      throw new NotFoundException("No tasks found for this user");
    }
    return tasks;
  }

  async findOne(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: id },
    });
    if (task == null) {
      throw new NotFoundException("Task not found");
    }
    return task;
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const user = await this.usersService.findOne(createTaskDto.userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    const task = new Task();
    task.title = createTaskDto.title;
    task.description = createTaskDto.description;
    task.user = user;

    return this.tasksRepository.save(task);
  }

  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: id },
    });
    if (!task) {
      throw new NotFoundException("Task not found");
    }

    const user = await this.usersService.findOne(updateTaskDto.userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.user = user;

    await this.tasksRepository.save(task);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.tasksRepository.delete(id);
  }

  async complete(id: number): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException("Task not found");
    }

    task.isCompleted = true;
    await this.tasksRepository.save(task);
    return task;
  }
}
