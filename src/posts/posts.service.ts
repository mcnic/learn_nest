import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { FilesService } from "src/files/files.service";
import { CreatePostFormDto } from "./dto/create-post-form.dto";
import { CreatePostDto } from "./dto/create-post.dto";
import { Post } from "./posts.model";

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post) private postRepository: typeof Post,
    private fileService: FilesService
  ) {}

  async create(dto: CreatePostDto, image: any) {
    const fileName = await this.fileService.createFile(image);
    const data = {
      ...dto,
      image: fileName,
    };
    console.log("data", data);

    const post = await this.postRepository.create(data);
    return post;
  }
}
