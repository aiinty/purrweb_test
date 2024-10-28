import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './comment.model';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([Comment]),
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
