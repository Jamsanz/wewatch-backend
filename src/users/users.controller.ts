import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Patch,
  Delete,
  Res,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiHeader, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/auth/auth.interface';
import { IUser } from 'src/users/users.interface';
import { UsersService } from 'src/users/users.service';
import { response } from 'src/utils';

@ApiTags('users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  public async getUsers(): Promise<response<IUser[]>> {
    const data = await this.usersService.findAll();
    return { data, success: true, message: 'Find All' };
  }

  @Get('user/:id')
  public async getUserById(@Param('id') id: string): Promise<response<IUser>> {
    const data = await this.usersService.findById(id);
    return { data, success: true, message: 'Find By Id' };
  }

  @Get('/identity')
  public getIdentity(@Req() req: RequestWithUser) {
    return req.user;
  }

  @Get('/region')
  async getRegion() {
    return await this.usersService.getRegionTokens('Zaria');
  }

  @Post()
  public async createUser(@Body() user: IUser): Promise<response<IUser>> {
    const data = await this.usersService.create(user);
    return { data, success: true, message: 'created successfully' };
  }

  @Patch(':id')
  public async updateUser(
    @Param('id') id: string,
    @Body() user: IUser,
  ): Promise<response<IUser>> {
    const data = await this.usersService.update(id, user);
    return { data, success: true, message: 'updated successfully' };
  }

  @Put(':id/push-token')
  public async updatePushToken(
    @Param('id') id: string,
    @Body() token: IUser,
  ): Promise<response<IUser>> {
    const data = await this.usersService.updatePushToken(id, token.pushToken);
    return { data, success: true, message: 'updated successfully' };
  }

  @Delete(':id')
  public async deleteUser(@Param('id') id: string): Promise<response<IUser>> {
    const data = await this.usersService.delete(id);
    return { data, success: true, message: 'deleted successfully' };
  }
}
