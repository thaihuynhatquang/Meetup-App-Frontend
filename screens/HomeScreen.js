import React, { Component } from 'react';
import Colors from '../constants/Colors';
import TextSize from '../constants/TextSize';
import HomeBody from '../components/Home/HomeBody';

export default class HomeScreen extends Component {
  render() {
    return (
      <HomeBody
        createNewMeeting={() => this.props.navigation.navigate('CreateGroupScreen', { prevRoute: 'HomeScreen' })}
      />
    );
  }
}

HomeScreen.navigationOptions = {
  title: 'Home',
  headerTitleStyle: {
    fontWeight: 'bold',
    fontSize: TextSize.TEXT_TITLE,
    color: Colors.tintColor,
  },
};

HomeScreen.tabBarOptions = {
  showLabel: false,
};
