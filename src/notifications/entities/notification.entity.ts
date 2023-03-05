import { ApiProperty } from '@nestjs/swagger';
import { IsObject, isString, IsString, IsBoolean } from 'class-validator';
import INotification from '../notifications.interface';

export class Notification implements INotification {

  @ApiProperty()
  @IsString()
  _id: string;

  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  body: string;

  @ApiProperty()
  @IsObject()
  data?: object;

  @ApiProperty()
  @IsString()
  identifier?: string;

}
