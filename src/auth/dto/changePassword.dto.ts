import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import { IPasswordUpdate } from "src/users/users.interface";
import { LoginDto } from "./login.dto";

class ChangePasswordDto extends LoginDto implements IPasswordUpdate {
  @ApiProperty()
  @IsString()
  newPassword: string;
}

export default ChangePasswordDto;