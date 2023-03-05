import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IUser } from "../users.interface";

class CreateUserDto implements IUser {

  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  lga: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsString()
  ward?: string;

  @ApiProperty()
  @IsString()
  pollingUnit: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsString()
  pushToken?: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  role: string;

}

export default CreateUserDto;
