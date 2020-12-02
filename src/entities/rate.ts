import { ObjectType, Field, Int } from 'type-graphql';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';
import { User } from './user';
import { Recipe } from './recipe';
import { Lazy } from '../utils/seed-db';

@Entity()
@ObjectType()
export class Rate {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field(() => Int)
  @Column({ type: 'int' })
  value: number;

  @Field(() => User)
  @ManyToOne(() => User, { lazy: true })
  user: Lazy<User>;

  @Field()
  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => Recipe, { lazy: true })
  recipe: Lazy<Recipe>;
}
