import mongoose from "mongoose";

export const databaseProviders = [
  {
    provide: 'DATABASE_CONNECTION',
    useFactory: async (): Promise<typeof mongoose> => mongoose.connect(process.env.MONGO_URI)
  }
];