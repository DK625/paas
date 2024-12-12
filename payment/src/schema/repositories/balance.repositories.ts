import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Balance, BalanceDocument } from '../balance.schema';
import { TransactionRepositories } from './transaction.repositories';

@Injectable()
export class BalanceRepositories {
  constructor(
    @InjectModel(Balance.name) private balanceModel: Model<BalanceDocument>,
    private readonly transactionRepositories: TransactionRepositories,
  ) {}

  async getUsers(): Promise<string[]> {
    const balance = await this.balanceModel.find().exec();
    return balance.map((balance) => balance.userId);
  }

  async getBalance(userId: string): Promise<Balance> {
    const balance = await this.balanceModel
      .findOneAndUpdate(
        { userId },
        { $inc: { balance: 0 } },
        {
          new: true,
          upsert: true,
        },
      )
      .exec();
    return balance;
  }

  async updateBalance(
    userId: string,
    amount: number,
    description: string,
  ): Promise<boolean> {
    const balance = await this.balanceModel
      .findOneAndUpdate(
        { userId },
        { $inc: { balance: amount } },
        { new: true },
      )
      .exec();

    if (balance) {
      this.transactionRepositories.createTransaction({
        amount,
        description,
        userId,
      });
      return true;
    }
    return false;
  }

  async updateCost(
    userId: string,
    costUsed: number,
    estimatedCost: number,
    estimatedTime: Date,
  ): Promise<void> {
    await this.balanceModel
      .findOneAndUpdate(
        { userId },
        { costUsed, estimatedCost, estimatedTime, updatedAt: new Date() },
        { new: true },
      )
      .exec();
  }
}
