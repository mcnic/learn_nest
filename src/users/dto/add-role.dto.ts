import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class AddRoleDto {
  @ApiProperty({ example: "1", description: "user id" })
  @IsNumber({}, { message: "число" })
  readonly userId: number;

  @ApiProperty({ example: "USER", description: "role" })
  @IsString({ message: "строка" })
  readonly value: string;
}
