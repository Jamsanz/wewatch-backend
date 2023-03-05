import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { notificationSchema } from './notifications.schema';
import { userSchema } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';
import { AuthMiddleware } from 'src/auth/auth.middleware';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Notification',
        schema: notificationSchema,
      },
      {
        name: 'User',
        schema: userSchema,
      },
    ]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, UsersService],
})
  
export class NotificationsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes('notifications')
  }
}
