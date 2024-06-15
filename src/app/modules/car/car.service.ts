import httpStatus from "http-status"
import ApiError from "../../../Errors/apiError"
import { CarModel } from "./car.model"
import { ICar } from "./car.interface"


// save car service
const saveCar = async (car: ICar): Promise<ICar | null> => {
  const newCar = await CarModel.create(car)
  if (!newCar) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Failed to create car!')
  }
  return newCar
}

// get all car service 
const getAllCars = async (): Promise<ICar[]> => {
  const cars = await CarModel.find()
  if (!cars) throw new ApiError(httpStatus.NOT_FOUND, 'cars not found')
  return cars
}

// get single car service
const getSingleCar = async (id: string): Promise<ICar | null> => {
  const car = await CarModel.findById(id)
  if (!car) throw new ApiError(httpStatus.NOT_FOUND, 'car not found')
  return car
}

// update car service
const updateCar = async (id: string, data: ICar): Promise<ICar | null> => {
  const isDataExist = await CarModel.findById(id)
  if (!isDataExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Car not found')
  }
  const response = await CarModel.findByIdAndUpdate(
    { _id: id },
    { ...data },
    { new: true },
  )
  return response
}

// delete car service
const deleteCar = async (id: string): Promise<ICar | null> => {
  const isDataExist = await CarModel.findById(id)
  if (!isDataExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Car not found')
  }
  const response = await CarModel.findByIdAndUpdate({_id: id}, {isDeleted: true}, {new: true})
  return response
}



// export car service
export const carService = {
  saveCar,
  getAllCars,
  getSingleCar,
  updateCar,
  deleteCar
}