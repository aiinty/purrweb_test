import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CardsService } from './cards.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardsGuard } from './cards.guard';
import { Card } from './card.model';

@ApiTags('Cards')
@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @ApiOperation({ summary: "Add card to column" })
  @ApiResponse({ status: 200, type: Card })
  @ApiBody({ type: CreateCardDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  createCard(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.createCard(createCardDto);
  }

  @ApiOperation({ summary: "Lookup card based on card's id" })
  @ApiResponse({ status: 200, type: Card })
  @Get(':id')
  getCard(@Param('id') id: number) {
    return this.cardsService.getCard(id);
  }

  @ApiOperation({ summary: "Lookup card based on columns's id" })
  @ApiResponse({ status: 200, type: [Card] })
  @Get('all/:columnId')
  getCards(@Param('columnId') columnId: number) {
    return this.cardsService.getCards(columnId);
  }

  @ApiOperation({ summary: "Remove card" })
  @ApiResponse({ status: 200, type: typeof Number, example: '1' })
  @UseGuards(JwtAuthGuard, CardsGuard)
  @Delete(':id')
  deleteCard(@Param('id') id: number) {
    return this.cardsService.deleteCard(id);
  }

  @ApiOperation({ summary: "Update card" })
  @ApiResponse({ status: 200, type: typeof Number, example: '1' })
  @UseGuards(JwtAuthGuard, CardsGuard)
  @Put(':id')
  updateCard(@Body() updateCardDto: UpdateCardDto, @Param('id') id: number) {
    return this.cardsService.updateCard(updateCardDto, id);
  }
}
