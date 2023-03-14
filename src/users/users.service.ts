import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IUser } from 'src/users/users.interface';
import { isEmpty } from 'src/utils';
import UpdateUserDto from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private userModel: Model<IUser & Document>,
  ) {}
  public async findAll(): Promise<IUser[]> {
    return await this.userModel.find();
  }

  public async findById(id: string): Promise<IUser> {
    return await this.userModel.findById(id);
  }

  public async create(user: IUser): Promise<IUser> {
    if (isEmpty(user))
      throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    return await this.userModel.create(user);
  }

  public async update(id: string, data: UpdateUserDto): Promise<IUser> {
    if (isEmpty(id) || isEmpty(data))
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    await this.userModel.findByIdAndUpdate(id, data);
    return this.findById(id);
  }
  
  public async delete(id: string): Promise<IUser> {
    if (isEmpty(id))
    throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    return await this.userModel.findByIdAndDelete(id);
  }
  
  public async updatePushToken(userId: string, pushToken: string): Promise<IUser> {
    if (isEmpty(userId) || isEmpty(pushToken)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    return await this.userModel.findByIdAndUpdate(userId, {pushToken});
  }

  public async getRegionTokens(region: string) {
    if (isEmpty(region)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    return await this.userModel.find({ state: region, pushToken: {$ne: null} }).select('pushToken');
  }
  
}
