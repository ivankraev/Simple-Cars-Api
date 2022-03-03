const router = require('express').Router()
const authController = require('./routes/auth')
const carsController = require('./routes/cars')

router.use('/users', authController)
router.use('/cars', carsController)
router.get('*', (req, res) => {
  res.render('404')
})

module.exports = router
