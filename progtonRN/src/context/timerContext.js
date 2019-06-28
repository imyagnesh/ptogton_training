import React, { createContext, Component } from 'react';
import PropTypes from 'prop-types';

export const { Consumer: TimerConsumer, Provider: TimerProvider } = createContext();

export default class timerContext extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      val: 0,
      startTimer: this.startTimer,
      stopTimer: this.stopTimer,
      isTimerActive: false,
    };
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
    this.setState({ val: 0, isTimerActive: false });
  }

  startTimer = () => {
    const { isTimerActive } = this.state;
    if (!isTimerActive) {
      this.timerInterval = setInterval(() => {
        this.setState(state => {
          return {
            val: state.val + 1,
            isTimerActive: true,
          };
        });
      }, 1 * 1000);
    }
  };

  stopTimer = () => {
    clearInterval(this.timerInterval);
    this.setState({ val: 0, isTimerActive: false });
  };

  render() {
    const { children } = this.props;
    const { val, startTimer, stopTimer, isTimerActive } = this.state;
    return (
      <TimerProvider value={{ val, startTimer, stopTimer, isTimerActive }}>
        {children}
      </TimerProvider>
    );
  }
}
