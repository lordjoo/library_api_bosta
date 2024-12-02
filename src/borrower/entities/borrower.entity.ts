import { Borrower } from '@prisma/client';
import { ApiProperty } from "@nestjs/swagger";

export class BorrowerEntity implements Borrower {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  registeredAt: Date;

  trabsactions?: any[];
}
