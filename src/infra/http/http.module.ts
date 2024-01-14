import { Module } from "@nestjs/common";
import { CreateAccountController } from "./controllers/create-account.controller";
import { AuthenticateController } from "./controllers/auth.controller";
import { CreateQuestionController } from "./controllers/create-question.controller";
import { FetchRecentQuestionsController } from "./controllers/fetch-recent-questions.controller";
import { PrismaService } from "../database/prisma/prisma.service";
import { PrismaQuestionsRepository } from "../database/prisma/repositories/prisma-question-repository";
import { PrismaQuestionAttachmentsRepository } from "../database/prisma/repositories/prisma-question-attachments-repository";
import { PrismaQuestionCommentsRepository } from "../database/prisma/repositories/prisma-question-comments-repository";
import { PrismaAnswerAttachmentsRepository } from "../database/prisma/repositories/prisma-answers-attachments-repository";
import { PrismaAnswerCommentsRepository } from "../database/prisma/repositories/prisma-answers-comments-repository";
import { PrismaAnswersRepository } from "../database/prisma/repositories/prisma-answers-repository";

@Module({
    controllers: [ 
        CreateAccountController, 
        AuthenticateController, 
        CreateQuestionController, 
        FetchRecentQuestionsController
    ],
    providers: [PrismaService],
    exports: [
        PrismaService,
        PrismaQuestionsRepository,
        PrismaQuestionAttachmentsRepository,
        PrismaQuestionCommentsRepository,
        PrismaAnswerAttachmentsRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswersRepository
    ]
})
export class HttpModule {}