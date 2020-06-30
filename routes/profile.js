const express = require('express')
const router = express.Router()

const Profile = require('../models/Profile')

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

// @desc   Get single note
// @route  GET api/passion/:id
// router.get('/single/:id', async(req, res) => {
  // try {
  //   let notes = await Profile.findOne({ _id: req.params.id })

  //   const note = notes.value.find(i => i._id === req.body.value)

  //   res.status(200).json(note) 
  // } catch (err) {
  //   console.log(err)
  // }
// })

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

// @desc   Get single note
// @route  GET api/passion/:id
// router.get('/single/:id', async(req, res) => {
  // try {
  //   let notes = await Profile.findOne({ _id: req.params.id })

  //   const note = notes.value.find(i => i._id === req.body.value)

  //   res.status(200).json(note) 
  // } catch (err) {
  //   console.log(err)
  // }
// })

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

// @desc   Get all tasks
// @route  GET api/tasks/profile/all/
router.get('/task/all/:id', async(req, res) => {
  try {
    let profile = await Profile.findById(req.params.id)
    res.status(200).json(profile.tasks).populate('task') 
  } catch (err) {
    console.log(err)
  }
})

// @desc   Get single note
// @route  GET api/passion/:id
// router.get('/single/:id', async(req, res) => {
  // try {
  //   let notes = await Profile.findOne({ _id: req.params.id })

  //   const note = notes.value.find(i => i._id === req.body.value)

  //   res.status(200).json(note) 
  // } catch (err) {
  //   console.log(err)
  // }
// })

// @desc   Create task
// @route  POST api/profile/task
router.post('/task', async(req, res) => {
  try {

    const newTask = {
      name: req.body.name,
      color: req.body.color,
      type: req.body.type,
      status: req.body.status
    }

    let profile = await Profile.findOne({ _id: req.body.id })
    console.log(profile)
    profile.tasks[0].task.unshift(newTask)

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


module.exports = router
