// src/user.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  Uid: number;

  @Column()
  Username: string;

  @Column()
  City: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'Friend' })
  Friend: User;
}

export default User; // Add this line to export the User class
