const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

// 取得首頁
router.get('/', (req, res) => {
  Todo.find()
    .lean()
    .sort({ _id: 'asc' })
    .then(todos => { res.render('index', { todos }) })
    .catch(error => console.log(error))
})

module.exports = router