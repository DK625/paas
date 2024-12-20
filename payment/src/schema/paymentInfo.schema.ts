import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PaymentInfoDocument = PaymentInfo & Document;

@Schema({ timestamps: true })
export class PaymentInfo {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  orderId: number;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  paymentUrl: string;

  @Prop({ required: true, default: 'pending' })
  status: string;

  @Prop({ required: true, default: new Date(Date.now() + 3600000) })
  exceptedAt: Date;

  @Prop({ required: true })
  amount: number;
}

export const PaymentInfoSchema = SchemaFactory.createForClass(PaymentInfo);
