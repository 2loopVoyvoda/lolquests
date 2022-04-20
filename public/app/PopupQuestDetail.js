import React from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'


const PopupQuestDetail = (props) => {
  let { showPopup, quest, handleDescription, questLineIndex = 0, handleCompletion } = props;

  const completion = handleCompletion(quest.id);

  const iconSpacer = { x: 140, y: 160 };
  const left = quest.style.left * iconSpacer.x;
  const top = quest.style.top * iconSpacer.y;

  const style = {
    position: 'absolute',
    // top: quest.style.top + 400 + questLineIndex * 583 - window.scrollY < window.innerHeight * 3/4 ? quest.style.top : quest.style.top - 220,
    top: top - 40,
    // left: left + 390 < window.innerWidth ? left + 90 : left - 220,
    left: left + 120,
    height: 300,
    width: 200,
    display: showPopup ? 'block' : 'none',
    zIndex: 5,
    textAlign: 'left'
  }
  
  return (
    <div style={style} className='quest' >
      <Card style={{boxShadow: '0 1px 3px 0 #222, 0 0 0 1px #222', background: 'linear-gradient(135deg, rgba(59,81,102,1) 0%, rgba(43,53,67,1) 100%)', color: 'white'}}>
        <Image src={quest.backgroundImg} />

        <Card.Content>
          <Card.Header style={{color: 'white', padding: '10px 0 15px', borderBottom: '1px solid #aaa', fontFamily: 'Marcellus SC', fontSize: 20}}>{quest.name}</Card.Header>
          <Card.Description style={{color: 'white', margin: '10px 0 5px'}}>{handleDescription(quest, completion)}</Card.Description>
        </Card.Content>
        
        <Card.Content style={{margin: '15px 0 0 0', padding: 0}}>
          <span style={{textAlign: 'center', padding: '30px 25px 5px', width: '100%', margin: 0, background: 'linear-gradient(to right, rgba(5,136,162,1) 0%, rgba(0,71,97,1) 100%)'}}>

            <div style={{height: 50, width: 50, display: 'inline-block'}}>
              <Icon name='favorite' color={completion > 0 ? 'yellow' : 'grey'} size='large' style={{display: 'block', margin: 'auto'}} />
              <p style={{color: completion > 0 ? 'white' : '#aaa'}}>150</p>
            </div>

            <div style={{height: 50, width: 50, display: 'inline-block'}}>
              <Icon name='favorite' color={completion > 1 ? 'yellow' : 'grey'} size='large' style={{display: 'block', margin: 'auto'}}/>
              <p style={{color: completion > 1 ? 'white' : '#aaa'}}>300</p>
            </div>

            <div style={{height: 50, width: 50, display: 'inline-block'}}>
              <Icon name='favorite' color={completion > 2 ? 'yellow' : 'grey'} size='large' style={{display: 'block', margin: 'auto'}}/>
              <p style={{color: completion > 2 ? 'white' : '#aaa'}}>600</p>
            </div>

          </span>
        </Card.Content>
      </Card>
    </div>
  )
}

export default PopupQuestDetail;

