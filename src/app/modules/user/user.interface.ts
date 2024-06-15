/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/consistent-type-definitions */
import { Model } from 'mongoose';





// Define the user schema
export interface IUser {
  name: string;
  email: string;
  role: 'user' | 'admin'; 
  password: string;
  phone: string;
  address: string;
}

// Define the response when a new user is created
export interface INewUserResponse {
  refreshToken?: string
  user: IUser
}

// Define the method response for user operations
export interface IUserMethodResponse {
  name: string
  email: string
  password: string
  profile_img?: string
  _id: string
}

// Define methods for user operations
export interface IUserMethod extends Model<IUser> {
  isUserExist(email: string): Promise<Partial<IUserMethodResponse> | null>
  isPasswordMatch(
    givenPassword: string,
    savedPassword: string,
  ): Promise<boolean>
}


