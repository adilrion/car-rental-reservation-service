import { RequestHandler } from "express"
import { TryCatchHandler } from "../../../shared/tryCatchHandler"
import { bookingService } from "./booking.service"
import { ApiResponse } from "../../../shared/apiResponse"
import { IBooking } from "./booking.interface"


// controller for create new booking
const createNewBooking: RequestHandler = TryCatchHandler(async (req, res) => {
  const user = req.user
  const result = await bookingService.bookCar({
    car: req.body.carId,
    date: req.body.date,
    startTime: req.body.startTime,
    user: user._id,
  })
  ApiResponse<IBooking>(res, {
    statusCode: 200,
    success: true,
    message: 'Car booked successfully',
    data: result,
  })
})


// controller for get all bookings
const getAllBookings: RequestHandler = TryCatchHandler(async (req, res) => {
 
  const result = await bookingService.getAllBookings(req.query)
  ApiResponse<IBooking[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Bookings retrieved Successfully',
    data: result,
  })
})


// controller for get single booking
const getSingleBooking: RequestHandler = TryCatchHandler(async (req, res) => {
  const id = req.params.id
  const result = await bookingService.getSingleBooking(id)
  ApiResponse<IBooking>(res, {
    statusCode: 200,
    success: true,
    message: 'Booking retrieved Successfully',
    data: result,
  })
})


// controller for get booking by user id 
const getBookingByUserId: RequestHandler = TryCatchHandler(async (req, res) => {
  const userId = req.user._id
  const result = await bookingService.getBookingByUserId(userId)
  ApiResponse<IBooking[]>(res, {
    statusCode: 200,
    success: true,
    message: 'Bookings retrieved Successfully',
    data: result,
  })
})


// controller for update booking
const updateBooking: RequestHandler = TryCatchHandler(async (req, res) => {
  const id = req.params.id
  const data = req.body
  const result = await bookingService.updateBooking(id, data)
  ApiResponse<IBooking>(res, {
    statusCode: 200,
    success: true,
    message: 'Booking Updated Successfully',
    data: result,
  })
})


// controller for delete booking
const deleteBooking: RequestHandler = TryCatchHandler(async (req, res) => {
  const id = req.params.id
  const result = await bookingService.deleteBooking(id)
  ApiResponse<IBooking>(res, {
    statusCode: 200,
    success: true,
    message: 'Booking Deleted Successfully',
    data: result,
  })
})


// export booking controller
export const bookingController = {
  createNewBooking,
  getAllBookings,
  getSingleBooking,
  updateBooking,
  deleteBooking,
  getBookingByUserId
}