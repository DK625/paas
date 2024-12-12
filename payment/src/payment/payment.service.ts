import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as crypto from 'crypto';
import { ConfigService } from '@nestjs/config';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { PaymentInfoRepositories } from 'src/schema/repositories/paymentInfo.repositories';
import { BalanceRepositories } from 'src/schema/repositories/balance.repositories';
import { AppRepositories } from 'src/schema/repositories/app.repositories';
import { App } from 'src/schema/app.schema';

@Injectable()
export class PaymentService {
  private readonly apiUrl: string;
  private readonly clientId: string;
  private readonly apiKey: string;
  private readonly checksumKey: string;
  private readonly urlReturn: string;

  constructor(
    private configService: ConfigService,
    private readonly balanceRepositories: BalanceRepositories,
    private readonly paymentInfoRepositories: PaymentInfoRepositories,
    private readonly appRepositories: AppRepositories,
  ) {
    this.apiUrl = this.configService.get('PAYOS_BASE_URL');
    this.clientId = this.configService.get('PAYOS_CLIENT_ID');
    this.apiKey = this.configService.get('PAYOS_API_KEY');
    this.checksumKey = this.configService.get('PAYOS_CHECK_SUM_KEY');
    this.urlReturn = this.configService.get('URL_RETURN');
  }

  private calculateSignature(data: Record<string, any>): string {
    const sortedData = Object.keys(data)
      .sort()
      .map((key) => `${key}=${data[key]}`)
      .join('&');
    return crypto
      .createHmac('sha256', this.checksumKey)
      .update(sortedData)
      .digest('hex');
  }

  private generateUniqueId(length = 6): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    return Array.from(
      { length },
      () => chars[Math.floor(Math.random() * chars.length)],
    ).join('');
  }

  private generateRandomNumber(): number {
    const timestamp = Date.now().toString();
    const randomValue = Math.floor(Math.random() * 10000)
      .toString()
      .padStart(4, '0');
    return parseInt(timestamp.slice(-11) + randomValue);
  }

  async createPaymentLink(
    fullUrl: string,
    idUser: string,
    dto: CreatePaymentDto,
  ) {
    try {
      const paymentData = {
        orderCode: this.generateRandomNumber(),
        amount: dto.amount,
        description: this.generateUniqueId(),
        cancelUrl: `${fullUrl}/api/payment/payment-cancel`,
        returnUrl: `${fullUrl}/api/payment/payment-success`,
      };

      console.log(paymentData);

      paymentData['signature'] = this.calculateSignature(paymentData);
      paymentData['expiredAt'] = Math.floor(Date.now() / 1000) + 3600;

      const response = await axios.post(
        `${this.apiUrl}/v2/payment-requests`,
        paymentData,
        {
          headers: {
            'x-client-id': this.clientId,
            'x-api-key': this.apiKey,
            'Content-Type': 'application/json',
          },
        },
      );

      if (response.data.data) {
        await this.paymentInfoRepositories.createPaymentInfo({
          userId: idUser,
          orderId: paymentData.orderCode,
          description: paymentData.description,
          paymentUrl: response.data.data.checkoutUrl,
          amount: dto.amount,
        });
      }

      return response.data;
    } catch (error) {
      throw new Error(
        `Error creating payment link: ${error.response?.data || error.message}`,
      );
    }
  }

  async handlePaymentSuccess(query: any, res: any) {
    const { code, cancel, status, orderCode } = query;
    if (code === '00' && status === 'PAID' && cancel === 'false') {
      await this.paymentInfoRepositories.PaymentSuccess(
        parseInt(orderCode, 10),
      );
    }
    return res.redirect(this.urlReturn);
  }

  async createApp(data: App) {
    return await this.appRepositories.createApp(data);
  }
  async changeStatusApp(data: { status: boolean; appId: string }) {
    return await this.appRepositories.changeStatusApp(data);
  }
}
