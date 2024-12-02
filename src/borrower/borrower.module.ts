import { Module } from '@nestjs/common';
import { BorrowerController } from './controllers/borrower.controller';
import { BorrowerService } from './services/borrower.service';
import { PrismaModule } from '../prisma/prisma.module';
import { BookModule } from '../book/book.module';

@Module({
  controllers: [BorrowerController],
  providers: [BorrowerService],
  imports: [PrismaModule, BookModule],
})
export class BorrowerModule {}
