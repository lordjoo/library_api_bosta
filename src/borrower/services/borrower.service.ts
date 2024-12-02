import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import {
  BorrowRequestDto,
  CreateBorrowerDto,
  ReturnRequestDto,
} from '../dto/borrower.dto';
import { BookService } from '../../book/services/book.service';

@Injectable()
export class BorrowerService {
  constructor(
    protected readonly prisna: PrismaService,
    protected readonly bookService: BookService,
  ) {}

  async findAll() {
    return this.prisna.borrower.findMany();
  }

  async findOne(id: number) {
    try {
      return this.prisna.borrower.findFirstOrThrow({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException({
        message: 'Borrower not found',
        statusCode: 404,
      });
    }
  }

  async create(data: CreateBorrowerDto) {
    const check = await this.prisna.borrower.findFirstOrThrow({
      where: { email: data.email },
    });

    if (check)
      throw new BadRequestException({
        message: 'Borrower already exists',
        statusCode: 400,
      });

    return this.prisna.borrower.create({ data });
  }

  async update(id: number, data: any) {
    return this.prisna.borrower.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    return this.prisna.borrower.delete({
      where: { id },
    });
  }

  async borrowBook(data: BorrowRequestDto) {
    const { borrowerId, bookId, dueDate } = data;

    const borrower = await this.findOne(borrowerId);
    const book = await this.bookService.findOne(bookId);

    if (book.availableQty <= 0)
      throw new BadRequestException({
        message: 'Book not available',
        statusCode: 400,
      });

    return this.prisna.$transaction(async (prisma) => {
      const currentBorrowers = await prisma.transaction.findMany({
        where: {
          bookId: bookId,
          returned: false,
        },
      });

      // if book is already borrowed by the maximum number of borrowers
      const isBorrowed = currentBorrowers.filter(
        (tnx) => tnx.borrowerId === borrower.id,
      );

      if (isBorrowed.length > 0)
        throw new BadRequestException({
          message: 'You have already borrowed this book',
          statusCode: 400,
        });

      if (currentBorrowers.length >= book.availableQty)
        throw new BadRequestException({
          message: 'Book reached maximum borrow limit',
          statusCode: 400,
        });

      return prisma.transaction.create({
        data: {
          bookId: bookId,
          borrowerId: borrowerId,
          borrowDate: new Date(),
          dueDate: new Date(dueDate),
        },
      });
    });
  }

  async returnBook(data: ReturnRequestDto) {
    const { borrowerId, bookId } = data;

    const borrowRequest = await this.prisna.transaction.findFirst({
      where: {
        bookId: bookId,
        borrowerId: borrowerId,
      },
    });

    if (!borrowRequest)
      throw new NotFoundException({
        message: 'Borrow request not found',
        statusCode: 404,
      });

    if (borrowRequest.returned)
      throw new BadRequestException({
        message: 'Book already returned',
        statusCode: 400,
      });

    return this.prisna.transaction.update({
      where: { id: borrowRequest.id },
      data: {
        returned: true,
        returnDate: new Date(),
      },
    });
  }

  async borrowedBooks(id: number) {
    return this.prisna.book.findMany({
      where: {
        transactions: {
          some: {
            // @ts-expect-error - As sometimes the ID is passed as a string
            borrowerId: parseInt(id),
            returned: false,
          },
        },
      },
    });
  }
}
