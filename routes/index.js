// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()

// 引入 home 模組
const home = require('./modules/home')
router.use('/',home)

// 引入 todos 模組
const todos = require('./modules/todos')
router.use('/todos',todos)

// 匯出路由器
module.exports = router