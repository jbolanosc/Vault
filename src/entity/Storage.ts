import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  BaseEntity,
} from "typeorm";
import { Item } from "./Item";
import { Warehouse } from "./Warehouse";

@Entity()
export class Storage extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  space: string;

  @ManyToOne(() => Warehouse, (warehouse) => warehouse.storages)
  warehouse: Warehouse;

  @OneToMany(() => Item, (item) => item.storage)
  items: Item[];
}
