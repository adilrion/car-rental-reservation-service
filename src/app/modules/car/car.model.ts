import { Query, Schema } from "mongoose";
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



// Add pre middleware to filter out deleted cars using setQuery
carSchema.pre<Query<ICar, Document & ICar>>(/^find/, function(next) {
  this.setQuery({ ...this.getQuery(), isDeleted: false });
  next();
});



export const CarModel = mongoose.model<ICar>('Car', carSchema)