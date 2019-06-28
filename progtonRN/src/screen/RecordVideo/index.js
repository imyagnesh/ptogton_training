import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { BorderlessButton } from 'react-native-gesture-handler';
import TimerContext, { TimerConsumer } from '../../context/timerContext';

const { height, width } = Dimensions.get('window');

export class index extends PureComponent {
  recordVideo = async () => {
    if (this.camera) {
      const { uri } = await this.camera.recordAsync();
    }
  };

  cameraView = () => {
    return (
      <RNCamera
        style={{ flex: 1 }}
        ref={ref => {
          this.camera = ref;
        }}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.auto}
        androidCameraPermissionOptions={{
          title: 'Permission to use camera',
          message: 'We need your permission to use your camera',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
        androidRecordAudioPermissionOptions={{
          title: 'Permission to use audio recording',
          message: 'We need your permission to use your audio',
          buttonPositive: 'Ok',
          buttonNegative: 'Cancel',
        }}
      >
        <TimerContext>
          <View style={{ flex: 1 }}>
            <TimerConsumer>
              {values => (
                <TouchableOpacity
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 30,
                    backgroundColor: 'red',
                    position: 'absolute',
                    bottom: 30,
                    left: width / 2 - 30,
                  }}
                  onPress={() => !values.isTimerActive && values.startTimer()}
                />
              )}
            </TimerConsumer>
            <TimerConsumer>
              {values => (
                <Text style={{ color: '#fff', fontSize: 20, fontWeight: 'bold' }}>
                  {values.val}
                </Text>
              )}
            </TimerConsumer>
          </View>
        </TimerContext>
      </RNCamera>
    );
  };

  render() {
    return this.cameraView();
  }
}

export default index;
