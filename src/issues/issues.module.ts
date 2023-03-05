import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { AuthMiddleware } from 'src/auth/auth.middleware';
import { MongooseModule } from '@nestjs/mongoose';
import { issueSchema } from './issues.schema';
import { UsersModule } from 'src/users/users.module';
import { userSchema } from 'src/users/users.schema';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { notificationSchema } from 'src/notifications/notifications.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Issue',
        schema: issueSchema
      }, {
        name: 'User',
        schema: userSchema
      }, {
        name: 'Notification',
        schema: notificationSchema
      }
    ]),
    UsersModule,
    NotificationsModule
  ],
  controllers: [IssuesController],
  providers: [IssuesService, UsersService, NotificationsService]
})

export class IssuesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
      consumer.apply(AuthMiddleware).forRoutes('issues')
  }
}
