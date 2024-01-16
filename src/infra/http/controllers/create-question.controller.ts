import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../../auth/jwt-auth.guard";
import { CurrentUser } from "../../auth/current-user-decorator";
import { UserPayload } from "../../auth/jwt.strategy";
import { z } from "zod";
import { ZodValidationPipe } from "../pipes/zod-validation-pipe";
import { PrismaService } from "../../database/prisma/prisma.service";
import { CreateQuestionUseCase } from "../../../domain/forum/application/use-cases/create-question";

const createQuestionBodySchema = z.object({
    title: z.string(),
    content: z.string()
})

type CreateQuestionBodySchema = z.infer<typeof createQuestionBodySchema>

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
    constructor(private createQuestion: CreateQuestionUseCase) {}

    @Post()
    async handle(
        @Body(new ZodValidationPipe(createQuestionBodySchema)) body: CreateQuestionBodySchema,
        @CurrentUser() user: UserPayload
    ) {
        const { title, content } = body
        const { sub: userId } = user

        const slug = this.convertioStug(title)

        await this.createQuestion.execute({        
            title,
            content,
            authorId: userId,
            attachmentsIds: []      
        })
    }

    private convertioStug(title: string): string {
        return title
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u836f]/g, '')
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
    }

}