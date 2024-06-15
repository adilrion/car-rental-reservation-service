/* eslint-disable @typescript-eslint/ban-ts-comment */
import mongoose, { Schema } from 'mongoose';
import { IBooking } from './booking.interface';



const bookingSchema = new Schema<IBooking>({
  date: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  car: {
    type: Schema.Types.ObjectId,
    ref: 'car',
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    default: null,
  },
  totalCost: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
})


// bookingSchema.pre<IBooking>('updateOne', function(next) {
//   const startHour = parseInt(this.startTime.split(':')[0]);
//   const startMinute = parseInt(this.startTime.split(':')[1]);
//   const endHour = parseInt(this.endTime.split(':')[0]);
//   const endMinute = parseInt(this.endTime.split(':')[1]);

//   const startTotalMinutes = startHour * 60 + startMinute;
//   const endTotalMinutes = endHour * 60 + endMinute;

//   const durationHours = (endTotalMinutes - startTotalMinutes) / 60;

//   // Assuming car document is populated with pricePerHour

//   // @ts-ignore
//   if (this.car && this.car?.pricePerHour) {
//     // @ts-ignore
//     this.totalCost = durationHours * this.car?.pricePerHour;
//   }

//   next();
// });


export const BookingModel = mongoose.model<IBooking>('Booking', bookingSchema)