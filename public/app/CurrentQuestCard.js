import React, { Component } from 'react';
import { Container, Image, Card, Icon, Button } from 'semantic-ui-react';

class CurrentQuestCard extends Component {
  constructor(props) {
    super(props);
  
    this.state = {
      scrollY: 0,
      completion: 0
    };
  }

  componentDidMount = () => {
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount = () => {
    window.removeEventListener('scroll', this.handleScroll);
  }

  componentWillReceiveProps = (nextProps) => {
    if(nextProps.selectedQuest)
      this.setState({completion: this.props.handleCompletion(nextProps.selectedQuest.id)})
  }

  handleScroll = () => {
      this.setState({
        scrollY: window.scrollY
      });
  }


  render() {
    const { scrollY, completion } = this.state;
    const { selectedQuest, activeQuest, beginQuest, completeQuest, handleDescription, handleCompletion } = this.props;
    const style = {
      div: {
        background: 'transparent',
        width: window.innerWidth,
        margin: '20px 0',
        position: 'relative',
        textAlign: 'center',
      },
      divScroll: {
        background: 'rgba(25,25,25,.8)',
        position: 'fixed',
        width: window.innerWidth,
        padding: '10px 50px 10px 50px',
        marginTop: '-130px',
        zIndex: 3,
        textAlign: 'center',
        borderBottom: '2px solid #474747',
      },
      container: {
        color: '#00eaff', 
        margin: 'auto',
      },
      card: {
        height: 160, 
        width: 900,
        background: '#1f1f3d', 
        boxShadow: '0 1px 3px 0 #111, 0 0 0 1px #111',
        overflow: 'hidden'
      },
      image: {
        opacity: .85,
        position: 'absolute',
        top: -50,
        right: 0,
        zIndex: 1
      },
      content: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 50, 100, 0.8)',
        textAlign: 'left',
        marginLeft: 20,
        top: 15,
        left: 0,
        zIndex: 3
      },
      cardHeader: {
        fontFamily: 'Marcellus SC',
        color: 'white',
        width: '100%',
        fontSize: 26
      },
      cardDescription: {
        color: 'white',
        width: '100%',
        fontSize: 16,
      },
      cardDescriptionEmpty: {
        color: 'white',
        width: '100%',
        fontSize: 18,
        height: 70
      },
      iconDiv: {
        display: 'flex',
        alignItems: 'center',
        margin: '20px 10px 0 5px'
      },
      iconSpan: {
        fontSize: 25, 
        marginTop: 5
      },
      button: {
        fontFamily: 'Marcellus SC',
        zIndex: 3,
        margin: '0 0 0 25px',
        width: 180,
        fontSize: 12,
        animation: activeQuest ? '' : 'buttonPulse infinite 6s ease-in-out'
      },
    };

    if(selectedQuest)
      return (
        <div style={{height: 180}}>
          <div style={scrollY < 120 ? style.div : style.divScroll}>
            <Container style={style.container}>
              <Card centered style={style.card}>
                <Image style={style.image} src={selectedQuest.backgroundImg} />
                <Card.Content style={style.content}>
                  
                  <Card.Header content={selectedQuest.name} style={style.cardHeader} />
                  <Card.Description style={style.cardDescription} content={handleDescription(selectedQuest, completion)} />

                  <div style={style.iconDiv} >
                    <span style={style.iconSpan}>
                      <Icon name='favorite' color={completion > 0 ? 'yellow' : 'grey'} />
                      <Icon name='favorite' color={completion > 1 ? 'yellow' : 'grey'} />
                      <Icon name='favorite' color={completion > 2 ? 'yellow' : 'grey'} />
                    </span>
                    {(!activeQuest || (selectedQuest && selectedQuest.id != activeQuest.id)) && <Button onClick={beginQuest} content='BEGIN QUEST' icon='play' style={style.button} color='red' />}
                    {activeQuest && selectedQuest && selectedQuest.id === activeQuest.id && <Button onClick={completeQuest} content='COMPLETE QUEST' icon='winner' style={style.button} color='yellow' />}
                  </div>
                </Card.Content>

              </Card>
            </Container>
          </div>
        </div>
      )

    else
      return (
        <div style={{height: 180}}>
          <div style={scrollY < 100 ? style.div : style.divScroll}>
            <Container style={style.container}>
              <Card centered style={style.card}>
                <Image style={style.image} src={'https://na.leagueoflegends.com/sites/default/files/styles/scale_large/public/upload/art/wp_alistar_vs_olaf_1920x1080.jpg?itok=ReGhFMdq'} />
                <Card.Content style={style.content}>
                  
                  <Card.Header content={'Adventure Awaits!'} style={style.cardHeader} />
                  <Card.Description style={style.cardDescriptionEmpty}>
                    <div style={{textAlign: 'center', marginBottom: 10}}>Please select a quest below</div>
                    <p style={{textAlign: 'center', animation: 'bounce infinite 3s ease-out'}}><Icon name='chevron down' size='large' style={{color: '#ddd'}}/></p>
                  </Card.Description>
                </Card.Content>

              </Card>
            </Container>
          </div>
        </div>
      )
  }
}

export default CurrentQuestCard;
