const axios = require('axios');
const { getSummonerInfoFromRiot, saveSummonerInfo, getSummonerInfo, getRecentMatches, getMatchByGameId, getChampDataFromRiot } = require('./riotHelpers');
const { log, logAndSend } = require('./logHelpers');

const createNewAccount = (data, auth, db) => {
  const { email, password, region, summonerName } = data;
  console.log('create account', email, region, summonerName)

  //check if summoner is already in DB, pull from riot and save it if it isn't
  return getSummonerInfo(db, data)
    .then((info) => {

      console.log('getSummonerInfo response', data)

      if(!info)
        return {message: 'Summoner Not Found'};

      return auth.createUserWithEmailAndPassword(email, password)
        .then(user => {
          console.log('account created', email, user.uid)

          const data = Object.assign({}, info);
          data.id = user.uid;
          data.loggedIn = true;
          data.email = email;
          data.completionPoints = 0;
          const payload = { user, info: data };

          return db.ref(`/registeredUsers/${data.id}`).set(data)
            .then(() => payload)
            .catch((err) => log(err, 'setting account info in database'));
        }, (err) => log(err, 'creating account'));
    })
    .catch((err) => log(err, 'getting summoner info'));
}

const logIn = (auth, db, params) => {
  const { email, password } = params;

  return auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      console.log('logged in', email, user.uid)

      return db.ref(`/registeredUsers/${user.uid}`).once('value')
        .then((snap) => {
          const info = snap.val();
          info.loggedIn = true;

          return { info, user }
        })
        .catch((err) => log(err, 'getting summoner info from Riot'));
    }, 
    (err) => {
      console.log('login fail', email, err.code, err.message)

      // return unified error for user/password fail
      if(err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password')
        err.message = 'This email/password combination was not found'

      const failed = { loggedIn: false, message: err.message }
      return failed;
    }
  );
}

const logOut = () => {

}


// check if account exists
//   if exists
//     return error account exists
//   else
//     create account
//     then check if summoner in db
//       if exists
//         create entry
//       else
//         pull from riot
//         then create entry

//       then send info to client

//     then res.send user to client







    // if(!user.emailVerified) {
    //   fb.auth().currentUser.sendEmailVerification().then(() => {
    //    // Email sent.
    //    console.log('email sent', email)
    //   }, (err) => {
    //    // An error happened.
    //    console.log(err)
    //   });
      
    // }




export {
  createNewAccount,
  logIn,
  logOut
}