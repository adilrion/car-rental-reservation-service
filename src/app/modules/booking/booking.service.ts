/* eslint-disable @typescript-eslint/ban-ts-comment */
import httpStatus from 'http-status'
import ApiError from '../../../Errors/apiError'
import { IBooking } from './booking.interface'
import { BookingModel } from './booking.model'
import { calculateTotalCost } from './booking.util'

// service for booking a car
const bookCar = async (booking: IBooking): Promise<IBooking | null> => {
  const result = await await BookingModel.create(booking)
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to create booking!')
  }

  const newBooking = await BookingModel.findById(result._id)
    .populate({
      path: 'car',
      select: '-__v -id',
    })
    .populate({
      path: 'user',
      select: '-__v -createdAt -updatedAt -id',
    })
  return newBooking
}

// service for get all bookings
const getAllBookings = async (params: {
  carId?: string
  date?: string
}): Promise<IBooking[]> => {
  const { carId, date } = params
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query: any = {}

  if (carId) {
    query.car = carId
  }

  if (date) {
    query.date = date
  }

  const bookings = await BookingModel.find(query)
    .populate({
      path: 'car',
      select: '-__v',
    })
    .populate({
      path: 'user',
      select: '-__v -createdAt -updatedAt',
    })

  if (!bookings) throw new ApiError(httpStatus.NOT_FOUND, 'bookings not found')
  return bookings
}

// get booking by user id
const getBookingByUserId = async (userId: string): Promise<IBooking[]> => {
  const bookings = await BookingModel.find({ user: userId })
    .populate({
      path: 'car',
      select: '-__v -id',
    })
    .populate({
      path: 'user',
      select: '-__v -createdAt -updatedAt -id',
    })
  return bookings
}

// service for get single booking
const getSingleBooking = async (id: string): Promise<IBooking | null> => {
  const booking = await BookingModel.findById(id)
  if (!booking) throw new ApiError(httpStatus.NOT_FOUND, 'booking not found')
  return booking
}

// service for update booking
const calculateBookingFee = async (data: {
  bookingId: string
  endTime: string
}): Promise<IBooking | null> => {
  const isDataExist = await BookingModel.findById(data.bookingId)
    .populate({
      path: 'car',
      select: 'pricePerHour',
    })
    .exec()
  if (!isDataExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found')
  }

  const { startTime, car } = isDataExist

  const totalCost: number = calculateTotalCost(
    startTime,
    data.endTime,
    //@ts-ignore
    car.pricePerHour,
  )

  const response = await BookingModel.findByIdAndUpdate(
    { _id: data.bookingId },
    { endTime: data.endTime, totalCost: Number(totalCost) },
    { new: true },
  )
    .populate({
      path: 'car',
      select: '-__v -id',
    })
    .populate({
      path: 'user',
      select: '-__v -createdAt -updatedAt -id',
    })

  return response
}

// service for delete booking
const deleteBooking = async (id: string): Promise<IBooking | null> => {
  const isDataExist = await BookingModel.findById(id)
  if (!isDataExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Booking not found')
  }
  const response = await BookingModel.findByIdAndDelete(id)
  return response
}

// export booking service
export const bookingService = {
  bookCar,
  getAllBookings,
  getSingleBooking,
  calculateBookingFee,
  deleteBooking,
  getBookingByUserId,
}
