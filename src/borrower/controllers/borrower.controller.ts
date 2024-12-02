import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiResponseProperty,
  ApiTags,
} from '@nestjs/swagger';
import { BorrowerService } from '../services/borrower.service';
import {
  BorrowRequestDto,
  CreateBorrowerDto,
  ReturnRequestDto,
} from '../dto/borrower.dto';
import { BorrowerEntity } from '../entities/borrower.entity';
import { BookEntity } from '../../book/entities/book.entity';

@ApiTags('Borrowers')
@Controller('borrower')
export class BorrowerController {
  constructor(protected readonly borrowerService: BorrowerService) {}

  @Get()
  @ApiCreatedResponse({ type: BorrowerEntity, isArray: true })
  async findAll(): Promise<BorrowerEntity[]> {
    return this.borrowerService.findAll();
  }

  @Get(':id')
  @ApiCreatedResponse({ type: BorrowerEntity })
  async findOne(@Param('id') id: number): Promise<BorrowerEntity> {
    return this.borrowerService.findOne(id);
  }

  @Get(':id/books')
  @ApiCreatedResponse({ type: BookEntity, isArray: true })
  async findBooks(@Param('id') id: number): Promise<BookEntity[]> {
    return this.borrowerService.borrowedBooks(id);
  }

  @Post()
  @ApiCreatedResponse({ type: BorrowerEntity })
  async create(@Body() data: CreateBorrowerDto): Promise<BorrowerEntity> {
    return this.borrowerService.create(data);
  }

  @Put(':id')
  @ApiCreatedResponse({ type: BorrowerEntity })
  async update(
    @Param('id') id: number,
    @Body() data: CreateBorrowerDto,
  ): Promise<BorrowerEntity> {
    return this.borrowerService.update(id, data);
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(id: number): Promise<BorrowerEntity> {
    return this.borrowerService.remove(id);
  }

  @Post('borrow')
  async borrowBook(@Body() data: BorrowRequestDto) {
    return this.borrowerService.borrowBook(data);
  }

  @Post('return')
  async returnBook(@Body() data: ReturnRequestDto) {
    return this.borrowerService.returnBook(data);
  }
}
