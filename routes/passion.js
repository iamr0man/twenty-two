const express = require('express')
const router = express.Router()

const Passion = require('../models/Passion')

// @desc   Get all passion notes
// @route  GET api/passion/all/:id
router.get('/all/:id', async(req, res) => {
  try {
    let notes = await Passion.findOne({ _id: req.params.id })
    res.status(200).json(notes) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Get single task
// @route  GET api/passion/:id
router.get('/single/:id', async(req, res) => {
  try {
    let notes = await Passion.findOne({ _id: req.params.id })

    const note = notes.value.find(i => i._id === req.body.value)

    res.status(200).json(note) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Create user notes
// @route  POST api/passion
router.post('/', async(req, res) => {
  try {
    let notes = await Passion.create(req.body)
    res.status(201).json(notes) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Update user task
// @route  PUT api/notes/:id
router.put('/:id', async(req, res) => {
  try {
    const notes = await Passion.findOneAndUpdate({ _id: req.params.id }, { value: req.body.value }, {
      new: true
    })
    res.status(200).json(notes)
  } catch (err) {
    console.log(err)
  }
})

// @desc   Delete user task
// @route  DELETE api/notes/:id
router.delete('/:id', async(req, res) => {
  try {
    const notes = await Passion.findOne({ _id: req.params.id })
    if(!notes) {
      res.status(404).json({ message: 'Not found'}) // TODO SSR
    }

    const index = notes.value.find(i => i._id === req.body.id)

    const deleted = notes.value.splice(index, 1)

    await notes.save()

    res.status(200).json(deleted) // ask about undo action
  } catch (err) {
    console.log(err)
  }
})

module.exports = router
