const router = require('express').Router()
const { CarUser } = require('../models/Car')
const CryptoJS = require('crypto-js')
const jwt = require('jsonwebtoken')

/* REGISTER */
router.post('/register', async (req, res) => {
  const userExist = await CarUser.findOne({ username: req.body.username })
  if (userExist) {
    return res.status(500).json('Username is already taken!')
  }

  const newUser = new CarUser({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    username: req.body.username,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.SECRET_KEY,
    ).toString(),
  })

  try {
    const user = await newUser.save()
    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '5d' },
    )
    return res.status(201).json({ ...user._doc, accessToken })
  } catch (err) {
    return res.status(500).json(err)
  }
})

/* LOGIN */
router.post('/login', async (req, res) => {
  try {
    const user = await CarUser.findOne({ username: req.body.username })
    if (!user) {
      return res.status(401).json('Wrong password or username!')
    }

    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY)
    const originalPassword = bytes.toString(CryptoJS.enc.Utf8)

    if (originalPassword !== req.body.password) {
      return res.status(401).json('Wrong password or username!')
    }

    const accessToken = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.SECRET_KEY,
      { expiresIn: '5d' },
    )

    const { password, ...info } = user._doc
    res.status(200).json({ ...info, accessToken })
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router
