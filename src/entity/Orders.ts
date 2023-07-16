import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  user_id: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  totalAmount: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toPayload(): Partial<Orders> {
    return {
      id: this.id,
      code: this.code,
      seller: this.seller,
      user_id: this.user_id,
      totalAmount: this.totalAmount,
      createdAt: this.createdAt,
    };
  }
}
