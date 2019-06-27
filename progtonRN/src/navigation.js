import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';
import Splash from './screen/Splash';
import Login from './screen/Login';
import Dashboard from './screen/Dashboard';

const drawer = createDrawerNavigator({});

const DashboardRoot = createStackNavigator({});

const MainSwitch = createSwitchNavigator({
  Splash,
  Login,
  Dashboard: DashboardRoot,
});

export default createAppContainer(MainSwitch);
