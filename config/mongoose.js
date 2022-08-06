// 引入 mongoose
const mongoose = require('mongoose')

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

module.exports = db