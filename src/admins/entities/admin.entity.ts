import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('admins')
export class Admin {
  @ApiProperty({example: 1, description: 'Unique ID'})
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'first_name', description: 'Admin first name'})
  @Column({type: 'text'})
  first_name: string;

  @ApiProperty({ example: 'last_name', description: 'Admin last name'})
  @Column({type: 'text'})
  last_name: string;

  @ApiProperty({ example: 'birthday_date', description: 'Admin birthday date'})
  @Column()
  birthday_date: Date;

  @ApiProperty({ example: 'phone', description: 'Admin phone number'})
  @Column({type: 'text'})
  phone: string;

  @ApiProperty({ example: 'mail', description: 'Admin email'})
  @Column({type: 'text'})
  mail: string;

  @ApiProperty({ example: 'hashed_password', description: 'Admin hashed password'})
  @Column({type: 'text'})
  hashed_password: string;

  @ApiProperty({ example: 'activate', description: 'Admin is active?'})
  @Column({ default: false })
  is_active: boolean;

  @ApiProperty({ example: 'super', description: 'Admin is super?'})
  @Column({ default: false })
  is_super: boolean;

  @ApiProperty({ example: 'Link', description: 'Admin account activation link'})
  @Column({type: 'text'})
  activation_link: string

  @ApiProperty({ example: 'hashed_token', description: 'Admin hashed refresh token'})
  @Column({nullable: true})
  hashed_refresh_token: string
}