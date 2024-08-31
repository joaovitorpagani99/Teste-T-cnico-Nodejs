import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { AuthService } from "../service/auth.service";
import { Public } from "../decorators/public.decorator";
import { User } from "src/users/entities/user.entity";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("register")
  @Public()
  @HttpCode(HttpStatus.CREATED)
  async register(@Request() req) {
    return this.authService.register(req.body);
  }

  @Post("login")
  @Public()
  @HttpCode(HttpStatus.OK)
  async login(@Request() req) {
    return this.authService.signIn(req.body.email, req.body.password);
  }
}
