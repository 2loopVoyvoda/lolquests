const { getSummonerInfo } = require('./riotHelpers');

const escapeGoat = {
  summonerName: 'eScape Goat',
  accountId: '43757987',
  profileIcon: '2095',
  region: 'NA1',
  summonerId: '29549543',
  userQuests: new Array(29).fill({completion: 0, champ: '', time: ''})
}

const users = {
  NA1: {
    escapeGoat
  }
}

const resetStubUserData = (db) => {
  return db.ref('/stubUsers/').set(users).then((response) => console.log('stub users saved')).catch((error) => console.log(error)); 
}

export {
  resetStubUserData
}