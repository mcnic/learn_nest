import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Recoverable } from "repl";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { CreatePostFormDto } from "./dto/create-post-form.dto";
import { PostsService } from "./posts.service";

@ApiTags("Пользователи")
@Controller("posts")
export class PostsController {
  constructor(private postsService: PostsService) {}

  @ApiOperation({ summary: "Создание поста" })
  @ApiResponse({ status: 200, type: Post })
  @Roles("USER")
  @UseGuards(RolesGuard)
  @Post()
  @UseInterceptors(FileInterceptor("image"))
  createPost(@Body() dto: CreatePostFormDto, @UploadedFile() image) {
    return this.postsService.create(
      { ...dto, userId: Number(dto.userId) },
      image
    );
  }
}
