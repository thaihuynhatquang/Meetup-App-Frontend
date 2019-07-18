import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ListGroupScreen from '../screens/GroupScreen/ListGroupScreen';
import CreateGroupScreen from '../screens/GroupScreen/CreateGroupScreen';
import CreateGroupScreen2 from '../screens/GroupScreen/CreateGroupScreen2';
import ProfileScreen from '../screens/ProfileScreen';

const config = Platform.select({
  web: { headerMode: 'screen' },
  default: {},
});

const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
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
  },
  {
    initialRouteName: 'ListGroupScreen',
  },
);

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
);

const RootGroupStack = createStackNavigator(
  {
    MainGroupStack: MainGroupStack,
    ModalGroupStack: ModalGroupStack,
  },
  {
    mode: 'modal',
    headerMode: 'none',
  },
);

RootGroupStack.navigationOptions = {
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
    RootGroupStack,
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

export default tabNavigator;
