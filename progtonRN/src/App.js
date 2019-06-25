import React, { Component } from 'react';
import { View } from 'react-native';
import { ListItem } from 'components';
import Courses from './screen/courses/courses';

export default class App extends Component {
  state = {};

  render() {
    return (
      <View>
        <ListItem />
        <Courses test="test" />
      </View>
    );
  }
}
