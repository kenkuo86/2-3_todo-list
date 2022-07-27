const express = require('express')
const app = express()
// 引入 mongoose
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')

const port = 3000

const Todo = require('./models/todo')

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

// 設定 view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// 設定 body-parser
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  Todo.find()
    .lean()
    .then(todos => { res.render('index', {todos} ) } )
    .catch( error => console.log(error) )  
})

app.get('/todos/new', (req,res) => {
  return res.render('new')
})

app.get('/todos/:id', (req, res) => {
  const id = req.params.id
  return Todo.findById(id)
          .lean()
          .then( (todo) => res.render('detail', { todo } ))
          .catch( (error) => console.log(error) )
})

app.post('/todos', (req,res) => {
  // 取得 post 過來的 todo 名稱
  const name = req.body.name
  // 將這個 todo 新增為一個符合 Todo 資料庫 Schema 的資料
  const todo = new Todo({name})

  return todo.save()
          .then( () => res.redirect('/') )
          .catch( (error) => console.log(error) )

  // 另外一種寫法
  // return Todo.create({ name })    
  //   .then(() => res.redirect('/'))
  //   .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})