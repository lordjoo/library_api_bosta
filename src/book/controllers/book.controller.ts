import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
} from '@nestjs/common';
import { BookService } from '../services/book.service';
import {
  CreateBookDto,
  SearchBookQueryDto,
  UpdateBookDto,
} from '../dto/book.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { BookEntity } from '../entities/book.entity';

@ApiTags('books')
@Controller('books')
export class BookController {
  constructor(protected readonly bookService: BookService) {}

  @Get()
  @ApiCreatedResponse({ type: BookEntity, isArray: true })
  async findAll(@Query() query?: SearchBookQueryDto): Promise<BookEntity[]> {
    return this.bookService.findAll(query);
  }

  @Get('overdue')
  @ApiCreatedResponse({ type: BookEntity, isArray: true })
  async findOverdue(): Promise<BookEntity[]> {
    return this.bookService.findOverdue();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: BookEntity })
  async findOne(@Param('id') id: number): Promise<BookEntity> {
    return this.bookService.findOne(id);
  }

  @Post()
  @ApiCreatedResponse({ type: BookEntity })
  async create(@Body() createBookDto: CreateBookDto): Promise<BookEntity> {
    return this.bookService.create(createBookDto);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: BookEntity })
  async update(
    @Param('id') id: number,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<BookEntity> {
    return this.bookService.update(id, updateBookDto);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: number, @Res() response: Response) {
    await this.bookService.remove(id);
  }
}
