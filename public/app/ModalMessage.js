import React, {Component} from 'react'
import { Button, Message, Modal, Icon } from 'semantic-ui-react'
import { regionOptions } from './Options'


class CreateAccount extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { message, closeModal } = this.props;

    return(
        <Modal.Content>
          <Message content={message}/>

          <Modal.Actions style={{textAlign: 'right'}}>
            <Button color='green' onClick={closeModal}>
              <Icon name='checkmark' /> Ok
            </Button>
          </Modal.Actions>
        </Modal.Content>

    )
  }

};

export default CreateAccount;
