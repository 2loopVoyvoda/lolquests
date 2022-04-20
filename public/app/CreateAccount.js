import React, {Component} from 'react'
import { Button, Header, Form, Message, Input, Modal, Icon } from 'semantic-ui-react'
import { regionOptions } from './Options'


class CreateAccount extends Component {
  constructor(props) {
    super(props);
    this.state = { email: props.email || '', password: props.password || '', summonerName: '', region: '' };
  }

  handleChange = (e, f) => {
    let name, value;
    if(e.target.name) {
      name = e.target.name;
      value = e.target.value;
    } else {
      name = f.name;
      value = f.value;
    }
    this.setState({[name]: value});
  }

  handleSubmit = (e) => {
    e.preventDefault(); 
    console.log('CreateAccount submit');
    this.props.onSubmit(this.state);
  }

  render() {
    const { loggedIn, failureMessage, closeModal } = this.props;
    const { email, password, summonerName, region } = this.state;

    return(
        <Modal.Content>
          <Form 
            width={2}
            success={loggedIn} 
            error={!!failureMessage} 
            onSubmit={this.handleSubmit} 
            method='post' 
            // style={{background: '#474747'}}
          >
            <div style={{margin: 'auto', width: 600}}>
              <Form.Group>
                <Form.Input
                  width={8}
                  placeholder='Email' 
                  value={email}
                  label='Email'
                  name='email' 
                  onChange={this.handleChange} 
                />
                <Form.Input
                  width={8}
                  value={password}
                  type='password' 
                  label='Password'
                  placeholder='Password' 
                  name='password' 
                  onChange={this.handleChange} 
                />
              </Form.Group>
              <Form.Group />
              <Form.Group>
                <Form.Input 
                  width={8}
                  placeholder='Summoner Name' 
                  label='Summoner Name'
                  name='summonerName' 
                  onChange={this.handleChange} 
                  />
                <Form.Select 
                  width={2} 
                  label='Region'
                  name='region'
                  placeholder='Region'
                  options={regionOptions} 
                  onChange={this.handleChange}
                />
              </Form.Group>
            </div>
          </Form>

          <Modal.Actions style={{textAlign: 'right'}}>
            <Button basic color='red' onClick={closeModal}>
              <Icon name='remove' /> Cancel
            </Button>
            <Button color='green' onClick={this.handleSubmit}>
              <Icon name='checkmark' /> Ok
            </Button>
          </Modal.Actions>
        </Modal.Content>

    )
  }

};

export default CreateAccount;
