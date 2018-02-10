import * as utils from './utils'
import * as userController from '../controllers/userController'
import * as userInfos from './user_infos'

let firstMsg = ['Hé ! D\'aprés ce que je vois, ', 'Heuresement, ', 'Quel chanceux tu es, ']
let occupyMsg = ['Pas de bol ! ', 'Aïe... ', 'Ouuuuups ! ']
let introMsg = [
  "Tu m'as l'air de débuter, une explication s'impose donc !",
  'Le but de ce lieu est de réguler les allées et venues dans ta mère... Tout en voyagant dans celle de tes potes !',
  "Pour chasser quelqu'un qui s'est inséré confortablement, une seule solution :",
  'Faire la même chose ! Combattre le mal par le mal ! 😈',
  'Partages ce lieu à tes "amis" pour leur montrer qui est le patron (et pour sauver ta mère au passage)',
  "Tu peux obtenir plus d'informations en tapant la commande \"/help\"",
  'Bon courage... 💪💪'
]

function activity (step, userId) {
  userController.getUser(userId).then(
    (user) => {
      if (user) {
        userController.getActvitiesUser(user.attackers).then((activitiesUser) => {
          if (step === 'GET_STARTED_NEW_USER') {
            activityGetStartedNewUser(user, activitiesUser)
          } else if (step === 'GET_STARTED_WELCOME_BACK') {
            activityGetStartedWelcomeBack(user, activitiesUser);
          }
        })
      }
    }
  )
}

function activityGetStartedNewUser (user, activitiesUser) {
  let startMsg = 'Salut ' + user.first_name + ' !'
  userInfos.sendAsyncMsg(user.psid, genericMsg(startMsg, activitiesUser))
}

function activityGetStartedWelcomeBack (user, activitiesUser) {
  let startMsg = 'Déjà de retour, ' + user.first_name + ' ?'
  let arr = utils.createMsgArray(startMsg, ...genericMsg(activitiesUser))
  userInfos.sendAsyncMsg(user.psid, arr)
}

function genericMsg (activitiesUser) {
  let stateMsg
  let actionMsg
  let arrMsg = []
  if (activitiesUser.length > 0) {
    actionMsg = 'Apparemment, ' + activitiesUser.length.toString()
    activitiesUser.length === 1
    ? actionMsg += ' personne s\'est installée dans ta mère. Dégages le vite !'
    : actionMsg += ' connaissances à toi se sont installés pèpère dans ta mère. Agis vite pour les expulser !'
    stateMsg = occupyMsg[utils.getIntervalRandom(occupyMsg.length)] + 'Y\'en à qui se font plaisir à ce que je vois !'
  } else {
    actionMsg = 'Il est temps que tu montres qui est le boss je crois ! Partages ce lieu à tes potes pour t\'insérer dans leur mères respectives !'
    stateMsg = firstMsg[utils.getIntervalRandom(firstMsg.length)] + 'personne ne s\'en est pris à ta mère !'
  }
  return [stateMsg, actionMsg, '(utilises la commande "/help" si tu es perdu)']
}

export { activity }
