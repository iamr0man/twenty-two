const express = require('express')
const router = express.Router()

const Tasks = require('../models/Tasks')

// @desc   Get all tasks
// @route  GET /tasks/:id
router.get('/:id', async(req, res) => {
  try {
    let tasks = await Tasks.findOne({ _id: req.params.id })
    res.status(200).json(tasks) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Get single task
// @route  GET /tasks/single/:id
router.get('/single/:id', async(req, res) => {
  try {
    let tasks = await Tasks.findOne({ _id: req.params.id })
    const task = tasks.value.find(i => i._id === req.body.value)
    res.status(200).json(task) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Create user tasks
// @route  POST /tasks
router.post('/', async(req, res) => {
  try {
    let tasks = await Tasks.create(req.body)
    res.status(201).json(tasks) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Update user task
// @route  PUT /tasks/:id
router.put('/:id', async(req, res) => {
  try {
    const tasks = await Tasks.findOneAndUpdate({ _id: req.params.id }, { value: req.body.value }, {
      new: true
    })
    res.status(200).json(tasks)
  } catch (err) {
    console.log(err)
  }
})

// @desc   Delete user task
// @route  DELETE /tasks/:id
router.put('/:id', async(req, res) => {
  try {
    const tasks = await Tasks.findOne({ _id: req.params.id })
    if(!tasks) {
      res.status(404).json({ message: 'Not found'}) // TODO SSR
    }

    const index = tasks.value.find(i => i._id === req.body.id)
    const deleted = tasks.value.splice(index, 1)

    res.status(200).json(deleted) // ask about undo action
  } catch (err) {
    console.log(err)
  }
})

module.exports = router