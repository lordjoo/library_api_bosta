import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  CreateBookDto,
  SearchBookQueryDto,
  UpdateBookDto,
} from '../dto/book.dto';
import { BookEntity } from '../entities/book.entity';

@Injectable()
export class BookService {
  constructor(protected readonly prisma: PrismaService) {}

  async findAll(query?: SearchBookQueryDto): Promise<BookEntity[]> {
    const { title, author, isbn } = query || {}; // Destructure the query or use empty object if no query

    return this.prisma.book.findMany({
      where: {
        AND: [
          title ? { title: { contains: title } } : {},
          author ? { author: { contains: author } } : {},
          isbn ? { isbn: { contains: isbn } } : {},
        ],
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.book.findUnique({
      where: {
        id: id,
      },
    });
  }

  async create(data: CreateBookDto) {
    const existingBook = await this.prisma.book.findUnique({
      where: { isbn: data.isbn },
    });

    if (existingBook) {
      throw new BadRequestException({
        message: 'Book with this ISBN already exists',
        statusCode: 400,
      });
    }

    return this.prisma.book.create({
      data: data,
    });
  }

  async update(id: number, data: UpdateBookDto) {
    return this.prisma.book.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async remove(id: number) {
    return this.prisma.book.delete({
      where: {
        id: id,
      },
    });
  }

  async findOverdue() {
    return this.prisma.book.findMany({
      where: {
        transactions: {
          some: {
            returned: false,
            dueDate: {
              lt: new Date(),
            },
          },
        },
      },
      include: {
        transactions: {
          select: {
            borrowDate: true,
            dueDate: true,
            borrower: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }
}
