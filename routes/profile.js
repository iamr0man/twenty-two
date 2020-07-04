const express = require('express')
const router = express.Router()

const Profile = require('../models/Profile')
const checkTaskStatus = require('../helpers/checkTaskType')

// @desc   Create profile for test
// @route  POST api/profile
router.post('/', async(req, res) => {
  try {
    const profile = await Profile.create({
      user: req.body.user
    })
    res.status(201).json(profile)
  } catch (err) {
    console.log(err)
  }
})

// @desc   Get all passion notes
// @route  GET api/note/profile/all/
router.get('/note/all/:id', async(req, res) => {
  try {
    let profile = await Profile.findById(req.params.id)
    res.status(200).json(profile.passion) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Create user passion notes
// @route  POST api/profile/note
router.post('/note', async(req, res) => {
  try {

    const newNote = {
      image: req.body.image,
      description: req.body.description
    }

    let profile = await Profile.findOne({ _id: req.body.id })
    profile.passion.unshift(newNote)

    await profile.save()

    res.json(profile) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Update user passion note
// @route  PUT api/profile/note/:id
router.put('/note/:id', async(req, res) => {
  try {
    const notes = await Profile.findById(req.params.id)

    const note = notes.passion.filter(i => `${i._id}` === req.body.value)[0]

    if(req.body.image) { note.image = req.body.image}
    if(req.body.description) { note.description = req.body.description}
    
    await notes.save()
    
    res.status(200).json(notes.passion)
  } catch (err) {
    console.log(err)
  }
})

// @desc   Delete user passion note
// @route  DELETE api/profile/note/:id
router.delete('/note/:id', async(req, res) => {
  try {
    const notes = await Profile.findById(req.params.id)

    const removeIndex = notes.passion.map(i => i._id).indexOf(req.body.value)
    notes.passion.splice(removeIndex, 1)
    
    await notes.save()
    
    res.status(200).json(notes.passion) // ask about undo action
  } catch (err) {
    console.log(err)
  }
})

// -------------------------------------------------------------------

// @desc   Get all language notes
// @route  GET api/profile/language/all/
router.get('/language/all/:id', async(req, res) => {
  try {
    let profile = await Profile.findById(req.params.id)
    res.status(200).json(profile.language) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Create user language notes
// @route  POST api/profile/language
router.post('/language', async(req, res) => {
  try {

    const newNote = {
      videoLink: req.body.videoLink,
      articleLink: req.body.articleLink,
      words: req.body.words.split(', ')
    }

    let profile = await Profile.findById(req.body.id)
    profile.language.unshift(newNote)

    await profile.save()

    res.json(profile) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Update user language note
// @route  PUT api/profile/language/:id
router.put('/language/:id', async(req, res) => {
  try {
    const notes = await Profile.findById(req.params.id)

    const note = notes.language.filter(i => `${i._id}` === req.body.value)[0]

    if(req.body.videoLink) { note.videoLink = req.body.videoLink}
    if(req.body.articleLink) { note.articleLink = req.body.articleLink}
    if(req.body.words) { note.words = req.body.words.split(', ')}
    
    await notes.save()
    
    res.status(200).json(notes.language)
  } catch (err) {
    console.log(err)
  }
})

// @desc   Delete user language note
// @route  DELETE api/profile/language/:id
router.delete('/language/:id', async(req, res) => {
  try {
    const notes = await Profile.findById(req.params.id)

    const removeIndex = notes.language.map(i => i._id).indexOf(req.body.value)
    notes.language.splice(removeIndex, 1)
    
    await notes.save()
    
    res.status(200).json(notes.language) // ask about undo action
  } catch (err) {
    console.log(err)
  }
})

// -----------------------------------------------------------------------------

// @desc   Get last board
// @route  GET api/profile/task/:id
router.get('/task/:id', async(req, res) => {
  try {
    let profile = await Profile.findById(req.params.id)
    const lastTasks = profile.tasks.length - 1
    res.status(200).json(profile.tasks[lastTasks])
  } catch (err) {
    console.log(err)
  }
})

// @desc   Get all boards
// @route  GET api/profile/task/all/:id
router.get('/task/all/:id', async(req, res) => {
  try {
    let profile = await Profile.findOne({ _id: req.params.id })
    res.status(200).json(profile.tasks) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Create single board
// @route  POST api/profile/task/
router.post('/task', async(req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.body.id })

    const lastTasks = profile.tasks.length - 1
    if(profile.tasks[lastTasks].createdAt.getDate() !== new Date().getDate()) {
      profile.tasks.push({})
      profile.rating.push({})
    }

    await profile.save()
    res.json(profile.tasks)

  } catch (err) {
    console.log(err)
  }
})
// @desc   Create single task
// @route  PUT api/profile/task/single/:tasksIdProfile
router.post('/task/single/:id', async(req, res) => {
  try {

    const newTask = {
      name: req.body.name,
      color: req.body.color,
      relationships: req.body.relationships,
      type: req.body.type
    }

    let profile = await Profile.findOne({ _id: req.params.id })

    const index = profile.tasks.map(v => v._id).indexOf(req.body.tasksId)

    profile.tasks[index].task.push(newTask)

    await profile.save()

    res.json(profile.tasks) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Update user task
// @route  PUT api/profile/task/single/:profileId
router.put('/task/single/:id', async(req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)

    const boardIndex = profile.tasks.map(v => v._id).indexOf(req.body.tasksId)

    const task = profile.tasks[boardIndex].task.filter(v => `${v._id}` === req.body.taskId)[0]
    
    // check changes with type and status
    const lastElem = profile.rating.length - 1
    profile.rating[lastElem || 0].amount += checkTaskStatus(task.type, task.status, req.body.type, req.body.status)
    
    if(req.body.name) { task.name = req.body.name}
    if(req.body.color) { task.color = req.body.color}
    if(req.body.relationships) { task.relationships = req.body.relationships}
    if(req.body.type) { task.type = req.body.type }
    if(req.body.status) { task.status = req.body.status }

    await profile.save()
    
    res.status(200).json(profile)
  } catch (err) {
    console.log(err)
  }
})

// @desc   Delete user passion note
// @route  DELETE api/profile/task/:id
router.delete('/task/single/:id', async(req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)

    const boardIndex = profile.tasks.map(v => v._id).indexOf(req.body.tasksId)
    
    const taskIndex = profile.tasks[boardIndex].task.map(v => v._id).indexOf(req.body.taskId)

    profile.tasks[boardIndex].task.splice(taskIndex, 1)
    
    await profile.save()
    
    res.status(200).json(profile.tasks[boardIndex])
  } catch (err) {
    console.log(err)
  }
})

// ----------------------------------------------------------------------------------------------

// @desc   Get all language notes
// @route  GET api/profile/language/all/
router.get('/language/all/:id', async(req, res) => {
  try {
    let profile = await Profile.findById(req.params.id)
    res.status(200).json(profile.language) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Create user language notes
// @route  POST api/profile/language
router.post('/language', async(req, res) => {
  try {

    const newNote = {
      videoLink: req.body.videoLink,
      articleLink: req.body.articleLink,
      words: req.body.words.split(', ')
    }

    let profile = await Profile.findById(req.body.id)
    profile.language.unshift(newNote)

    await profile.save()

    res.json(profile) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Update user language note
// @route  PUT api/profile/language/:id
router.put('/language/:id', async(req, res) => {
  try {
    const notes = await Profile.findById(req.params.id)

    const note = notes.language.filter(i => `${i._id}` === req.body.value)[0]

    if(req.body.videoLink) { note.videoLink = req.body.videoLink}
    if(req.body.articleLink) { note.articleLink = req.body.articleLink}
    if(req.body.words) { note.words = req.body.words.split(', ')}
    
    await notes.save()
    
    res.status(200).json(notes.language)
  } catch (err) {
    console.log(err)
  }
})

// @desc   Delete user language note
// @route  DELETE api/profile/language/:id
router.delete('/language/:id', async(req, res) => {
  try {
    const notes = await Profile.findById(req.params.id)

    const removeIndex = notes.language.map(i => i._id).indexOf(req.body.value)
    notes.language.splice(removeIndex, 1)
    
    await notes.save()
    
    res.status(200).json(notes.language) // ask about undo action
  } catch (err) {
    console.log(err)
  }
})

// -----------------------------------------------------------------------------

// @desc   Get last board
// @route  GET api/profile/task/:id
// router.get('/task/:id', async(req, res) => {
//   try {
//     let profile = await Profile.findById(req.params.id)
//     const lastTasks = profile.tasks.length - 1
//     res.status(200).json(profile.tasks[lastTasks])
//   } catch (err) {
//     console.log(err)
//   }
// })

// @desc   Get all boards
// @route  GET api/profile/budget/all/:id
router.get('/budget/all/:id', async(req, res) => {
  try {
    let profile = await Profile.findOne({ _id: req.params.id })
    res.status(200).json(profile.budget) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Create single task
// @route  POST api/profile/budget/:id
router.post('/budget/:id', async(req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id })

    const { category, money, note, createdAt } = req.body

    profile.budget.push({
      category,
      money,
      note,
      createdAt
    })
    
    await profile.save()
    res.json(profile.budget)

  } catch (err) {
    console.log(err)
  }
})

// @desc   Update user taks
// @route  PUT api/profile/budget/:id
router.put('/budget/:id', async(req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)

    const transaction = profile.budget.filter(i => `${i._id}` === req.body.transactionId)[0]
 
    if(req.body.category) { transaction.category = req.body.category}
    if(req.body.money) { transaction.money = req.body.money}
    if(req.body.note) { transaction.note = req.body.note}
    if(req.body.createdAt) { transaction.createdAt = req.body.createdAt}

    await profile.save()
    
    res.status(200).json(profile.budget)
  } catch (err) {
    console.log(err)
  }
})

// @desc   Delete user passion note
// @route  DELETE api/profile/task/:id
router.delete('/task/single/:id', async(req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)

    const boardIndex = profile.tasks.map(v => v._id).indexOf(req.body.tasksId)
    
    const taskIndex = profile.tasks[boardIndex].task.map(v => v._id).indexOf(req.body.taskId)

    profile.tasks[boardIndex].task.splice(taskIndex, 1)
    
    await profile.save()
    
    res.status(200).json(profile.tasks[boardIndex])
  } catch (err) {
    console.log(err)
  }
})




module.exports = router
