import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Storage } from "./Storage";
import { Category } from "./Category";

@Entity()
export class Item extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  brand: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @ManyToOne(() => Category, (category) => category.items)
  category: Category;

  @ManyToOne(() => Storage, (storage) => storage.items)
  storage: Storage;
}
