import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DBTable } from "../constants/DBTable";

@Entity(DBTable.ORDERS)
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column({ default: "ecommerce" })
  seller: string;

  @Column()
  customer: string;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  totalAmount: number;

  @CreateDateColumn()
  createdAt!: Date;
}
