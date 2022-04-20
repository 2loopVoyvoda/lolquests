import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import QuestCard from './QuestCard';
import CurrentQuestCard from './CurrentQuestCard';
import { log } from '../logHelpers';
import axios from 'axios';

class QuestContainer extends Component {
  constructor(props) {
    super(props);

    // const noQuest = {}
  
    this.state = {
      questList: null,
      activeQuest: null,
      selectedQuest: null,
      questCards: null,
    };
  }

  componentWillMount = () => {
    this.getQuests();
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.userQuests) {
      console.log('updating questlist')
      const { questList } = this.state
      const newQuestList = questList.map((quest, i) => {
        return Object.assign({}, quest, nextProps.userQuests[i]);
      })
      this.setState({questList: newQuestList})
    } else if(nextProps.userQuests === null) {
      this.getQuests();
    }

    if(nextProps.currentQuestId && this.state.questList)
      this.setState({activeQuest: this.state.questList[nextProps.currentQuestId]})
  }

  handleClick = (i) => {
    this.setState({selectedQuest: this.state.questList[i]})
  }

  getQuests = () => {
    console.log('getting quests')
    axios.get('/quests')
      .then((response) => {
        const { quests, questCards } = response.data;
        // console.log('quests', quests, questCards);
        this.setState({questList: quests, questCards: questCards});
      })
      .catch((err) => log(err, 'getting quests')); 
  }

  beginQuest = () => {
    const { region, summonerName, user, userId } = this.props;
    const questId = this.state.selectedQuest.id;
    console.log('begin', region, summonerName, questId)

    if(user) {
      axios.get(`/beginPrivateQuest/${userId}/${questId}`)
      .then((response) => {
        console.log(response.data)
        this.setState({activeQuest: this.state.questList[questId]});
      })
      .catch((err) => log(err, 'starting quest')); 
    } else {
      axios.get(`/beginPublicQuest/${region}/${summonerName}/${questId}`)
      .then((response) => {
        console.log(response.data)
        this.setState({activeQuest: this.state.questList[questId]});
      })
      .catch((err) => log(err, 'starting quest')); 
    }
  }

  //NEEDS TO UPDATE CURRENT QUEST AND POPUPQUEST RENDERING
  completeQuest = () => {
    const { region, summonerName, user, userId } = this.props;

    if(user) {
      axios.get('/completePrivateQuest/' + userId)
      .then((res) => {
        if(res.data.isComplete && !res.data.error) {
          let questUpdate;
          const questListUpdate = this.state.questList.map((quest) => {
            if(quest.id == res.data.questId) {
              questUpdate = Object.assign({}, quest, {completion: res.data.completion, champ: res.data.champ, time: res.data.time});
              return questUpdate;
            } else {
              return quest;
            }
          });
          console.log(`completed: ${res.data.completion}/3 with ${res.data.userData[0]}`)
          this.props.openModal('questCompleted', res.data.userData[0])
          this.setState({questList: questListUpdate, selectedQuest: questUpdate, activeQuest: null })
        } else {
          this.props.openModal('questFailed', res.data.userData[0])
          this.setState({activeQuest: null})
        }
        })
      .catch((err) => log(err, 'completing quest')); 
    } else {
      axios.get('/completePublicQuest/' + region + '/' + summonerName)
      .then((res) => {
        if(res.data.isComplete) {
          let questUpdate;
          const questListUpdate = this.state.questList.map((quest) => {
            if(quest.id == res.data.questId) {
              questUpdate = Object.assign({}, quest, {completion: res.data.completion, champ: res.data.champ, time: res.data.time});
              return questUpdate;
            } else {
              return quest;
            }
          });
          console.log(`completed: ${res.data.completion}/3 with ${res.data.userData[0]}`)
          this.props.openModal('questCompleted', res.data.userData[0])
          this.setState({questList: questListUpdate, selectedQuest: questUpdate, activeQuest: null })
        } else {
          this.props.openModal('questFailed', res.data.userData[0])
          this.setState({activeQuest: null})
        }
        })
      .catch((err) => log(err, 'completing quest')); 
    }
  }

  handleDescription = (quest, completion) => {
    const description = quest.description.split('$');
    const requirements = quest.requirements;

    let ri = 0;
    let vi = 0;

    const style = {
      complete: {
        color: '#ccc'
      },
      incomplete: {
        color: '#00eaff'
      }
    }

    return description.map((descriptionText, i) => {
      if(i === 0) {
        return (<span key={i}>{descriptionText}</span>)
      } else {
        const value = requirements[ri].displayValues[vi];
        const numberStyle = completion > vi ? style.complete : style.incomplete;

        if(vi >= requirements[ri].displayValues.length - 1) {
          ri++;
          vi = 0;
        } else {
          vi++;
        }

        return (
          <span key={i}>
            <span style={numberStyle}>
              {value}
            </span>
            <span>
              {descriptionText}
            </span>
          </span>
        )
      }
    })
    
  }

  handleCompletion = (questId) => {
    let completion = 0;
    if(this.state.questList)
      completion = this.state.questList[questId].completion || 0;

    return completion;
  }

  render() {
    const { 
      activeQuest, 
      selectedQuest,
      questList, 
      questCards } = this.state;

    const {       
      summonerName,
      accountId,
      region,
      currentQuestId,
      profileIconId,
      questStart,
      userQuests } = this.props; 

    return (
      <div className='questContainer'>
        {questList && 
          <CurrentQuestCard 
          handleCompletion={this.handleCompletion} 
          selectedQuest={selectedQuest}
          activeQuest={activeQuest} 
          beginQuest={this.beginQuest} 
          completeQuest={this.completeQuest} 
          handleDescription={this.handleDescription} 
        />}

        {questCards && questCards.map((questCard, i) => 
          <QuestCard 
            key={i}
            questList={questList} 
            selectedQuest={selectedQuest}
            activeQuest={activeQuest} 
            handleClick={this.handleClick} 
            cardQuests={questCard.quests}
            cardTitle={questCard.cardTitle}
            cardColor={questCard.cardColor}
            cardBackground={questCard.cardBackground} 
            handleDescription={this.handleDescription}
            handleCompletion={this.handleCompletion}
          />)}
        
      </div>
    )
  }
}

export default QuestContainer;



