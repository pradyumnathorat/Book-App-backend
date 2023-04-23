const express = require('express');

const bookModel = require('../models/book');


const router = express.Router();
router.use(express.json());

router.post('/upload', async (req, res) => {
  try {
    const { title , ISBN , author, description, date , publisher } = req.body;
    console.log(req.body);
    const book = await bookModel.create({
      title: title,
      ISBN : ISBN,
      author: author,
      description: description,
      date: date,
      publisher : publisher,
      user: req.user.data
    })
    return res.send({ message: 'File uploaded successfully.' });
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
});

router.get('/upload', async (req, res) => {
  try {
    const books = await bookModel.find({ user: req.user.data });
    res.status(200).json({
      data: books
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

module.exports = router;