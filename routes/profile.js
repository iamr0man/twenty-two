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

    const newTask = {
      name: 'Download this app',
      color: 'violet',
      type: 'secondary'
    }

    profile.manager.push({})
    profile.manager[0].tasks.push(newTask)

    profile.rating.push({})

    profile.save()
    
    res.status(201).json(profile)
  } catch (err) {
    console.log(err)
  }
})

// @desc  Get profile
// @route GET api/profile/
router.get('/', async(req, res) => {
  try {
    let profile = await Profile.findById(req.body.id)
    res.status(200).json(profile) 
  } catch (err) {
    console.log(err)
  }
})


// @desc   Get all passion notes
// @route  GET api/profile/note/all/
router.get('/:profileId/note/all', async(req, res) => {
  try {
    let profile = await Profile.findById(req.params.profileId)
    res.status(200).json(profile.passion) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Get current passion note
// @route  GET api/profile/note/:noteId/
router.get('/:profileId/note/:noteId', async(req, res) => {
  try {
    let profile = await Profile.findById(req.params.profileId)
    let note = profile.passion.filter(v => `${v._id}` === req.params.noteId)[0]
    res.status(200).json(note) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Create user passion notes
// @route  POST api/profile/note
router.post('/:profileId/note/', async(req, res) => {
  try {
    const newNote = {
      image: req.body.image,
      name: req.body.name,
      level: req.body.level,
      resource: req.body.resource,
      description: req.body.description
    }

    let profile = await Profile.findOne({ _id: req.params.profileId })
    profile.passion.unshift(newNote)

    await profile.save()

    res.json(profile) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Update user passion note
// @route  PUT api/profile/note/:id
router.put('/:profileId/note/:noteId', async(req, res) => {
  try {
    const notes = await Profile.findById(req.params.profileId)

    const note = notes.passion.filter(i => `${i._id}` === req.params.noteId)[0]

    if(req.body.image) { note.image = req.body.image}
    if(req.body.name) { note.name = req.body.name}
    if(req.body.level) { note.level = req.body.level}
    if(req.body.resource) { note.resource = req.body.resource}
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

// -----------------------------------------------------------------------------

// @desc   Get last board
// @route  GET api/profile/:profileId/lastboard
router.get('/:id/lastboard', async(req, res) => {
  try {
    let profile = await Profile.findById(req.params.id)
    const lastTasks = profile.manager.length - 1
    res.status(200).json(profile.manager[lastTasks])
  } catch (err) {
    console.log(err)
  }
})

// @desc   Get last board
// @route  GET api/profile/:profileId/task/:taskId
router.get('/:id/task/:taskId', async(req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)
    const lastBoard = profile.manager.length - 1
    const elem = profile.manager[lastBoard].tasks.filter(v => `${v._id}` === req.params.taskId)[0]
    res.status(200).json(elem)
  } catch (err) {
    console.log(err);
  }
})

// @desc   Get all boards
// @route  GET api/profile/task/all/:id
router.get('/task/all/:id', async(req, res) => {
  try {
    let profile = await Profile.findOne({ _id: req.params.id })
    res.status(200).json(profile.manager) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Get all relationships
// @route  GET api/profile/:id/relationships/all/
router.get('/:id/relationships/all/', async(req, res) => {
  try {
    let profile = await Profile.findOne({ _id: req.params.id })
    const relationships = profile.manager.flatMap(v => v.tasks.flatMap(v => v.relationships))
    res.status(200).json(relationships) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Get all rating
// @route  GET api/profile/:id/rating/all/
router.get('/:id/rating/all/', async(req, res) => {
  try {
    let profile = await Profile.findOne({ _id: req.params.id })
    res.status(200).json(profile.rating) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Get week rating
// @route  GET api/profile/:id/rating/all/
router.get('/:id/rating/week/', async(req, res) => {
  try {
    let profile = await Profile.findOne({ _id: req.params.id })
    const rating = profile.rating.reverse().slice(0,7)
    res.status(200).json(rating) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Create single board
// @route  POST api/profile/task/
router.post('/task', async(req, res) => {
  try {
    console.log(req.body.profileId);
    const profile = await Profile.findOne({ _id: req.body.profileId })

    const lastTasks = profile.manager.length - 1
    if(profile.manager[lastTasks].createdAt.getDate() !== new Date().getDate()) {
      profile.manager.push({})
      profile.rating.push({})
    }

    await profile.save()
    res.json(profile.manager[lastTasks])

  } catch (err) {
    console.log(err)
  }
})
// @desc   Create single task
// @route  PUT api/profile/:id/task
router.post('/:id/task', async(req, res) => {
  try {

    const newTask = {
      name: req.body.name,
      color: req.body.color,
      labels: req.body.labels,
      relationships: req.body.relationships,
      subtasks: req.body.subtasks,
      type: req.body.type
    }

    let profile = await Profile.findOne({ _id: req.params.id })

    const lastIndex = profile.manager.length - 1
    console.log(profile.manager[lastIndex].tasks);
    profile.manager[lastIndex].tasks.push(newTask)

    await profile.save()

    res.json(profile.manager[lastIndex]) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Update user task
// @route  PUT api/profile/:profileId/task/:taskId
router.put('/:id/task/:taskId', async(req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)

    // const boardIndex = profile.manager.map(v => v._id).indexOf(req.param.managerId)
    const lastBoard = profile.manager.length - 1
    const task = profile.manager[lastBoard].tasks.filter(v => `${v._id}` === req.params.taskId)[0]
    
    // check changes with type and status
    console.log(req.body);
    if(!req.body.isSubtasks) {
      const lastRating = profile.rating.length - 1
      profile.rating[lastRating || 0].amount += checkTaskStatus(task.type, task.status, req.body.type, req.body.status)
    }
    if(req.body.name) { task.name = req.body.name}
    if(req.body.labels) { task.labels = req.body.labels}
    if(req.body.relationships) { task.relationships = req.body.relationships}
    if(req.body.subtasks) { task.subtasks = req.body.subtasks }
    if(req.body.type) { task.type = req.body.type }
    if(req.body.status) { task.status = req.body.status }
    if(req.body.notes) { task.notes = req.body.notes }

    await profile.save()
    
    if(!req.body.isSubtasks) {
      res.status(200).json(profile.manager[lastBoard])
    } else {
      res.status(200).json(task)
    }
  } catch (err) {
    console.log(err)
  }
})

// @desc   Delete user passion note
// @route  DELETE api/profile/:profileId/task/:taskId
router.delete('/:id/task/:taskId', async(req, res) => {
  try {
    const profile = await Profile.findById(req.params.id)

    // const boardIndex = profile.manager.map(v => v._id).indexOf(req.body.managerId)
    
    const lastBoard = profile.manager.length - 1;
    const taskIndex = profile.manager[lastBoard].tasks.map(v => v._id).indexOf(req.body.taskId)

    profile.manager[lastBoard].tasks.splice(taskIndex, 1)
    
    await profile.save()
    
    res.status(200).json(profile.manager[lastBoard])
  } catch (err) {
    console.log(err)
  }
})

// ----------------------------------------------------------------------------------------------

// @desc   Get all language notes
// @route  GET api/profile/:id/language/all/
router.get('/:id/language/all/', async(req, res) => {
  try {
    let profile = await Profile.findById(req.params.id)
    res.status(200).json(profile.language) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Get language note
// @route  GET api/profile/:id/language/:noteId/
router.get('/:id/language/:noteId/', async(req, res) => {
  try {
    let profile = await Profile.findById(req.params.id)
    const current = profile.language.filter(v => `${v._id}` === req.params.noteId)[0]
    res.status(200).json(current) 
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
//     const lastTasks = profile.manager.length - 1
//     res.status(200).json(profile.manager[lastTasks])
//   } catch (err) {
//     console.log(err)
//   }
// })

// @desc   Get all boards
// @route  GET api/profile/:id/budget/all/
router.get('/:id/budget/all/', async(req, res) => {
  try {
    const profile = await Profile.findOne({ _id: req.params.id }).populate('budget.category')
    res.status(200).json(profile.budget) 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Create single task
// @route  POST api/profile/:id/budget/
router.post('/:id/budget/', async(req, res) => {
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

    const boardIndex = profile.manager.map(v => v._id).indexOf(req.body.managerId)
    
    const taskIndex = profile.manager[boardIndex].tasks.map(v => v._id).indexOf(req.body.taskId)

    profile.manager[boardIndex].tasks.splice(taskIndex, 1)
    
    await profile.save()
    
    res.status(200).json(profile.manager[boardIndex])
  } catch (err) {
    console.log(err)
  }
})




module.exports = router
