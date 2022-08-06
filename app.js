const express = require('express')
const exphbs = require('express-handlebars')
const methodOverride = require('method-override')

const app = express()
const port = 3000
const routes = require('./routes')

// 引入資料庫連線相關程式
require('./config/mongoose')

// 設定 view engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: 'hbs' }))
app.set('view engine', 'hbs')

// 設定 method-override，滿足 RESTful API 的設計原則
app.use(methodOverride('_method'))

// 設定 body-parser
app.use(express.urlencoded({ extended: true }))

// 引入路由器
app.use(routes)

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`)
})