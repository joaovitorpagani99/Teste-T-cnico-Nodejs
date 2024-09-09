import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  HttpStatus,
  HttpCode,
  Req,
  Patch,
} from "@nestjs/common";
import { TasksService } from "../service/tasks.service";
import { Task } from "../entities/task.entity";
import { CreateTaskDto } from "../dto/create-task.dto";
import { UpdateTaskDto } from "../dto/update-task.dto";

@Controller("tasks")
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(@Req() req): Promise<Task[]> {
    const userId = req.user.sub;
    console.log(userId);
    return await this.tasksService.findAll(userId);
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findOne(@Param("id") id: number): Promise<Task> {
    return await this.tasksService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Req() req,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Task> {
    const userId = req.user.sub;
    return this.tasksService.create({ ...createTaskDto, userId });
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  async update(
    @Req() req,
    @Param("id") id: number,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    const userId = req.user.sub;
    return this.tasksService.update(id, { ...updateTaskDto, userId });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: number): Promise<void> {
    return this.tasksService.remove(id);
  }

  @Patch(":id/complete")
  @HttpCode(HttpStatus.OK)
  async complete(@Param("id") id: number): Promise<Task> {
    return this.tasksService.complete(id);
  }
}
