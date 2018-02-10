import * as queries from '../helpers/queries'
import * as user from '../helpers/user_infos'

function isNewUser (userId) {
  return queries.find(userId).then((res, err) => {
    if (err) return true
    return false
  })
}

function getUser (userId) {
  return queries.find(userId).then(
    (user) => user,
    (err) => false
  )
}

function getUsers (usersId) {
  return queries.findMany(usersId).then(
    (users) => users,
    (err) => false
  )
}

function saveNewUser (userId) {
  return user.getUserInfos(userId).then((user, err) => {
    if (err) return false
    queries.saveUser(user)
    return user
  })
}

function getActvitiesUser (activities) {
  return getUsers(activities).then((users, err) => {
    if (err) return false
    return users
  })
}

function getActivities (userId) {
  let att = []
  let ins = []
  return getUser(userId).then((user, err) => {
    if (err) return { att, ins }
    return getUsers(user.attackers).then((attackers, err) => {
      if (err) return { att, ins }
      att = attackers
      return getUsers(user.insides).then((insides, err) => {
        if (err) return { att, ins }        
        ins = insides
        return { att, ins }
      })
    })
  })
}

function checkActivity (userId) {
  return queries.getAttackersId(userId).then(
    (attackers) =>  queries.addAttacker(userId, attackers),
    (err) => console.log('rien')
  )
}

export { isNewUser, saveNewUser, checkActivity, getUser, getUsers, getActivities, getActvitiesUser }
