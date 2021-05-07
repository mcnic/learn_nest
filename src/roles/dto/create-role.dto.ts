import { ApiProperty } from "@nestjs/swagger";

export class CreateRoleDto {
  @ApiProperty({ example: "ADMIN", description: "role" })
  readonly value: string;
  @ApiProperty({ example: "admin", description: "info of role" })
  readonly description: string;
}
