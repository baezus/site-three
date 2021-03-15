const { Poem } = require('../models/poem');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');



//MULTER config and storage set up
const multer = require('multer');
let filter = {};
const FILE_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
}
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error('Invalid image type');
    if (isValid) {
      uploadError = null
    }
    cb(uploadError, 'public/uploads');
  },
  filename: function(req, file, cb) {
    const fileName = file.originalname.split(' ').join('-');
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  }
})
const uploadOptions = multer({ storage: storage });

//Actual routes for the poems

// INDEX
router.get('/', async(req, res) => {
  const poemList = await Poem.find();
  if (!poemList) {
    res.status(500).json({ success: false });
  }
  res.send(poemList);
})

// SHOW
router.get('/:id', async (req, res) => {
  const poem = await Poem.findById(req.params.id);
  if (!poem) {
    return res.status(500).send('The poem was not found.');
  }
  return res.status(200).send(poem);
});

// CREATE

router.post('/', uploadOptions.single('image'), async (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send('No image in the request.');

  const fileName = req.file.filename;
  const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;
  const addedPoem = new Poem ({
    title: req.body.title,
    description: req.body.description,
    lines: req.body.lines,
    image: `${basePath}${fileName}`,
    link: req.body.link,
    publisher: req.body.publisher,
    dateWritten: req.body.dateWritten,
  })

  poem = await addedPoem.save();

  if (!poem) {
    return res.status(500).send('The poem was not created.');
  }
  return res.status(200).send(poem);
});

router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send('Invalid poem ID.');
  };

  const poem = await Poem.findByIdAndUpdate(
    req.params.id,
    {    
      title: req.body.title,
      description: req.body.description,
      lines: req.body.lines,
      image: req.body.image,
      link: req.body.link,
      publisher: req.body.publisher,
      dateWritten: req.body.dateWritten,},
      {new:true}
  )

  if (!poem) {
    return res.status(500).send('The poem cannot be updated.')
  }
  res.send(poem);
});

router.delete('/:id', (req, res) => {
  Poem.findByIdAndRemove(req.params.id).then(poem => {
    if (poem) {
      return res.status(200).json({success: true, message: 'The poem is deleted.'});
    } else {
      return res.status(404).json({success: false, message: 'The poem was not found.'});
    }
  }).catch(err => {
    return res.status(400).json({success: false, error: err});
  });
});

module.exports = router;