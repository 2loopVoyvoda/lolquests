const axios = require('axios');
const { getSummonerInfoFromRiot, getRecentMatches, getMatchByGameId, } = require('./riotHelpers');
const { log, logAndSend } = require('./logHelpers');
import _ from 'lodash';

// const beginQuest = (params, db) => {
//   const { region, summonerName, currentQuestId } = params;

//   return db.ref(`/users/${region}/${summonerName.toUpperCase()}`).once('value')
//   .then((snap) => {
//     let user = snap.val();
    
//     console.log('user', user)
//     user.currentQuestId = currentQuestId;
//     user.questStart = new Date().getTime();
//     const update = Object.assign({}, user);

//     db.ref(`/users/${region}/${summonerName.toUpperCase()}`).update(update)
//       .then(() => `${summonerName} started quest ${currentQuestId} at ${user.questStart}`)
//       .catch((err) => log(err, 'updating user in database'));
    

//   })
//   .catch((err) => console.log(err));
// }

const completeQuest = (params, db, questList, dbRef) => {

  return dbRef.once('value')
    .then((snap) => {
      const user = snap.val();
      const { region, summonerName, accountId } = user;
      console.log('checking quest completion on user ', user.id)
      
      return getRecentMatches(region, accountId)
        .then((response) => {
          // console.log('recent matches retrieved', response.data.matches[0])
          return getMatchByGameId(region, response.data.matches[0].gameId)
            .then((matchInfo) => {
              // console.log('match info retrieved', matchInfo.data)
              return checkQuestCompletion(matchInfo.data, summonerName, user, questList, db, dbRef)
              .then((result) => result)
              .catch((err) => log(err, 'checking quest completion'));
            })
            .catch((err) => log(err, 'getting match info from Riot'));
        })
        .catch((err) => log(err, 'getting recent matches from Riot'));
    })
    .catch((err) => log(err, 'getting user info'));
}

const checkQuestCompletion = (matchInfo, summonerName, user, questList, db, dbRef) => {
  // quest must be started within 5 min of game start
  // if(parseInt(matchInfo.gameCreation) + 5 * 60 * 60 * 1000 < user.questStart)
  //   return 'Quest started too late: ' + matchInfo.gameCreation + ' ' + user.questStart

  let result = {};
  const questId = user.currentQuestId;
  const quest = questList[questId];


  const participant = _.find(matchInfo.participantIdentities, (participant) => participant.player.summonerName.toUpperCase() === summonerName.toUpperCase());

  user.$participantId = participant.participantId;
  user.$participantIndex = user.$participantId - 1;
  user.$team = user.$participantIndex < 5 ? 0 : 1;
  user.$champion = matchInfo.participants[user.$participantIndex].championId;

  result.questId = questId;
  result.user = user;
  result.userData = [];

  result.completion = quest.requirements.map((requirement, i) => {
    let userData = matchInfoPathParser(requirement.path, matchInfo, user);
    result.userData[i] = userData;

    if(requirement.type === 'more than')
      return requirement.values.reduce((sum, value) => userData >= value ? sum + 1 : sum, 0);
    else if(requirement.type === 'less than')
      return requirement.values.reduce((sum, value) => userData <= value ? sum + 1 : sum, 0);
    else if(requirement.type === 'multipath bool')
      return 'not implemented yet'
  });

  // console.log('quest results', result)

  return checkPriorQuestCompletion(result, db, dbRef);
}

const matchInfoPathParser = (path, matchInfo, user) => {
  path = path.split('/');
  let result = Object.assign({}, matchInfo);

  path.forEach((key) => {
    if(key[0] === '$') {
      key = user[key];
    }
    result = result[key];
  });

  return result;
}

const checkPriorQuestCompletion = (result, db, dbRef) => {
  let priorResults = 0;
  if(result.user.userQuests && result.user.userQuests[result.user.currentQuestId])
    priorResults = result.user.userQuests[result.user.currentQuestId].completion;

  const completion = result.completion.reduce((biggest, value) => Math.max(biggest, value), 0);
  result.completion = completion;

  return db.ref('/champData/keys').once('value')
    .then((champData) => {
      result.champ = champData.val()[result.user.$champion];
      result.time = new Date().getTime();
      console.log('compare', priorResults, completion)

      const update = {};

      if(completion > priorResults) {
        result.isComplete = true;
        update[`userQuests/${result.questId}/completion`] = completion;
        update[`userQuests/${result.questId}/champ`] = result.champ;
        update[`userQuests/${result.questId}/time`] = result.time;
        update[`userQuests/${result.questId}/best`] = result.userData;

      } else {
        result.isComplete = false;
        update.currentQuestId = null;
        update.questStart = null;
      }

      return dbRef.update(update)
        .then(() => result)
        .catch((err) => log(err, 'updating quest completion'));


    })
    .catch((err) => log(err, 'getting champ data from database'));
}


const saveQuestsToDb = (quests, db) => {
  return db.ref('/quests').set(quests).then((response) => console.log('quests saved')).catch((err) => log(err, 'saving quests to database'));
}

export {
  // beginQuest,
  completeQuest,
  saveQuestsToDb
}