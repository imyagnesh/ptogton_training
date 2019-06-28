import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BackHandler, Text } from 'react-native';
import NetInfo from '@react-native-community/netinfo';

import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator,
  createMaterialTopTabNavigator,
  SafeAreaView,
} from 'react-navigation';
import { BorderlessButton } from 'react-native-gesture-handler';

import Splash from './screen/Splash';
import Login from './screen/Login';
import Dashboard from './screen/Dashboard';
import CustomDrawer from './screen/CustomDrawer';
import RecordVideo from './screen/RecordVideo';
import MenuIcon from './assets/icons/menu.svg';

const DashboardStack = createStackNavigator(
  {
    Dashboard,
    RecordVideo,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const DashboardTabNavigator = createMaterialTopTabNavigator({
  Dashboard: DashboardStack,
  Login,
});

const DashboardStackNavigator = createStackNavigator(
  {
    DashboardTabNavigator,
  },
  {
    defaultNavigationOptions: ({ navigation: { openDrawer } }) => {
      return {
        headerLeft: (
          <BorderlessButton
            style={{ width: 30, height: 30, marginHorizontal: 10 }}
            onPress={() => openDrawer()}
          >
            <MenuIcon height={24} width={24} />
          </BorderlessButton>
        ),
      };
    },
  },
);

const AppDrawerNavigator = createDrawerNavigator(
  {
    Dashboard: {
      screen: DashboardStackNavigator,
    },
  },
  {
    contentComponent: CustomDrawer,
  },
);

const AuthStackNavigator = createStackNavigator({
  Login,
});

const MainSwitch = createSwitchNavigator({
  Splash,
  Auth: AuthStackNavigator,
  Dashboard: AppDrawerNavigator,
});

const MainContainer = createAppContainer(MainSwitch);

export default class MainComponent extends Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  };

  static router = MainContainer.router;

  state = {
    isConnected: true,
  };

  componentDidMount() {
    this.netInfoListener = NetInfo.addEventListener(state => {
      this.setState({ isConnected: state.isConnected });
    });

    BackHandler.addEventListener('hardwareBackPress', this.onBackPress);
  }

  componentWillUnmount() {
    this.netInfoListener();
    BackHandler.removeEventListener('hardwareBackPress', this.onBackPress);
  }

  onBackPress = () => {
    console.log();
  };

  render() {
    const { isConnected } = this.state;
    const { navigation } = this.props;
    if (!isConnected) {
      return (
        <SafeAreaView>
          <Text>No Internet</Text>
        </SafeAreaView>
      );
    }
    return <MainContainer navigation={navigation} {...this.props} />;
  }
}
