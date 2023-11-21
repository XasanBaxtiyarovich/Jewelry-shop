import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @ApiProperty({example: 1, description: 'Unique ID'})
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ApiProperty({ example: 'first_name', description: 'User first name'})
  @Column({type: 'text'})
  first_name: string;

  @ApiProperty({ example: 'mail', description: 'User email'})
  @Column({type: 'text'})
  mail: string;

  @ApiProperty({ example: 'hashed_password', description: 'User hashed password'})
  @Column({type: 'text'})
  hashed_password: string;

  @ApiProperty({ example: 'activate', description: 'User is active?'})
  @Column({ default: false })
  is_active: boolean;

  @ApiProperty({ example: 'Link', description: 'User account activation link'})
  @Column({type: 'text'})
  activation_link: string

  @ApiProperty({ example: 'hashed_token', description: 'User hashed refresh token'})
  @Column({nullable: true})
  hashed_refresh_token: string
}