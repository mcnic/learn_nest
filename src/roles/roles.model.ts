import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from "sequelize-typescript";
import { ApiProperty } from "@nestjs/swagger";
import { User } from "src/users/users.model";
import { UserRoles } from "./user-roles.model";

interface RoleCreationAttrs {
  value: string;
  description: string;
}

@Table({ tableName: "roles" })
export class Role extends Model<Role, RoleCreationAttrs> {
  @ApiProperty({ example: "1", description: "уникальный идентификатор" })
  @Column({ unique: true, autoIncrement: true, primaryKey: true })
  id: number;

  @ApiProperty({ example: "admin", description: "role" })
  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  value: string;

  @ApiProperty({ example: "administrator", description: "role description" })
  @Column({ type: DataType.STRING, allowNull: false })
  description: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
