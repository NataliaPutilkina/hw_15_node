import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  JoinColumn,
} from "typeorm";
import { User } from "./user";

export enum Genre {
  Politic = "Politic",
  Business = "Business",
  Sport = "Sport",
  Other = "Other",
}

@Entity()
export class Newspost {
  @PrimaryGeneratedColumn("increment")
  id!: number;

  @Column({ type: "varchar", length: 50 })
  header!: string;

  @Column({ type: "text" })
  text!: string;

  @Column({
    type: "enum",
    enum: Genre,
    default: Genre.Other,
  })
  genre!: Genre;

  @Column({ type: "boolean", default: false })
  isPrivate!: boolean;

  @Column({ type: "boolean", default: false })
  deleted!: boolean;

  @CreateDateColumn({ type: "timestamp" })
  createDate!: Date;

  @ManyToOne(() => User, (user) => user.newsposts, {
    eager: false,
    onDelete: "SET NULL",
  })
  @JoinColumn({ name: "authorId" })
  author?: User;

  @Column({ type: "int", nullable: true })
  authorId?: number;
}
