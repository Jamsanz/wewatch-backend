import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { isEmpty } from 'src/utils';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { Issue } from './issues.interface';

@Injectable()
export class IssuesService {

  constructor(
    @InjectModel('Issue') private readonly issuesModel: Model<Issue & Document>
  ) { }
  
  async create(createIssueDto: CreateIssueDto): Promise<Issue> {
    return await this.issuesModel.create(createIssueDto);
  }

  async findAll(): Promise<Issue[]> {
    return await this.issuesModel.find().sort({createdAt: -1}).populate('user_id');
  }

  async findOne(id: string): Promise<Issue> {
    if (isEmpty(id)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    return await this.issuesModel.findById(id);
  }
  
  async update(id: string, updateIssueDto: UpdateIssueDto) {
    if (isEmpty(id) || isEmpty(updateIssueDto)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    return await this.issuesModel.findByIdAndUpdate(id, updateIssueDto);
  }
  
  async remove(id: string) {
    if (isEmpty(id)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
    return await this.issuesModel.findByIdAndDelete(id);
  }
}
