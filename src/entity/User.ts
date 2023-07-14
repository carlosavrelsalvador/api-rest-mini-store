import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from "typeorm";
import { DBTable } from "../constants/DBTable";
import { Roles } from "./../constants/Role";

@Entity(DBTable.USERS)
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  age: number;

  @Column()
  email!: string;

  @Column({ default: Roles.USER })
  role: number;

  @CreateDateColumn()
  createdAt!: Date;
}
