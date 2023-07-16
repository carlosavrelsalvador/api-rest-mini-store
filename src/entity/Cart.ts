import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "../constants/DBTable";

@Entity(DBTable.CARTS)
export class Carts {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  user_id: number;

  @Column({ default: 0 })
  count: number;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  ammount: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  toPayload(): Partial<Carts> {
    return {
      id: this.id,
      product_id: this.product_id,
      user_id: this.user_id,
      count: this.count,
      ammount: this.ammount,
      createdAt: this.createdAt,
    };
  }
}
