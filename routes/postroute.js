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

router.delete("/delete", async (req, res) => {
  try {
    const _id = req.headers["user_id"];
    console.log(_id);
    const data = await bookModel.findByIdAndDelete({ _id: _id })
    return res.status(200).json({
      message: "Task Deleted",
    })
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
})

router.patch("/edit", async (req, res) => {
  try {
    const post = req.body;
    const _id = req.headers["user_id"];
    console.log(_id);
    const data = await bookModel.findByIdAndUpdate({ _id: _id } , post)
    return res.status(200).json({
      message: "Task Updated",
    })
  } catch (err) {
    return res.status(500).json({
      error: err.message
    })
  }
})

router.get('/single', async (req, res) => {
  try {
    const _id = req.headers["user_id"];
    const book = await bookModel.findById({ _id: _id });
    res.status(200).json({
      data: book
    })
  } catch (err) {
    res.status(500).json({
      error: err.message
    })
  }
})

module.exports = router;