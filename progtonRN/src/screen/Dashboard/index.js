import React from 'react';
import PropTypes from 'prop-types';
import { SafeAreaView, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

const index = ({ navigation: { navigate } }) => {
  return (
    <SafeAreaView>
      <Text>Dashboard</Text>
      <RectButton
        style={{ height: 40, width: 200, justifyContent: 'center', alignItems: 'center' }}
        onPress={() => navigate('RecordVideo')}
      >
        <Text>Record Video</Text>
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
