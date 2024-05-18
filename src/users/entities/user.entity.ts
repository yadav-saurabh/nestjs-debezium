import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  profile: string;

  @Column({ name: 'is_active', default: true })
  isActive: boolean;
}

// INSERT INTO user (firstName, lastName, email) VALUES ( 'test', 'test', 'test@test.com');
