import mongoose from 'mongoose'
import User from '../models/User'

function find (userId) {
  return new Promise((resolve, reject) => {
    User.find({psid: userId}, (err, user) => {
      if (user && user.length > 0) {
        resolve(user[0])
      } else {
        reject(err)
      }
    })
  })
}

function findMany (userId) {
  return new Promise((resolve, reject) => {
    User.find({psid: userId}, (err, user) => {
      if (user && user.length > 0) {
        resolve(user)
      } else {
        reject(err)
      }
    })
  })
}

function saveUser (user) {
  let newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    first_name: user.first_name,
    last_name: user.last_name,
    psid: user.psid,
    picture: user.picture
  })
  newUser.save()
}

function findAttackers (userId) {
  return new Promise((resolve, reject) => {
    User.find({insides: userId}, (err, attackers) => {
      if (attackers && attackers.length > 0) {
        resolve(attackers)
      } else {
        reject(err)
      }
    })
  })
}

function findInsides (userId) {
  return new Promise((resolve, reject) => {
    User.find({attackers: userId}, (err, insides) => {
      if (insides && insides.length > 0) {
        resolve(insides)
      } else {
        reject(err)
      }
    })
  })
}

function getAttackersId (userId) {
  return find(userId).then((user) => {
    return findAttackers(userId).then(
      (attackers) => {
            let attackersId = []
            let difference = attackers.filter(x => user.attackers.indexOf(x) == 1)
            console.log(difference) // A voir, mais checkActivity ne servirait à rien pour les utilisateurs déjà existant en BDD
            // attackers.forEach((attacker) => {
            //   attackersId.push(attacker.psid)
            // })
            return attackersId
          })
  })
}

function getInsidesId (userId) {
  return findInsides(userId).then(
        (insides) => {
          let insidesId = []
          insides.forEach((inside) => {
            insidesId.push(inside.psid)
          })
          return insidesId
        })
}

function addAttacker (userId, attackers) {
  User.update({psid: userId}, {$pushAll: {attackers: attackers}}).exec()
}

function addInside (userId, insideId) {
  User.update({psid: userId}, {$push: {insides: insideId}}).exec()
}

export { find, findMany, saveUser, findAttackers, addAttacker, addInside, getAttackersId, getInsidesId }
