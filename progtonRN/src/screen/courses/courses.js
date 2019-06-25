import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Text, Button, SafeAreaView } from 'react-native';

export default class courses extends PureComponent {
  static propTypes = {
    test: PropTypes.string.isRequired,
  };

  constructor(props) {
    super(props);
    console.warn(props);
    this.state = {
      test: '',
    };
  }

  static getDerivedStateFromProps(props) {
    return {
      abc: 'abc',
      test: props.test,
    };
  }

  componentDidMount() {}

  //   shouldComponentUpdate(nextProps, nextState, nextContext) {
  //     const { test } = this.props;
  //     if (test !== nextProps.test) {
  //       return true;
  //     }
  //     return false;
  //   }

  //   getSnapshotBeforeUpdate(prevProps, prevState) {}

  //   componentDidUpdate(prevProps, prevState) {

  //   }

  componentWillUnmount() {}

  render() {
    console.log(this.props);
    const { test: propsTest } = this.props;
    const { test: stateTest } = this.state;
    console.warn('propsTest', propsTest);
    console.warn('stateTest', stateTest);
    return (
      <SafeAreaView>
        <Text> textInComponent </Text>
        <Button
          style={{ marginTop: 200 }}
          title="Click Me"
          onPress={() => this.setState({ test: 'test me' })}
        />
      </SafeAreaView>
    );
  }
}
