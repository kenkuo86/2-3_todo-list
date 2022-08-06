const express = require('express')
const router = express.Router()

const Todo = require('../../models/todo')

// 取得新增 todo 頁面
router.get('/new', (req, res) => {
  return res.render('new')
})

// 取得特定 todo detail 頁面
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('detail', { todo }))
    .catch((error) => console.log(error))
})

// 送出新增 todo 請求
router.post('/', (req, res) => {
  // 取得 post 過來的 todo 名稱
  const name = req.body.name
  // 將這個 todo 新增為一個符合 Todo 資料庫 Schema 的資料
  const todo = new Todo({ name })

  return todo.save()
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error))

  // 另外一種寫法
  // return Todo.create({ name })    
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))
})

// 取得編輯 todo 頁面
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
    .lean()
    .then((todo) => res.render('edit', { todo }))
    .catch((error) => console.log(error))
})

// 送出編輯 todo 請求
router.put('/:id', (req, res) => {
  const id = req.params.id
  // 解構賦值：直接將物件中的多個屬性抓出來存成變數
  const { name, isDone } = req.body

  return Todo.findById(id)
    .then((todo) => {
      todo.name = name
      todo.isDone = isDone === 'on'
      return todo.save()
    })
    .then(() => { res.redirect(`/todos/${id}`) })
    .catch(error => console.log(error))
})

// 送出刪除 todo 請求
router.delete('/:id', (req, res) => {
  const id = req.params.id

  return Todo.findById(id)
    .then(todo => todo.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

module.exports = router