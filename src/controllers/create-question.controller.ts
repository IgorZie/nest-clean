import { Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { Request } from "express";
import { CurrentUser } from "src/auth/current-user-decorator";
import { UserPayload } from "src/auth/jwt.strategy";

@Controller('/questions')
export class CreateQuestionController {
    constructor() {}

    @Post()
    @UseGuards(JwtAuthGuard)
    async handle(@CurrentUser() user: UserPayload) {
        console.log(user.sub)
        
        return 'ok' 
    }

}