import { ApiProperty } from "@nestjs/swagger";
import { IsObject, isString, IsString, IsBoolean } from "class-validator";
import { Issue as IIssue } from "../issues.interface";

export class Issue implements IIssue {
  @ApiProperty()
  @IsString()
  user_id: string;
  
  @ApiProperty()
  @IsString()
  title: string;
  
  @ApiProperty()
  @IsString()
  description: string;
  
  @ApiProperty()
  @IsObject()
  media: { type: string; uri: string; };
  
  @ApiProperty()
  @IsString()
  ward?: string;
  
  @ApiProperty()
  @IsString()
  state?: string;
  
  @ApiProperty()
  @IsString()
  lga?: string;
  
  @ApiProperty()
  @IsString()
  pollingUnit?: string;

  @ApiProperty()
  @IsString()
  _id?: string;

  @ApiProperty()
  @IsBoolean()
  consent: boolean;
}