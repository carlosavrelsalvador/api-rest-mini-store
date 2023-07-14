import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DBTable } from "../constants/DBTable";

@Entity(DBTable.PRODUCTS)
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  name: string;

  @Column()
  description: string;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  price: number;

  @CreateDateColumn()
  createdAt!: Date;
}
