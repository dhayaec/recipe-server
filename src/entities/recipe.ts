import { Field, ID, ObjectType } from 'type-graphql';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { Lazy } from '../utils/seed-db';
import { Rate } from './rate';
import { User } from './user';

@Entity()
@ObjectType()
export class Recipe {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  title: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  description?: string;

  @Field(() => [Rate])
  @OneToMany(() => Rate, (rate) => rate.recipe, {
    lazy: true,
    cascade: ['insert'],
  })
  ratings: Lazy<Rate[]>;

  @Field(() => User)
  @ManyToOne(() => User, { lazy: true })
  author: Lazy<User>;
}
