import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TasksService } from '../service/tasks.service';
import { Task } from '../entities/task.entity';


@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Task> {
    return this.tasksService.findOne(id);
  }

  @Post()
  create(@Body() task: Task): Promise<Task> {
    return this.tasksService.create(task);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() task: Task): Promise<void> {
    return this.tasksService.update(id, task);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.tasksService.remove(id);
  }
}
