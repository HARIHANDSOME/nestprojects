import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('LoginInfo')
export class LoginEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column({ default:null,nullable:true })
  password: string;

  @Column({ default:null,nullable:true })
  user_id: string;

  @Column({ default:null,nullable:true })
  hash:string;
}


