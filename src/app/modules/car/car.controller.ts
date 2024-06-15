import { RequestHandler } from 'express'
import { ApiResponse } from '../../../shared/apiResponse'
import { TryCatchHandler } from '../../../shared/tryCatchHandler'
import { ICar } from './car.interface'
import { carService } from './car.service'

// controller for save new car
const createNewCar: RequestHandler = TryCatchHandler(async (req, res) => {
  const data = req.body
  const result = await carService.saveCar(data)
  ApiResponse<ICar>(res, {
    statusCode: 201,
    success: true,
    message: 'Car created successfully',
    data: result,
  })
})

// controller for get all cars
const getAllCars: RequestHandler = TryCatchHandler(async (req, res) => {
  const result = await carService.getAllCars()
  ApiResponse<ICar[]>(res, {
    statusCode: result.length === 0 ? 404 : 200,
    success: result.length === 0 ? false : true,
    message:
      result.length === 0 ? 'No Data Found' : 'Cars retrieved successfully',
    data: result,
  })
})

// controller for get single car
const getSingleCar: RequestHandler = TryCatchHandler(async (req, res) => {
  const id = req.params.id
  const result = await carService.getSingleCar(id)
  ApiResponse<ICar>(res, {
    statusCode: 200,
    success: true,
    message: 'Car retrieved Successfully',
    data: result,
  })
})

// controller for update car
const updateCar: RequestHandler = TryCatchHandler(async (req, res) => {
  const id = req.params.id
  const data = req.body
  const result = await carService.updateCar(id, data)
  ApiResponse<ICar>(res, {
    statusCode: 200,
    success: true,
    message: 'Car Updated Successfully',
    data: result,
  })
})

// controller for delete car
const deleteCar: RequestHandler = TryCatchHandler(async (req, res) => {
  const id = req.params.id
  const result = await carService.deleteCar(id)
  ApiResponse<ICar>(res, {
    statusCode: 200,
    success: true,
    message: 'Car Deleted Successfully',
    data: result,
  })
})

export const carController = {
  createNewCar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar,
}
