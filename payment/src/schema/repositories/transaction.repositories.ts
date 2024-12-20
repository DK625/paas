import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction, TransactionDocument } from '../transaction.schema';

@Injectable()
export class TransactionRepositories {
  constructor(
    @InjectModel(Transaction.name)
    private transactionModel: Model<TransactionDocument>,
  ) {}

  async createTransaction(
    paymentData: Partial<Transaction>,
  ): Promise<Transaction> {
    const payment = new this.transactionModel(paymentData);
    return payment.save();
  }

  async getTransaction(userId: string): Promise<Transaction[]> {
    return await this.transactionModel.find({ userId }).exec();
  }
}
