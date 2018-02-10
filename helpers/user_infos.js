import bot from '../config/bot_config'

let shareBtn = [
  {
    'type': 'element_share',
    'share_contents': {
      'attachment': {
        'type': 'template',
        'payload': {
          'template_type': 'generic',
          'elements': [
            {
              'title': 'Cliques ici pour rentrer dans des mère',
              'buttons': [
                {
                  'type': 'web_url',
                  'url': '',
                  'title': 'Go !'
                }
              ]
            }
          ]
        }
      }
    }
  }
]
// https://m.me/sortezdemamere?ref=hello,bonjour,jdore

function sendAsyncMsg (userId, msgs, index = 0) {
  bot.sendTextMessage(userId, msgs[index], 'SILENT_PUSH', (err, results) => {
    if (err) return
    if (results) {
      index++
      if (index < msgs.length) {
        sendAsyncMsg(userId, msgs, index)
      }
    }
  })
}

function sendShareButton (userId) {
  getName(userId).then(
    (name) => {

    },
    (err) => {}
  )
   // bot.sendButtonMessage(userId, 'Share moi donc ça', button, 'NO_PUSH', (err, results) => {
  // });
}

function getProfile (userId) {
  return new Promise((resolve, reject) => {
    bot.getUserProfile(userId, (err, profile) => {
      if (profile) {
        resolve(profile)
      } else {
        reject(err)
      }
    })
  })
}

function getName (userId) {
  return getProfile(userId).then((res, err) => {
    if (err) return 'toi'
    return res.first_name
  })
}

function getUserInfos (userId) {
  return getProfile(userId).then(
        (res) => {
          if (res) {
            let userInfos = {
              first_name: res.first_name,
              last_name: res.last_name,
              picture: res.profile_pic,
              psid: userId
            }
            return userInfos
          }
        }, (err) => {
    return (err)
  })
}

export { getName, getUserInfos, sendAsyncMsg }
