import mongoose from 'mongoose'

module.exports = () => {
  mongoose.connect('mongodb://localhost:27017/sorsdemamere', {
    useMongoClient: true
  })
  const db = mongoose.connection
  db.on('error', console.error.bind(console, 'connection error'))
  db.once('open', () => console.log('Database up !'))
}
