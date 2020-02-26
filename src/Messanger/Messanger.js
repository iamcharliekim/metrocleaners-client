import React from 'react';
import styles from './Messanger.module.css';
import MessangerService from '../Services/MessangerService';
import Context from '../Context/Context';
import { withRouter } from 'react-router-dom';

class Messanger extends React.Component {
  static contextType = Context;

  state = {
    messageBody: ``
  };

  componentDidMount() {}

  componentDidUpdate(prevProps) {
    if (this.props.state !== prevProps.state) {
      this.setState({
        messageBody: `Hi ${this.props.state.order.customer}, your drycleaning is ready for pick-up!`
      });
    }
  }

  messageBodyHandler = e => {
    this.setState({ messageBody: e.target.value });
  };

  onSendMessage = e => {
    e.preventDefault();

    const newMessage = {
      messageBody: this.state.messageBody,
      customer: this.props.state.customer,
      order: this.props.state.order
    };

    MessangerService.postNewMessage(newMessage).then(updatedOrder => {
      this.context.editOrders(updatedOrder);
      this.props.history.push('/home');
    });
  };

  render() {
    return (
      <div className={styles['send-sms-wrapper']}>
        <h3>Send {this.props.state.customer.full_name} a text-message:</h3>
        <div className={styles['textarea-wrapper']}>
          <textarea onChange={this.messageBodyHandler} value={this.state.messageBody} />
        </div>
        <div className={styles['button-wrapper']}>
          <button className={styles['send-msg-btn']} onClick={this.onSendMessage}>
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default withRouter(Messanger);
