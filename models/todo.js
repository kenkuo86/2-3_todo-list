const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 運用 mongoose 提供的 Schema 方法建立 todo list 資料的 schema -> 定義「一筆資料」的格式
const todoSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  isDone: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Todo', todoSchema)