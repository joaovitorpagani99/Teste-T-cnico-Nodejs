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
  Query,
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
    return await this.tasksService.findAll(userId);
  }

  @Get("date")
  @HttpCode(HttpStatus.OK)
  async findAllDate(@Req() req, @Query("date") date: string): Promise<Task[]> {
    const userId = req.user.sub;
    console.log(date);
    return await this.tasksService.findAllDate(userId, date);
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
    @Param("id") idTask: number,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<Task> {
    const userId = req.user.sub;
    return this.tasksService.update(userId, idTask, { ...updateTaskDto });
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param("id") id: number): Promise<void> {
    return this.tasksService.remove(id);
  }

  @Patch(":id/toggle-complete")
  @HttpCode(HttpStatus.OK)
  async toggleComplete(@Param("id") id: number): Promise<Task> {
    return this.tasksService.toggleComplete(id);
  }
}
