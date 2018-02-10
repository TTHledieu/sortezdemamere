import * as user from './user_infos'
import * as userController from '../controllers/userController'

let helpMsg = ['Le but de ce jeu est limiter le nombre de personne présente dans ta mère, tout en imposant ta loi dans celle des autres.',
  'Pour rentrer dans la mère d\'un de tes potes, partages lui ce lieu.',
  'Pour faire sortir quelqu\'un de ta mère, partages ce lieu à un de tes amis.',
  'Tu peux partager ce lieu à un ami à qui la mère est déjà occupée par tes soins mais cela n\'aura aucun effet.\nTu ne peux rentrer dans ta propre mère (es-tu fou ?).',
  'Voici une liste de commande utile :\n/help: affiche cette aide\n/recap: affiche dans quelle(s) mère(s) tu es et qui se trouve dans la tienne\n/share: affiche le bouton de partage pour rentrer dans la mère de quelqu\'un']

function recap (userId) {
  let attMsg
  let insMsg
  userController.getActivities(userId).then((activities) => {
    if (activities.att.length > 0) {
      attMsg = 'Il y a actuellement ' + activities.att.length.toString() + ' personne(s) dans ta mère :\n'
      activities.att.forEach(user => {
        attMsg += user.fullname + '\n'
      })
    } else {
      attMsg = 'Personne ne se trouve dans ta mère à l\'heure actuelle.'
    }
    if (activities.ins.length > 0) {
      insMsg = 'Tu te trouves dans la mère de ' + activities.ins.length.toString() + ' personne(s) :\n'
      activities.ins.forEach(user => {
        insMsg += user.fullname + '\n'
      })
    } else {
      insMsg = 'Tu n\'es positionné dans aucune mère pour le moment.'
    }
    user.sendAsyncMsg(userId, [attMsg, insMsg])
  })
}

function process (userId, msg) {
  switch (msg) {
    case '/help':
      user.sendAsyncMsg(userId, helpMsg)
      break
    case '/recap':
      recap(userId)
      break
    case '/share':
      console.log('share')
      break
    default:
      console.log('here')

      break
  }
}

export {process}
