import { Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { CommentsGuard } from './comments.guard';
import { Comment } from './comment.model';

@ApiTags('Comments')
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiOperation({ summary: "Add comment to the card" })
  @ApiResponse({ status: 200, type: Comment })
  @ApiBody({ type: CreateCommentDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  createComment(@Body() createCommentDto: CreateCommentDto){
    return this.commentsService.createComment(createCommentDto);
  }

  @ApiOperation({ summary: "Lookup comment based on author's id" })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get(':authorId')
  getComment(@Param('authorId') authorId: number) {
    return this.commentsService.getComment(authorId);
  }

  @ApiOperation({ summary: "Lookup comments based on card's id" })
  @ApiResponse({ status: 200, type: [Comment] })
  @Get('all/:cardId')
  getComments(@Param('cardId') cardId: number) {
    return this.commentsService.getComments(cardId);
  }

  @ApiOperation({ summary: "Remove comment" })
  @ApiResponse({ status: 200, type: typeof Number, example: '1' })
  @UseGuards(JwtAuthGuard, CommentsGuard)
  @Delete(':id')
  deleteComment(@Param('id') id: number) {
    return this.commentsService.deleteComment(id);
  }

  @ApiOperation({ summary: "Update comment" })
  @ApiResponse({ status: 200, type: typeof Number, example: '1' })
  @UseGuards(JwtAuthGuard, CommentsGuard)
  @Put(':id')
  updateComment(@Body() updateCommentDto: UpdateCommentDto, @Param('id') id: number) {
    return this.commentsService.updateComment(updateCommentDto, id);
  }
}
