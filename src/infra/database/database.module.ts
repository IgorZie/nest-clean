import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma/prisma.service";
import { PrismaQuestionsRepository } from "./prisma/repositories/prisma-question-repository";
import { PrismaQuestionAttachmentsRepository } from "./prisma/repositories/prisma-question-attachments-repository";
import { PrismaQuestionCommentsRepository } from "./prisma/repositories/prisma-question-comments-repository";
import { PrismaAnswerAttachmentsRepository } from "./prisma/repositories/prisma-answers-attachments-repository";
import { PrismaAnswerCommentsRepository } from "./prisma/repositories/prisma-answers-comments-repository";
import { PrismaAnswersRepository } from "./prisma/repositories/prisma-answers-repository";
import { QuestionsRepository } from "src/domain/forum/application/repositories/questions-repository";

@Module({
    providers: [
        PrismaService,
        {
            provide: QuestionsRepository,
            useClass: PrismaQuestionsRepository
        },
        PrismaQuestionAttachmentsRepository,
        PrismaQuestionCommentsRepository,
        PrismaAnswerAttachmentsRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswersRepository
    ],
    exports: [
        PrismaService,
        QuestionsRepository,
        PrismaQuestionAttachmentsRepository,
        PrismaQuestionCommentsRepository,
        PrismaAnswerAttachmentsRepository,
        PrismaAnswerCommentsRepository,
        PrismaAnswersRepository
    ]
})
export class DatabaseModule {}