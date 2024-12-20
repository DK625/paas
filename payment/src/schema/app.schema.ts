import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type AppDocument = App & Document;

@Schema({ timestamps: true })
export class App {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  appId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: true })
  isRunning: boolean;

  @Prop({ required: true })
  priceInHouse: number;
}

export const AppSchema = SchemaFactory.createForClass(App);
