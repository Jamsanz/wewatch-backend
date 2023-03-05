import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RequestWithUser } from 'src/auth/auth.interface';
import { NotificationDto } from './dto/create-notification.dto';
import INotification from './notifications.interface';
import { NotificationsService } from './notifications.service';

@ApiTags('notifications')
@ApiBearerAuth()
@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  async createNotification(@Body() notification: NotificationDto) {
    return await this.notificationsService.createNotification(notification);
  }

  @Get()
  async getNotifications() {
    return await this.notificationsService.findAll();
  }

  @Get('user')
  async getUserNotifications(@Req() req: RequestWithUser) {
    return await this.notificationsService.findUserNotifications(`${req.user._id}`);
  }

  @Delete('delete/:id')
  async deleteNotification(@Param('id') id: string) {
    return await this.notificationsService.deleteNotification(id);
  }

  @Delete('delete')
  async deleteUserNotifications(@Req() req: RequestWithUser) {
    return await this.notificationsService.deleteUserNotifications(
      req.user._id,
    );
  }
}
