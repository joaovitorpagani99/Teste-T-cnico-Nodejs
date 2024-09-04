import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UnauthorizedException,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { Public } from "../decorators/public.decorator";
import { User } from "src/users/entities/user.entity";
import { SignInDto } from "../Entity/SignInDto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(@Request() req) {
    console.log(req.body);
    return this.authService.register(req.body);
  }

  @Post("login")
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Body() signInDto: SignInDto) {
    const token = await this.authService.signIn(
      signInDto.email,
      signInDto.password
    );
    if (!token) {
      throw new UnauthorizedException("Invalid credentials");
    }
    return token;
  }
}
