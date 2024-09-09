import { UpdateTaskDto } from "./../dto/update-task.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateTaskDto } from "../dto/create-task.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Task } from "../entities/task.entity";
import { Between, Repository } from "typeorm";
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
    return tasks;
  }

  async findAllDate(userId: number, date: string): Promise<Task[]> {
    const tasks = await this.tasksRepository.find({
      where: {
        user: { id: userId },
        createAt: Between(
          new Date(date + " 00:00:00"),
          new Date(date + " 23:59:59")
        ),
      },
    });

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
    task.dueDate = createTaskDto.dueDate;
    task.completedDate = createTaskDto.completedDate;
    task.user = user;

    return this.tasksRepository.save(task);
  }

  async update(
    userId: number,
    idTask: number,
    updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    const task = await this.tasksRepository.findOne({
      where: { id: idTask, user: { id: userId } },
    });
    if (!task) {
      throw new NotFoundException("Task not found");
    }

    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new NotFoundException("User not found");
    }

    task.title = updateTaskDto.title;
    task.description = updateTaskDto.description;
    task.dueDate = updateTaskDto.dueDate;
    task.completedDate = updateTaskDto.completedDate;
    task.user = user;

    await this.tasksRepository.save(task);
    const taskAtualizada = await this.findOne(idTask);
    console.log(taskAtualizada);
    return taskAtualizada;
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
    task.completedDate = new Date().toISOString().split("T")[0];
    await this.tasksRepository.save(task);
    return task;
  }

  async toggleComplete(id: number): Promise<Task> {
    const task = await this.findOne(id);
    if (!task) {
      throw new NotFoundException("Task not found");
    }

    task.isCompleted = !task.isCompleted;
    task.completedDate = task.isCompleted
      ? new Date().toISOString().split("T")[0]
      : null;
    await this.tasksRepository.save(task);
    return task;
  }
}
