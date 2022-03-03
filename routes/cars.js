const router = require('express').Router()
const { Car } = require('../models/Car')
const verifyToken = require('../verifyToken')
const paginatedResults = require('../PaginetedResults')

//Get Paginated Movies
router.get('/allmovies', paginatedResults(Car), (req, res) => {
  res.json(res.paginatedResults)
})

module.exports = router

//Create
router.post('/', verifyToken, async (req, res) => {
  const newCar = new Car(req.body)
  try {
    const savedCar = await newCar.save()
    res.status(200).json(savedCar)
  } catch (err) {
    res.status(500).json(err)
  }
})
//Edit
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const updatedCar = await Car.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    )
    res.status(200).json(updatedCar)
  } catch (err) {
    res.status(500).json(err)
  }
})
//DElete
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    await Car.findByIdAndDelete(req.params.id)
    res.status(200).json('Deleted')
  } catch (err) {
    res.status(500).json(res)
  }
})

//Get My cars
router.get('/all', async (req, res) => {
  try {
    const cars = await Car.find()
    res.status(200).json(cars)
  } catch (err) {
    res.status(500).json(err)
  }
})
