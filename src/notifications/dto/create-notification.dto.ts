import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class NotificationDto {
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
  @IsString()
  data?: object;

  @ApiProperty()
  @IsString()
  identifier?: string;
}