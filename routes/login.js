const express = require('express')
const router = express.Router()

// http-assert是一个插件，类似于if-else，不同的是，判断的内容如果为false，则会终止请求，并返回状态码和信息。
const assert = require('http-assert')
const jwt = require('jsonwebtoken')

const User = require('../../models/User')
// const Record = require('../../models/system/Record')

/**
 * @description 用户登录
 * */
router.post('/login', async (req, res) => {
  const {userName, password} = req.body
  const user = await User.findOne({userName}).select('+password')
  assert(user, 500, '用户名或密码不正确，请重新输入。')
  const valid = require('bcrypt').compareSync(password, user.password)
  assert(valid, 500, '用户名或密码不正确，请重新输入。')
  const status = user.status === '1'
  assert(status, 401, '当前用户被禁止登录，请联系管理员！')

  // await Record.create({user: user._id, done: '登录系统'})

  // app.get(‘SECRET’)为拿到生成token的秘钥，这个秘钥一般是保密的，不会让别人看到的，这里就放在入口文件里，可以使任意内容的字符串
  const token = jwt.sign({
    id: user._id
  }, app.get('SECRET'))
  
  res.send({
    code: 200,
    msg: '登录成功',
    token
  })
})

/**
 * @description 退出登录
 * */
router.post('/logout', async (req, res) => {
  const token = String(req.headers.authorization || '').split(' ').pop();
  const { id } = jwt.verify(token, req.app.get('SECRET'));
  const data = await User.findById(id)
  assert(data, 401, '当前用户不存在，请联系管理员。')

  // await Record.create({user: id, done: '退出系统'})
  res.send({
    code: 200,
    msg: '操作成功'
  })
})

module.export = router