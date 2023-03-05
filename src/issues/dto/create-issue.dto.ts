import { ApiProperty } from "@nestjs/swagger";
import { IsObject, IsString } from "class-validator";

export class CreateIssueDto {
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
  media: { type: string; uri: string };
  
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
}
