import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UsersService } from "src/users/service/users.service";
import * as bcrypt from "bcryptjs";
import { Payload } from "../Entity/Payload";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async signIn(email: string, password: string) {
    const usuario = await this.usersService.findByEmail(email);
    if (!usuario) {
      throw new UnauthorizedException("Invalid credentials");
    }
    const senhaValida = await this.compareSenhas(password, usuario.password);
    if (!senhaValida) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return await this.gerarToken(usuario);
  }

  private async gerarToken(user: any) {
    const payload: Payload = {
      username: user.name,
      sub: user.id,
      email: user.email,
    };
    return await this.jwtService
      .signAsync(payload)
      .then((token) => {
        return {
          access_token: token,
        };
      })
      .catch((err) => {
        throw err;
      });
  }

  async register(user: User) {
    const existingUser = await this.usersService.findByEmail(user.email);
    if (existingUser) {
      throw new ConflictException("User already exists");
    }

    if (!user.password) {
      throw new BadRequestException("Password is required");
    }

    user.password = await bcrypt.hash(user.password, 10);

    const savedUser = await this.usersService.create(user);
    const payload = { sub: savedUser.id, username: savedUser.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async verificarToken(token: string) {
    return await this.jwtService.verifyAsync(token);
  }

  async hashSenha(password: string): Promise<string> {
    return await bcrypt.hash(password, 12);
  }

  async compareSenhas(senha: string, senhaHash: string): Promise<Boolean> {
    return await bcrypt.compare(senha, senhaHash);
  }
}
