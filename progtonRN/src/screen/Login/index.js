import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const index = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <Text>Login</Text>
      <RectButton style={{ height: 40, width: 200 }} onPress={() => navigate('Dashboard')}>
        <Text> Go To Dashboard</Text>
      </RectButton>
    </SafeAreaView>
  );
};

index.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default index;
