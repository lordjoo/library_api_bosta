import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchBookQueryDto {
  @ApiProperty({ required: false })
  title?: string;

  @ApiProperty({ required: false })
  author?: string;

  @ApiProperty({ required: false })
  isbn?: string;
}

export class CreateBookDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  author: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  isbn: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  availableQty: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  shelfLocation: string;
}

export class UpdateBookDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  author?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  availableQty?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  shelfLocation?: string;
}
