import React, { Component } from 'react';
import ProfileBody from '../components/Profile/ProfileBody';

import Colors from '../constants/Colors';
import TextSize from '../constants/TextSize';

export default class ProfileScreen extends Component {
  render() {
    return <ProfileBody />;
  }
}

ProfileScreen.navigationOptions = {
  title: 'Profile',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: TextSize.TEXT_TITLE,
    color: Colors.tintColor
  },
};

ProfileScreen.tabBarOptions = {
  showLabel : false
}
