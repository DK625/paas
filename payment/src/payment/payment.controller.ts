import { Controller, Get, Post, Body, Query, Res, Req } from '@nestjs/common';
import { Request } from 'express';
import { PaymentService } from './payment.service';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { BalanceRepositories } from 'src/schema/repositories/balance.repositories';
import { PaymentInfoRepositories } from 'src/schema/repositories/paymentInfo.repositories';
import { TransactionRepositories } from 'src/schema/repositories/transaction.repositories';
import { App } from 'src/schema/app.schema';
import { TasksService } from 'src/tasks/tasks.service';

@Controller('payment')
export class PaymentController {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly balanceRepositories: BalanceRepositories,
    private readonly paymentInfoRepositories: PaymentInfoRepositories,
    private readonly transactionRepositories: TransactionRepositories,
    private readonly task: TasksService,
  ) {}

  @Post('create-payment-link')
  async createPaymentLink(
    @Req() req: Request,
    @Body() createPaymentDto: CreatePaymentDto,
  ) {
    const { id } = req.user;
    const protocol = req.protocol;
    const host = req.get('host');
    const fullUrl = `${protocol}://${host}`;
    const res = await this.paymentService.createPaymentLink(
      fullUrl,
      id,
      createPaymentDto,
    );

    return res.data;
  }

  @Get('payment-success')
  async paymentSuccess(@Query() query: any, @Res() res: any) {
    return this.paymentService.handlePaymentSuccess(query, res);
  }

  @Get('balance')
  async getBalance(@Req() req: Request) {
    const { id } = req.user;
    await this.task.updateBalance(id)
    return this.balanceRepositories.getBalance(id);
  }

  @Get('bills')
  async getBills(@Req() req: Request) {
    const { id } = req.user;
    console.log(id);

    return [
      {
        id: 'hadsidhaihdasidh',
        code: 'DBDAS',
        start: new Date(),
        end: new Date(),
        timeOfUse: 300,
        amount: 1000000,
        description: 'Payment for subscription',
        createdAt: new Date(),
      },
    ];
  }
  @Get('transaction')
  async getTransactions(@Req() req: Request) {
    const { id } = req.user;
    return this.transactionRepositories.getTransaction(id);
  }
  @Get('paymentInfo')
  async getPaymentInfo(@Req() req: Request) {
    const { id } = req.user;
    return this.paymentInfoRepositories.GetPaymentInfo(id);
  }

  @Post('create-app')
  async createApp(@Req() req: Request, @Body() body: App) {
    const { id } = req.user;
    const { appId, name, priceInHouse } = body;
    const res = await this.paymentService.createApp({
      userId: id,
      appId,
      name,
      isRunning: false,
      priceInHouse,
    });
    console.log('Res', res);

    return res;
  }

  @Post('change-status-app')
  async changeStatusApp(@Body() body: { status: boolean; appId: string }) {
    return await this.paymentService.changeStatusApp(body);
  }
}
