const express = require('express')
const router = express.Router()

const Tasks = require('../models/Tasks')
const Task = require('../models/Task')

// @desc   Get all tasks
// @route  GET api/tasks/all/:id
router.get('/all/:id', async(req, res) => {
  try {
    let tasks = await Tasks.findOne({ _id: req.params.id })
    res.status(200).json(tasks) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Get single task
// @route  GET api/tasks/:id
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
// @route  POST api/tasks
router.post('/', async(req, res) => {
  try {
    let tasks = await Tasks.create(req.body)
    res.status(201).json(tasks) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Update user task
// @route  PUT api/tasks/:id
router.put('/:id', async(req, res) => {
  try {
    const tasks = await User.findOne({ _id: req.params.id })
    console.log(tasks)
    const { user, name, color, type, status } = req.body

    const newTask = await Task.create({
      user,
      parentId: req.params.id,
      name,
      color,
      type,
      status
    })
    
    tasks.value.push(newTask)
    await tasks.save()
    
    res.status(200).json(tasks)
  } catch (err) {
    console.log(err)
  }
})

// @desc   Delete user task
// @route  DELETE api/tasks/:id
router.delete('/:id', async(req, res) => {
  try {
    const tasks = await Tasks.findOne({ _id: req.params.id })
    if(!tasks) {
      res.status(404).json({ message: 'Not found'}) // TODO SSR
    }

    const index = tasks.value.find(i => i._id === req.body.id)

    const deleted = tasks.value.splice(index, 1)

    await tasks.save()

    res.status(200).json(deleted) // ask about undo action
  } catch (err) {
    console.log(err)
  }
})

module.exports = router