const express = require('express')
const router = express.Router()

const User = require('../models/User')

// @desc   Get user
// @route  GET /
router.get('/', async(req, res) => {
  try {
    const user = await User.findById(req.body.id).populate('tasks')
    res.status(200).json(user)
  } catch (err) {
    console.log(err)
  }
})

// @desc   Create user for test
// @route  POST /
router.post('/', async(req, res) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
