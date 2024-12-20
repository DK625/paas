import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Bill, BillDocument } from '../bill.schema';

@Injectable()
export class BillRepositories {
  constructor(@InjectModel(Bill.name) private BillModel: Model<BillDocument>) {}

  async getBill(userId: string): Promise<Bill[]> {
    const Bill = await this.BillModel.find({ userId }).exec();
    return Bill;
  }
  async createBill(bill: Bill): Promise<void> {
    await this.BillModel.create(bill);
  }
}
