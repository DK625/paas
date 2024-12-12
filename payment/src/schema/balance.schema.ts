import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BalanceDocument = Balance & Document;

@Schema({ timestamps: true })
export class Balance {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true, default: 0 })
  balance: number;

  @Prop({ required: true, default: 0 })
  costUsed: number;

  @Prop({ required: true, default: 0 })
  estimatedCost: number;

  @Prop({ required: true, default: new Date() })
  estimatedTime: Date;

  @Prop({ required: true, default: new Date() })
  updatedAt: Date;
}

export const BalanceSchema = SchemaFactory.createForClass(Balance);
