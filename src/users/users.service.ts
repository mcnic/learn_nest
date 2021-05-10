import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { RolesService } from "src/roles/roles.service";
import { AddRoleDto } from "./dto/add-role.dto";
import { BanUserDto } from "./dto/ban-user.dto";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./users.model";

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User) private userRepository: typeof User,
    private rolesService: RolesService
  ) {}

  async createUser(dto: CreateUserDto) {
    let user = await this.getUserByEmail(dto.email);
    if (user) {
      throw new HttpException("Пользователь уже существует", HttpStatus.FOUND);
    }

    user = await this.userRepository.create(dto);
    const role = await this.rolesService.getAllRoleByValue("USER");
    if (!role) {
      throw new HttpException("Роль не найдена", HttpStatus.NOT_FOUND);
    }

    await user.$set("roles", [role.id]);
    user = await this.getUserByEmail(user.email);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll({
      // include: { all: true },
      include: "roles",
    });
    return users;
  }

  async getUserByEmail(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
      include: { all: true },
    });
    return user;
  }

  async validateUser(email: string, password: string) {
    const user = await this.userRepository.findOne({
      where: { email, password },
      include: { all: true },
    });
    return user;
  }

  async addRole(dto: AddRoleDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    const role = await this.rolesService.getAllRoleByValue(dto.value);
    if (!user || !role) {
      throw new HttpException(
        "Пользователь или роль не найдены",
        HttpStatus.NOT_FOUND
      );
    }

    await user.$add("role", role.id);
    return dto;
  }

  async banUser(dto: BanUserDto) {
    const user = await this.userRepository.findByPk(dto.userId);
    if (!user) {
      throw new HttpException("Пользователь не найден", HttpStatus.NOT_FOUND);
    }

    user.banned = true;
    user.banReason = dto.banReason;
    await user.save();
    return user;
  }
}
