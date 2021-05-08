import { ApiProperty } from "@nestjs/swagger";

export class BanUserDto {
  @ApiProperty({ example: "11", description: "user id" })
  readonly userId: number;
  @ApiProperty({ example: "cheater", description: "Причина" })
  readonly banReason: string;
}
