import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { App, AppDocument } from '../app.schema';
import { TransactionRepositories } from './transaction.repositories';

@Injectable()
export class AppRepositories {
  constructor(
    @InjectModel(App.name) private AppModel: Model<AppDocument>,
    private readonly transactionRepositories: TransactionRepositories,
  ) {}

  async createApp(data: App): Promise<App> {
    const { userId, appId, name, priceInHouse } = data;
    return await this.AppModel.create({
      userId,
      appId,
      name,
      priceInHouse,
    });
  }

  async getApps(userId: string): Promise<App[]> {
    return await this.AppModel.find({ userId }).exec();
  }

  async changeStatusApp({
    appId,
    status,
  }: {
    appId: string;
    status: boolean;
  }): Promise<void> {
    await this.AppModel.findOneAndUpdate(
      { appId },
      { isRunning: status },
      { new: true },
    ).exec();
  }
}
