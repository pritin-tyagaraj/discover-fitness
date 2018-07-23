const mongoose = require('mongoose')
const timestamps = require('mongoose-timestamp')

const UserSchema = new mongoose.Schema({
  email: String,
  firstName: String,
  lastName: String,
  facebookId: String,
  profilePictureUrl: String
})

UserSchema.plugin(timestamps)

const User = mongoose.model('User', UserSchema)
module.exports = User
