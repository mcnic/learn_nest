import { ApiProperty } from "@nestjs/swagger";

export class AddRoleDto {
  @ApiProperty({ example: "1", description: "user id" })
  readonly userId: number;
  @ApiProperty({ example: "USER", description: "role" })
  readonly value: string;
}
