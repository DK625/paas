import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PaymentInfo, PaymentInfoDocument } from '../PaymentInfo.schema';
import { BalanceRepositories } from './balance.repositories';
import { TransactionRepositories } from './transaction.repositories';

@Injectable()
export class PaymentInfoRepositories {
  constructor(
    @InjectModel(PaymentInfo.name)
    private paymentInfoModel: Model<PaymentInfoDocument>,
    private readonly balanceRepositories: BalanceRepositories,
    private readonly transactionRepositories: TransactionRepositories,
  ) {}

  async createPaymentInfo(
    paymentData: Partial<PaymentInfo>,
  ): Promise<PaymentInfo> {
    const payment = new this.paymentInfoModel(paymentData);
    return payment.save();
  }

  async PaymentSuccess(orderId: number): Promise<boolean> {
    const paymentInfo = await this.paymentInfoModel.findOne({ orderId }).exec();

    if (paymentInfo && paymentInfo.status === 'pending') {
      await this.paymentInfoModel
        .updateOne({ orderId }, { status: 'success' })
        .exec();

      const { userId, amount } = paymentInfo;
      const description = 'Nạp tiền qua cổng thanh toán';
      this.balanceRepositories.updateBalance(userId, amount, description);
      return true;
    }

    return false;
  }
  async GetPaymentInfo(userId: string): Promise<PaymentInfo[]> {
    const paymentInfos = await this.paymentInfoModel.find({ userId }).exec();

    return paymentInfos;
  }
}
