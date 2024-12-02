import { Module } from '@nestjs/common';
import { BookModule } from "../book/book.module";
import { PrismaService } from "../prisma/prisma.service";
import { BorrowerModule } from "../borrower/borrower.module";

@Module({
  imports: [
    BookModule,
    BorrowerModule
  ]
})
export class AppModule {}
