import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: "email@domain.org", description: "email" })
  readonly email: string;
  @ApiProperty({ example: "12345", description: "password" })
  readonly password: string;
}
