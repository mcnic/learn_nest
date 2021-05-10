import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/auth/roles-auth.decorator";
import { RolesGuard } from "src/auth/roles.guard";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./roles.model";
import { RolesService } from "./roles.service";

@ApiTags("Роли")
@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @ApiOperation({ summary: "Создание роли" })
  @ApiResponse({ status: 200, type: Role })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @ApiOperation({ summary: "Получение роли по Value" })
  @ApiResponse({ status: 200, type: [Role] })
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get("/:value")
  async getByValue(@Param() params: {}) {
    const value = params["value"];

    if (!value || typeof value !== "string") {
      throw new HttpException(
        "Не заполнено поле 'value'",
        HttpStatus.BAD_REQUEST
      );
    }

    const role = await this.rolesService.getAllRoleByValue(value);

    if (!role) {
      throw new HttpException("Роль не найдена", HttpStatus.NOT_FOUND);
    }
    return role;
  }
}
