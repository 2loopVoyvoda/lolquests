import React, { Component } from 'react';
import { Container, Image, Card } from 'semantic-ui-react';
import QuestIcon from './QuestIcon';
import PopupQuestDetail from './PopupQuestDetail';


class QuestCard extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      showPopup: false
    };
  }

  onMouseEnter = (i) => {
    this.setState({showPopup: true, popupQuest: this.props.questList[i]})
  }

  onMouseLeave = (e) => {
    this.setState({showPopup: false, popupQuest: null})
  }

  render() {
    const { showPopup, popupQuest } = this.state;
    const { 
      questList, 
      selectedQuest, 
      activeQuest, 
      handleClick, 
      cardQuests, 
      cardTitle, 
      cardBackground, 
      cardColor, 
      questLineIndex, 
      handleDescription, 
      handleCompletion } = this.props;

    const style = {
      container: {
        marginBottom: 20
      },
      card: {
        width: 900, 
        background: cardColor, 
        boxShadow: '0 1px 3px 0 #111, 0 0 0 1px #111'
      },
      header: {
        position: 'absolute',
        top: 30,
        right: 30,
        color: 'white',
        fontSize: '2em',
        fontFamily: 'Marcellus SC',
        // fontWeight: '300',
        // fontStyle: 'italic'

        // fontFamily: 'Walter Turncoat'
      },
      image: {
        opacity: .5
      }
    }

    return (
      <Container style={style.container}>
        <Card centered style={style.card}>
          <Card.Content>
          <Image src={cardBackground} style={style.image}/>
          <Card.Header content={cardTitle} style={style.header} />
          {popupQuest && <PopupQuestDetail showPopup={showPopup} quest={popupQuest || questList[0]} handleDescription={handleDescription} handleCompletion={handleCompletion} />}

          {cardQuests.map((questId, i) => 
            <QuestIcon 
              onMouseEnter={this.onMouseEnter} 
              onMouseLeave={this.onMouseLeave} 
              handleClick={handleClick} 
              quest={questList[questId]} 
              hoveredQuest={popupQuest}
              selectedQuest={selectedQuest}
              activeQuest={activeQuest}
              completion={handleCompletion(questId)}
              champ={questList ? questList[questId].champ : null}
              key={i} />
          )}
          
          </Card.Content>          
        </Card>
      </Container>
    )
  }
}

export default QuestCard;
