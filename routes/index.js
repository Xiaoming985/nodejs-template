const express = require('express')
const loginRouter = require('./login')

const router = express.Router()

router.use('/api', loginRouter)
// router.use('/api', anotherRouter) // another router

// 错误处理
router.use(async (err, req, res, next) => {
  res.status(err.statusCode || 500).send({
    code: err.statusCode || 500,
    msg: err.message
  })
})

module.exports = router