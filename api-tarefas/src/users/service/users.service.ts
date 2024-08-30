import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async create(user: User): Promise<User> {
    return this.usersRepository.save(user);
  }

  remove(id: string) {
    return this.usersRepository.delete(id);
  }
  update(id: string, user: User) {
    return this.usersRepository.update(id, user);
  }
  findOne(id: number) {
    return this.usersRepository.findOne({ where: { id } });
  }
  findAll() {
    return this.usersRepository.find();
  }
}
