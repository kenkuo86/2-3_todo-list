const express = require('express')
// 引入 mongoose
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const app = express()
const port = 3000

const Todo = require('./models/todo')

// 設定 view engine
app.engine('hbs', exphbs( {defaultLayout: 'main', extname: 'hbs'} ))
app.set('view engine', 'hbs')

// 透過 mongoose 把應用程式 server 跟資料庫 server 進行連線
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

// 處理 db 連線失敗時的狀況
db.on('error', () => {
  console.log('mongodb error!')
})

// 處理 db 連線成功時的狀況
db.once('open', () => {
  console.log('mongodb connected!')
})

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => { res.render('index', {todos} ) } )
    .catch( error => console.log(error) )
  
})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})