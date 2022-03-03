const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userCarsSchema = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String, required: true, },
    password: { type: String, required: true },
    profilePic: { type: String, default: '' },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const userCarsSchemaNoPassword = new Schema(
  {
    firstname: { type: String },
    lastname: { type: String },
    username: { type: String, required: true },
    profilePic: { type: String, default: '' },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true },
)

const carSchema = Schema(
  {
    make: { type: String, required: true },
    model: { type: String },
    year: { type: Number },
    engineType: { type: String },
    gearBox: { type: String },
    condition: { type: String },
    horsePower: { type: String },
    color: { type: String },
    price: { type: String },
    city: { type: String },
    mileage: { type: String },
    extras: { type: String },
    user: userCarsSchemaNoPassword,
  },
  { timestamps: true },
)
const CarUser = mongoose.model('CarUser', userCarsSchema)
const Car = mongoose.model('Car', carSchema)
module.exports = { CarUser, Car }
