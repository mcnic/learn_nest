import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsString } from "class-validator";

export class CreatePostFormDto {
  @ApiProperty({ example: "Заголовок", description: "заголовок" })
  @IsString({ message: "Должно быть строкой" })
  readonly title: string;

  @ApiProperty({ example: "Lorem ....", description: "Содержимое" })
  @IsString({ message: "Должно быть строкой" })
  readonly content: string;

  // @ApiProperty({ example: "url", description: "url" })
  // @IsString({ message: "Должно быть строкой" })
  // readonly image: string;

  @ApiProperty({ example: "1", description: "user id" })
  // @IsNumber({}, { message: "число" })
  @IsString({ message: "Должно быть строкой" })
  readonly userId: string;
}
