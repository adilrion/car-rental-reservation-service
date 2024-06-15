import bcrypt from 'bcrypt'
import mongoose, { Schema } from 'mongoose'
import config from '../../../config'
import { IUser, IUserMethod, IUserMethodResponse } from './user.interface'


// Create the user schema
const userSchema = new Schema<IUser, IUserMethod>(
  {
    name: {
      type: String,
      required: true,
      minlength: [1, 'full Name must be 1 letters long'],
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
      excludeIndexes: true,
    },
    phone: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    }
    
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        // Exclude the 'password' field from the response
        delete ret.password
        return ret
      },
    },
  },
)


userSchema.pre("findOne", async function (next) { 
  this.select("-password")
  next()
})



// Static methods
userSchema.statics.isUserExist = async function (
  email: string,
): Promise<Partial<IUserMethodResponse> | null> {
  return await UserModel.findOne(
    { email: email },
    { email: 1, name: 1, _id: 1, role: 1 },
  )
}

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword)
}

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcryptSaltRound),
  )

  next()
})






export const UserModel = mongoose.model<IUser, IUserMethod>('user', userSchema)
