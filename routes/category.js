const express = require('express')
const router = express.Router()

const Category = require('../models/Category')

// @desc   Get all categories
// @route  GET api/category
router.get('/', async (req, res) => {
  try {
    const categories = await Category.find()
    res.json(categories)
  } catch (err) {
    console.log(err)
  }
})

// @desc   Create category
// @route  POST api/category
router.post('/', async (req, res) => {
  try {
    const category = await Category.create(req.body)
    res.json(category)
  } catch (err) {
    console.log(err)
  }
})

// @desc   Delete category
// @route  DELETE api/category
router.delete('/:id', async (req, res) => {
  try {
    await Category.findByIdAndRemove(req.params.id)
    res.json({ message: "This category completely deleted"})
  } catch (err) {
    console.log(err)
  }
})

module.exports = router;