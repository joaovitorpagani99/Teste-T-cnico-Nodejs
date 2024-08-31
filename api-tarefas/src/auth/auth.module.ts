import { Module } from "@nestjs/common";
import { AuthService } from "./service/auth.service";
import { AuthController } from "./controller/auth.controller";
import { UsersModule } from "src/users/users.module";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import { AuthGuard } from "./guard/auth.guard";
import { APP_GUARD } from "@nestjs/core";

dotenv.config();

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
