const mongoose = require('mongoose')
const Schema = mongoose.Schema

const UserSchema = new Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    select: false,
    set(val) {
      return require('bcrypt').hashSync(val, 10)
    }
  },
  status: {
    type: String,
    default: '0' // 0-正常 1-禁用
  }
}, {
  timestamps: {
    createdAt: 'createTime',
    updatedAt: 'updateTime'
  }
})

module.exports = mongoose.model('User', UserSchema)