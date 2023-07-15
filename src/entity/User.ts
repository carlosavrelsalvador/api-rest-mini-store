import { hash } from "bcryptjs";
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
} from "typeorm";

import { DBTable } from "../constants/DBTable";
import { Roles } from "./../constants/Role";

@Entity(DBTable.USERS)
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    this.password = await hash(this.password, 12);
  }
  @Column()
  age: number;

  @Column()
  email!: string;

  @Column({ default: Roles.USER })
  role: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toResponse(): Partial<Users> {
    const responseUser = new Users();
    responseUser.id = this.id;
    responseUser.name = this.name;
    responseUser.email = this.email;
    responseUser.role = this.role;
    responseUser.createdAt = this.createdAt;
    responseUser.updatedAt = this.updatedAt;

    return responseUser;
  }
}
