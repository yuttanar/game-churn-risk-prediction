import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { EActivityAction } from "../enum/activity-action.enum";
import { User } from "./User";

@Entity()
export class Activity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    enum: EActivityAction,
    default: EActivityAction.LOGIN,
  })
  action: number;

  @Column({
    nullable: true,
  })
  durationInMS: number;

  @Column({
    nullable: true,
  })
  amount: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  // ---------- start relation ----------//

  @ManyToOne(() => User, (user) => user.activities)
  @JoinColumn()
  user: User;
}
