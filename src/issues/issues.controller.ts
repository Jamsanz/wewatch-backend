import { Controller, Get, Post, Body, Patch, Param, Delete, Req } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { CreateIssueDto } from './dto/create-issue.dto';
import { UpdateIssueDto } from './dto/update-issue.dto';
import { RequestWithUser } from 'src/auth/auth.interface';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';

@ApiTags('issues')
@ApiBearerAuth()
@Controller('issues')
export class IssuesController {
  constructor(private readonly issuesService: IssuesService, private readonly notificationService: NotificationsService) {}

  @Post()
  async create(@Body() createIssueDto: CreateIssueDto, @Req() req: RequestWithUser) {
    this.notificationService.sendNotification({title: createIssueDto.title, message: req.user.state, region: req.user.lga})
    return this.issuesService.create({
      ...createIssueDto,
      state: req.user.state,
      ward: req.user.ward,
      lga: req.user.lga,
      pollingUnit: req.user.pollingUnit,
      user_id: req.user._id,
    });
  }

  @Get()
  findAll() {
    return this.issuesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.issuesService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateIssueDto: UpdateIssueDto) {
    return this.issuesService.update(id, updateIssueDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.issuesService.remove(id);
  }
}
