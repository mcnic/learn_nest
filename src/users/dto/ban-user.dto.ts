import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString, Length } from "class-validator";

export class BanUserDto {
  @ApiProperty({ example: "11", description: "user id" })
  @IsNumber({}, { message: "число" })
  readonly userId: number;

  @ApiProperty({ example: "cheater", description: "Причина" })
  @IsString({ message: "Должно быть строкой" })
  readonly banReason: string;
}
