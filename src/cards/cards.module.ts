import { Module } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { AuthModule } from '../auth/auth.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { Card } from './card.model';

@Module({
  imports: [
    AuthModule,
    SequelizeModule.forFeature([Card]),
  ],
  providers: [CardsService],
  controllers: [CardsController]
})
export class CardsModule {}
