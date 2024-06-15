import { Schema } from "mongoose";
import { ICar } from "./car.interface";
import mongoose from "mongoose";

const carSchema = new Schema<ICar>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  isElectric: {
    type: Boolean,
    required: true,
  },
  features: {
    type: [String],
    required: true,
  },
  pricePerHour: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['available', 'booked', 'unavailable'],
    default: 'available',
  },
  isDeleted: {
    type: Boolean,
    default: false,
  }
}, {
  timestamps: true,
})



export const CarModel = mongoose.model<ICar>('Car', carSchema)