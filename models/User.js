import mongoose from 'mongoose'

mongoose.Promise = global.Promise
const Schema = mongoose.Schema
let userSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    first_name: {type: String, required: true},
    last_name: {type: String, required: true},
    psid: {type: String, required: true},
    picture: {type: String, required: true},
    insides: {type: [String]},
    attackers: {type: [String]}
  }
)
userSchema.virtual('fullname').get(function () { return (this.first_name + ' ' + this.last_name) })

module.exports = mongoose.model('User', userSchema)
