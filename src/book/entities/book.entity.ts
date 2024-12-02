import { Book } from '@prisma/client';
import { ApiProperty } from "@nestjs/swagger";

export class BookEntity implements Book {
  @ApiProperty()
  id: number;

  @ApiProperty()
  author: string;

  @ApiProperty()
  isbn: string;

  @ApiProperty()
  availableQty: number;

  @ApiProperty()
  shelfLocation: string;

  @ApiProperty()
  title: string;
}