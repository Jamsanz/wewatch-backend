import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import Expo from 'expo-server-sdk';
import { Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';
import { isEmpty } from 'src/utils';
import INotification from './notifications.interface';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectModel('Notification')
    private readonly notificationModel: Model<INotification & Document>,
    private readonly usersService: UsersService
  ) {}

  public async findAll(): Promise<INotification[]> {
    return await this.notificationModel.find();
  }

  public async findUserNotifications(userId: string): Promise<INotification[]> {
    if (isEmpty(userId))
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    const notifications = await this.notificationModel
      .find({ userId })
      .sort({ createdAt: -1 });
    return notifications;
  }

  public async createNotification(data: INotification): Promise<INotification> {
    if (isEmpty(data)) throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return await this.notificationModel.create(data);
  }

  public async deleteNotification(id: string): Promise<INotification> {
    if (isEmpty(id))
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    const notification = await this.notificationModel.findByIdAndDelete(id);
    return notification;
  }

  public async deleteUserNotifications(userId: string): Promise<any> {
    if (isEmpty(userId))
      throw new HttpException('Bad request', HttpStatus.BAD_REQUEST);
    return await this.notificationModel.deleteMany({ userId });
  }

  async sendNotification({region, message, title}: {region: string, message: string, title: string, }) {
    // create new Expo SDK client
    const expo = new Expo();

    let pushTokens = await this.usersService.getRegionTokens(region);

    // create push messages
    const messages = {
      to: pushTokens.map(token => token.pushToken),
      title,
      body: message,
      data: { message, userIds: pushTokens.map(user => user._id ) },
    };

    // send messages using Expo
    const chunks = expo.chunkPushNotifications([messages]);
    const tickets = [];
    for (const chunk of chunks) {
      try {
        const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
        
        messages.data.userIds.map(async (id) => {
         await this.createNotification({ title: messages.title, body: messages.body, userId: id });
        })

      } catch (error) {
        console.error(`Failed to send notification chunk: ${error}`);
      }
    }

    // handle tickets
    const receiptIds = [];
    for (const ticket of tickets) {
      if (ticket.status === 'ok') {
        receiptIds.push(ticket.id);
      }
    }

    // get push receipt details
    const receiptDetails = await expo.getPushNotificationReceiptsAsync(
      receiptIds,
    );

    // handle receipt details
    for (const receiptId in receiptDetails) {
      const status = receiptDetails[receiptId].status;
      if (status === 'error') {
        console.error(
          `Failed to send notification with receipt ID ${receiptId}: ${receiptDetails[receiptId].details}`,
        );
      }
    }
  }
}
