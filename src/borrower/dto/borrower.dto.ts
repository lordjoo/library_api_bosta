import {
  IsString,
  IsEmail,
  IsOptional,
  IsDateString,
  IsNumber,
  MinDate,
  IsDate,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateBorrowerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsEmail()
  email: string;
}

export class UpdateBorrowerDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email: string;
}

export class BorrowRequestDto {
  @ApiProperty()
  @IsNumber()
  bookId: number;

  @ApiProperty()
  @IsNumber()
  borrowerId: number;

  @ApiProperty()
  @IsDateString()
  dueDate: Date;
}

export class ReturnRequestDto {
  @ApiProperty()
  @IsNumber()
  bookId: number;

  @ApiProperty()
  @IsNumber()
  borrowerId: number;
}
