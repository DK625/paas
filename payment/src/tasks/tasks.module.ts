import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentInfo, PaymentInfoSchema } from 'src/schema/PaymentInfo.schema';
import { Balance, BalanceSchema } from 'src/schema/balance.schema';
import { Transaction, TransactionSchema } from 'src/schema/transaction.schema';
import { App, AppSchema } from 'src/schema/app.schema';
import { AppRepositories } from 'src/schema/repositories/app.repositories';
import { TransactionRepositories } from 'src/schema/repositories/transaction.repositories';
import { PaymentInfoRepositories } from 'src/schema/repositories/paymentInfo.repositories';
import { BalanceRepositories } from 'src/schema/repositories/balance.repositories';
import { PaymentService } from 'src/payment/payment.service';
import { BillRepositories } from 'src/schema/repositories/bill.repositories';
import { Bill, BillSchema } from 'src/schema/bill.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PaymentInfo.name, schema: PaymentInfoSchema },
    ]),
    MongooseModule.forFeature([{ name: Balance.name, schema: BalanceSchema }]),
    MongooseModule.forFeature([
      { name: Transaction.name, schema: TransactionSchema },
    ]),
    MongooseModule.forFeature([{ name: App.name, schema: AppSchema }]),
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
  ],
  providers: [
    PaymentService,
    BalanceRepositories,
    PaymentInfoRepositories,
    TransactionRepositories,
    BillRepositories,
    AppRepositories,
    TasksService,
  ],
})
export class TasksModule {}
