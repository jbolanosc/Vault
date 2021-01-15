import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { Item } from "./Item";

@Entity()
export class Category extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: number;

  @Column()
  description: string;

  @OneToMany(() => Item, (item) => item.category)
  items: Item[];
}
