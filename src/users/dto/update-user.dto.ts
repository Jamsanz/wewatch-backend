import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";
import CreateUserDto from "./create-user.dto";

class UpdateUserDto extends PartialType(CreateUserDto) {
}

export default UpdateUserDto;
