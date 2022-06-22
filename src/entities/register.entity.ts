import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('RegisterInfo')
export class RegisterEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: null, nullable: true })
  user_name: string;

  @Column({ default: null, nullable: true, type: 'bigint' })
  // @Column({unique:true,length:10})
  phone_number: string;

  @UpdateDateColumn()
  create_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ default: 'pending' })
  status: string;
  
}
