import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { User } from '../entities/user.entity';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }
  @Post()
  async create(@Body() user: User) {
    return await this.usersService.create(user);
  }

  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.usersService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() user: User) {
    return await this.usersService.update(id, user);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
