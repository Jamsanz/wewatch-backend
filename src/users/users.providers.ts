import { Connection } from "mongoose";
import { userSchema } from "./users.schema";

export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('User', userSchema),
    inject: ['DATABASE_CONNECTION']
  }
]