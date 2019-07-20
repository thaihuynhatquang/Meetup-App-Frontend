import React from 'react';
import { Platform } from 'react-native';
import {
  createStackNavigator,
  createBottomTabNavigator,
  createAppContainer,
  createSwitchNavigator,
} from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ListGroupScreen from '../screens/GroupScreen/ListGroupScreen';
import CreateGroupScreen from '../screens/GroupScreen/CreateGroupScreen';
import CreateGroupScreen2 from '../screens/GroupScreen/CreateGroupScreen2';
import DetailGroupScreen from '../screens/GroupScreen/DetailGroupScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SignInScreen from '../screens/AuthenticationScreen/SignInScreen';
import SignUpScreen from '../screens/AuthenticationScreen/SignUpScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const ModalGroupStack = createStackNavigator(
  {
    CreateGroupScreen: {
      screen: CreateGroupScreen,
      path: 'group/:create',
    },
    CreateGroupScreen2: {
      screen: CreateGroupScreen2,
      path: 'group/:create2',
    },
  },
  {
    headerMode: 'float',
  },
);

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    HomeScreen: HomeScreen,
  },
  config,
);

HomeStack.navigationOptions = {
  tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'} />,
};

HomeStack.path = '';

const MainGroupStack = createStackNavigator(
  {
    ListGroupScreen: {
      screen: ListGroupScreen,
      path: 'group/:list',
    },
    DetailGroupScreen: {
      screen: DetailGroupScreen,
      path: 'group',
    },
  },
  {
    initialRouteName: 'ListGroupScreen',
  },
);

MainGroupStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'} />
  ),
};

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  config,
);

ProfileStack.navigationOptions = {
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={Platform.OS === 'ios' ? `ios-contact` : 'md-contact'} />
  ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator(
  {
    MainGroupStack,
    HomeStack,
    ProfileStack,
  },
  {
    initialRouteName: 'HomeStack',
    tabBarOptions: {
      showLabel: false,
    },
  },
);

tabNavigator.path = '';

const AppStack = createStackNavigator(
  {
    tabNavigator: tabNavigator,
    ModalGroupStack: ModalGroupStack,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

const AuthStack = createStackNavigator({
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
});

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppStack,
      Auth: AuthStack,
    },
    {
      initialRouteName: 'AuthLoading',
    },
  ),
);
