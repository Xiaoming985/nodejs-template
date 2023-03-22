const mongoose = require('mongoose')
const host = '120.24.172.128'
const port = 27017

// 在使使用 FindAndUpDate 和 FindAndDelete 时，将useFindAndModify设置为false，否则会报错
mongoose.set('useFindAndModify', false)
// ruoyi-db
mongoose.connect(`mongodb://${host}:${port}/ruoyi-db`, {
  useCreateIndex: true, // 解决弃用警告
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err) => {
  if (err) {
    console.log('Error, mongodb connection error occurred:')
  } else {
    console.log('Success, mongodb connected!')
  }
})
