import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateRoleDto } from "./dto/create-role.dto";
import { Role } from "./roles.model";
import { RolesService } from "./roles.service";

@Controller("roles")
export class RolesController {
  constructor(private rolesService: RolesService) {}

  @Post()
  create(@Body() roleDto: CreateRoleDto) {
    return this.rolesService.createRole(roleDto);
  }

  @Get("/:value")
  getByValue(@Param("value") value: string) {
    return this.rolesService.getAllRoleByValue(value);
  }
}
