import { Field, ID, ObjectType } from 'type-graphql';
import { PrimaryGeneratedColumn, Column, Entity, OneToMany } from 'typeorm';
import { Lazy } from '../utils/seed-db';
import { Recipe } from './recipe';

@ObjectType()
@Entity()
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Field()
  @Column()
  email: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  nickname?: string;

  @Column()
  password: string;

  @OneToMany(() => Recipe, (recipe) => recipe.author, { lazy: true })
  @Field(() => [Recipe])
  recipes: Lazy<Recipe[]>;
}
