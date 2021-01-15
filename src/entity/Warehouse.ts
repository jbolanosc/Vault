import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  OneToMany,
  BaseEntity,
} from "typeorm";
import { User } from "./User";
import { Storage } from "./Storage";
import { Client } from "./Client";

@Entity()
export class Warehouse extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  space: number;

  @Column()
  bathrooms: number;

  @Column()
  floor: number;

  @Column()
  description: string;

  @Column("text", { array: true })
  amenities: string[];

  @Column("text", { nullable: true })
  pictureUrl: string;

  @Column()
  priceMonth: number;

  @Column()
  priceDay: number;

  @Column("double precision") latitude: number;

  @Column("double precision") longitude: number;

  @OneToMany(() => Storage, (storage) => storage.warehouse)
  storages: Storage[];

  @ManyToOne(() => User, (user) => user.warehouses)
  user: User;

  @ManyToOne(() => Client, (client) => client.warehouses)
  clients: Client;
}
