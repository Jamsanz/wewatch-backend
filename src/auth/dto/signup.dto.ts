import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { IUser } from 'src/users/users.interface';

export class SignUpDto implements IUser {
  @ApiProperty()
  @IsString()
  firstName: string;
  
  @ApiProperty()
  @IsString()
  lastName: string;
  
  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  profileImg: string;
  
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
