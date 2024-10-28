import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ColumnsService } from './columns.service';
import { CreateColumnDto } from './dto/create-column.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateColumnDto } from './dto/update-column.dto';
import { ColumnsGuard } from './columns.guard';
import { Column } from './column.model';

@ApiTags('Columns')
@Controller('columns')
export class ColumnsController {
  constructor(private readonly columnService: ColumnsService) {}

  @ApiOperation({ summary: "Add column" })
  @ApiResponse({ status: 200, type: Column })
  @ApiBody({ type: CreateColumnDto })
  @UseGuards(JwtAuthGuard)
  @Post()
  createColumn(@Body() createColumnDto: CreateColumnDto) {
    return this.columnService.createColumn(createColumnDto);
  }

  @ApiOperation({ summary: "Lookup column based on column's id" })
  @ApiResponse({ status: 200, type: Column })
  @Get(':id')
  getColumn(@Param('id') id: number) {
    return this.columnService.getColumn(id);
  }

  @ApiOperation({ summary: "Lookup column based on author's id" })
  @ApiResponse({ status: 200, type: [Column] })
  @Get('all/:authorId')
  getColumns(@Param('authorId') authorId: number) {
    return this.columnService.getColumns(authorId);
  }

  @ApiOperation({ summary: "Remove column" })
  @ApiResponse({ status: 200, type: typeof Number, example: '1' })
  @UseGuards(JwtAuthGuard, ColumnsGuard)
  @Delete(':id')
  deleteColumn(@Param('id') id: number) {
    return this.columnService.deleteColumn(id);
  }

  @ApiOperation({ summary: "Update column" })
  @ApiResponse({ status: 200, type: typeof Number, example: '1'})
  @UseGuards(JwtAuthGuard, ColumnsGuard)
  @Put(':id')
  updateColumn(@Body() updateColumnDto: UpdateColumnDto, @Param('id') id: number) {
    return this.columnService.updateColumn(updateColumnDto, id);
  }
}
