import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { DBTable } from "../constants/DBTable";
import { Category } from "../constants/Category";
import { Status } from "../constants/Status";

@Entity(DBTable.PRODUCTS)
export class Products {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "decimal", precision: 5, scale: 2, default: 0 })
  price: number;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ default: Category.DEFAULT })
  category: string;

  @Column({ default: Status.DEFAULT })
  status: string;

  toPayload(): Partial<Products> {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      category: this.category,
      price: this.price,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}
