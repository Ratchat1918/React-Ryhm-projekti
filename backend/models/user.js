const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  passwordHash: { type: String, required: true },
  boards: [
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Board'
    }
  ]
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash  // ei leakata hashia
  }
})

module.exports = mongoose.model('User', userSchema)
