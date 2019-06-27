import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text, SafeAreaView } from 'react-native';

export default class index extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    if (true) {
      const {
        navigation: { navigate },
      } = this.props;

      navigate('Login');
    }
  }

  render() {
    return (
      <SafeAreaView>
        <Text> Splash Screen </Text>
      </SafeAreaView>
    );
  }
}
