import React, { Component } from 'react';
import { Image, Icon, Modal, Button, Message, Card } from 'semantic-ui-react'
import axios from 'axios';
import './App.css';
import QuestContainer from './QuestContainer';
import ModalMessage from './ModalMessage';
import Login from './Login';
import CreateAccount from './CreateAccount';
import { regionDescriptions } from './Options';
import { log } from '../logHelpers';


// figure out why completing a quest doesn't reset active quest


class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,
      resizeUpdate: false,
      activeView: 'quests',
      backgroundUrl: 'https://cdn.leagueoflegends.com/lolkit/1.1.6/resources/images/bg-default.jpg',
      loggedIn: false,
      summonerName: '',
      profileIconId: '',
      region: '',
      showModal: false,
      modalContents: '',
      failureMessage: '',
      showProfileIcon: false,
    };
  }

  componentWillMount = () => {
    this.updateDimensions();
  }

  componentDidMount = () => {
    window.addEventListener("resize", this.updateDimensions);

    if(window.location.host != 'localhost:3000') {
      axios.get('/visitorCount')
      .then((res) => true)
      // .catch((err) => log(err, 'visitorCount')); 
    }
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions = () => {
    let update = this.state.resizeUpdate;

    if(!update) {
      this.setState({
        windowWidth: window.innerWidth, 
        windowHeight: window.innerHeight, 
        resizeUpdate: true, 
        resizeUpdate: false
      });
    }
  }

  createNewAccount = (data) => {
    this.setState({failureMessage: ''});
    let { email, password, summonerName, region } = data;
    console.log('app create account', email, password)

    if(!email || !password || !summonerName || !password) {
      this.setState({failureMessage: 'Please fill out the form'});
      return;
    }

    const payload = {
      email,
      password,
      summonerName,
      region
    }

    axios.post('/createNewAccount', payload)
      .then((res) => {
        console.log('response', res.data)
     
        if(!res.data.error) {
          console.log('success', res.data)

          const { loggedIn, accountId, summonerName, region, currentQuestId, profileIconId, questStart, userQuests } = res.data.info;
          const { user } = res.data;
          const userId = user.uid;

          this.setState({ 
            loggedIn, 
            user, 
            userId, 
            accountId, 
            summonerName, 
            region, 
            currentQuestId, 
            profileIconId, 
            questStart, 
            userQuests, 
            modalSuccess: 'Success', 
            failureMessage: '',
            loginFailureMessage: '',
          });
          
          this.modalSuccess();
        } else {
          console.log('fail', res.data.message)
          this.setState({failureMessage: res.data.message, loginFailureMessage: ''})
        }
      })
      // .catch((err) => log(err, 'creating new account')); 
      .catch((err) => console.log(err))
  }

  loginSubmit = (data) => {
    this.setState({loginFailureMessage: ''});
    let { email, password } = data;

    console.log('app login', email)

    if(!email || !password) {
      this.setState({loginFailureMessage: 'Please enter an email and password'});
      return;
    }

    axios.post('/login', {email, password})
      .then((res) => {
        // console.log('success', res.data)

        if(res.data.info && res.data.info.loggedIn) {
          const { loggedIn, accountId, summonerName, region, currentQuestId, profileIconId, questStart, userQuests } = res.data.info;
          const { user } = res.data;
          const userId = user.uid;
          console.log('successful login')
          this.setState({ loggedIn, user, userId, accountId, summonerName, region, currentQuestId, profileIconId, questStart, userQuests, failureMessage: '' });
        } else {
          this.setState({loginFailureMessage: res.data.message});
        }
      })
      .catch((err) => log(err, 'log in')); 
  }

  logOutSubmit = () => {
    axios.post('/logOut')
      .then((res) => {
        console.log('log out', res.data)
          const {loggedIn} = res.data;
          
          if(!loggedIn) {
            console.log('successful log out');
            this.setState({loggedIn: false, userId: null, user: null, userQuests: null, summonerName: null, profileIconId: null, questStart: null, currentQuestId: null, accountId: null, region: null });
          } else {
            this.setState({loginFailureMessage: res.data.message});
          }
      })
      .catch((err) => log(err, 'log out')); 
  }

  clearLoginError = () => {
    this.setState({loginFailureMessage: ''});
  }

  getSummonerInfo = (region, summonerName) => {
    // summonerName = 'escape goat'
    axios.get(`summonerInfo/${region}/${summonerName}`)
    .then((res) => {
        console.log('summonerInfo', res.data)
        const { accountId, summonerName, region, currentQuestId, profileIconId, questStart, userQuests } = res.data
        this.setState({ accountId, summonerName, region, currentQuestId, profileIconId, questStart, userQuests });
      })
    .catch((err) => log(err, 'getting summoner info')); 
  }

  openModal = (type, data) => {
    let modalContents;

    switch(type) {

      case undefined:
        return null;

      case 'createNewAccount':
        const { email, password } = data;
        modalContents = <CreateAccount closeModal={this.closeModal} onSubmit={this.createNewAccount} email={email} password={password}/>
        this.setState({ modalContents, showModal: true, failureMessage: '' });
        return
      case 'questFailed':
        modalContents = <ModalMessage closeModal={this.closeModal} message={`Quest Failed with ${data}`} />
        this.setState({ modalContents, showModal: true, failureMessage: '' });
        return
      case 'questCompleted':
        modalContents = <ModalMessage closeModal={this.closeModal} message={`Quest Completed with ${data}`} />
        this.setState({ modalContents, showModal: true, failureMessage: '' });
        return
    }
  }

  closeModal = () => {
    this.setState({ showModal: false, failureMessage: '' });
  }

  modalSuccess = () => {
    setTimeout(() => this.setState({modalSuccess: '', showModal: false}), 1500);
  }

  handleProfileIconLoad = () => {
    console.log('handleProfileIconLoad')
    this.setState({profileIconId: null});
  }

  render = () => {
    // console.log('render')
    const { 
      windowWidth,
      windowHeight,
      champData, 
      activeView, 
      backgroundUrl,
      summonerName,
      accountId,
      region,
      currentQuestId,
      profileIconId,
      questStart,
      userQuests,
      loggedIn,
      loginFailureMessage,
      failureMessage,
      showModal,
      modalContents,
      modalSuccess,
      user,
      userId,
      showProfileIcon
       } = this.state;

    const version = '7.16.1'   

    // console.log('version', version)
    const iconPath = 'https://ddragon.leagueoflegends.com/cdn/' + version + '/img/champion/';
    const skinPath = 'https://ddragon.leagueoflegends.com/cdn/img/champion/loading/';
    const splashPath = 'https://ddragon.leagueoflegends.com/cdn/img/champion/splash/';
    // console.log(profileIconId)

    return (
      <div className="App" style={{height: windowHeight}}>
        <div className="App-header">
          <img src="../leagueQuests.png" alt="Welcome to League Skins"/>

          {!loggedIn && <Login loginSubmit={this.loginSubmit} failureMessage={loginFailureMessage} openModal={this.openModal} clearLoginError={this.clearLoginError}/>}

          {loggedIn && 
            <div style={{width: 200, position: 'absolute', top: 15, right: 15}}>
              <div style={{textAlign: 'left'}}>
                {profileIconId && <Image src={`https://ddragon.leagueoflegends.com/cdn/6.24.1/img/profileicon/${profileIconId}.png`} onError={this.handleProfileIconLoad} floated='right' size='mini' /> }
                {!profileIconId && <Icon size='big' name='question' style={{float: 'right', border: '1px solid green', borderRadius: 2, color: '#ddd', padding: '2px 0', height: 36, width: 40}} />}
                
                <div style={{fontSize: 16}}>
                  {summonerName}
                </div>
                <div style={{color: '#aaa'}}>
                  {regionDescriptions[region]}
                </div>
              </div>

              <div style={{float: 'right', marginTop: 10}}>
                  {false && <Button basic compact color='green' size='mini' icon='setting' />}
                  <Button basic compact color='green' size='mini' onClick={this.logOutSubmit}>Log out</Button>
              </div>
            </div>
          }
          
        </div>

        <Modal open={showModal} onClose={this.closeModal} size='small'>
          {modalContents}

          {failureMessage && 
            <Modal.Content style={{textAlign: 'center'}}>
              <Message error compact content={failureMessage}/>
            </Modal.Content>
          }

          {modalSuccess && 
            <Modal.Content style={{textAlign: 'center'}}>
              <Message success compact>
                <Message.Content>
                  {modalSuccess}
                  <Icon name='checkmark' />
                </Message.Content>
              </Message>
            </Modal.Content>
          }
        </Modal>

        <QuestContainer 
          openModal={this.openModal}
          summonerName={summonerName} 
          accountId={accountId} 
          region={region} 
          currentQuestId={currentQuestId}
          profileIconId={profileIconId}
          questStart={questStart}
          userQuests={userQuests}
          userId={userId}
          user={user}
        />

        <div className='footer' style={{color:'white'}}>
        
        </div>

        <div className='background'>
          <img className='champDetailBackground' src={backgroundUrl} />
        </div>
      </div>
    );
  }
}

export default App;










