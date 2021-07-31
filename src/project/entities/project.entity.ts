import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Project {
  @Field()
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Field()
  @Column()
  name: string;
  @Field(() => Int)
  @Column()
  code: number;
}
