import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreateRoleDto {
  @ApiProperty({ example: "ADMIN", description: "role" })
  @IsNumber({}, { message: "число" })
  readonly value: string;

  @ApiProperty({ example: "admin", description: "info of role" })
  @IsString({ message: "Должно быть строкой" })
  readonly description: string;
}
