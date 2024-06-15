import { Schema } from "mongoose";

export interface IBooking {
  date: string;
  user: Schema.Types.ObjectId;
  car: Schema.Types.ObjectId;
  startTime: string;
  endTime?: string | null;
  totalCost?: number;
}
