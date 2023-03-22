const path = require('path')
const express = require('express')
const routes = require('./routes')
require('./plugins/db')

const app = express()
const host = process.env.HOST || ''
const port = Number(process.env.PORT || '3000')

// 静态托管public文件夹
app.use(express.static(path.join(__dirname, 'public')))
// 允许express处理json格式数据，否则将不能处理前端传来的json数据
app.use(express.json())
// 解析form表单提交的数据application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }))
app.use("/", routes)
app.set('SECRET', 'SERVER_DATABASE_20230320')

app.listen(port, host, () => {
  console.log(`server running @ http://${host ? host : 'localhost'}:${port}`)
})