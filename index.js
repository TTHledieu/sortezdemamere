import express from 'express'
import bot from './config/bot_config'
import simpleMsg from './helpers/simpleMessage'
import db from './config/db_config'
import * as message from './helpers/message'
import * as command from './helpers/command'
import * as user from './helpers/user_infos'
import * as utils from './helpers/utils'
import * as userController from './controllers/userController'



let app = express()

function check (userId, step) {
  userController.checkActivity(userId).then((res) => message.activity(step, userId))
}

bot.on('message', (userId, message) => {
  if (message[0] === '/') {
    command.process(userId, message)
    return
  }
  user.sendAsyncMsg(userId, [simpleMsg[utils.getIntervalRandom(simpleMsg.length)]])
})

bot.on('postback', (userId, payload) => {
  console.log(payload);
  if (payload === 'GET_STARTED') {
    userController.isNewUser(userId).then(
      (res) => check(userId, 'GET_STARTED_WELCOME_BACK'),
      (err) => userController.saveNewUser(userId).then((user) => check(user.psid, 'GET_STARTED_NEW_USER'))
    )
  }
})

bot.on('referral', (userId, event) => {
  console.log('user, lequel ?', userId)
  console.log('event', event)
  
})

bot.setGetStartedButton('GET_STARTED')
bot.setGreetingText('Salut à toi !')

app.get('/', function (req, res) {
  res.send('hello world')
})

app.use('/webhook', bot.middleware())

app.listen(3000, () => {
  console.log('Server up !')
  db()
})
