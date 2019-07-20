import React, { Component } from 'react';
import ProfileBody from '../components/Profile/ProfileBody';
import { AsyncStorage } from 'react-native';
import Colors from '../constants/Colors';
import TextSize from '../constants/TextSize';

export default class ProfileScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile',
      headerStyle: {
        // backgroundColor: Colors.tintColor,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: TextSize.TEXT_TITLE,
        color: Colors.tintColor,
      },
      tabBarOptions: {
        showLabel: false,
      },
    };
  };
  _signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };
  render() {
    return <ProfileBody signOut={() => this._signOutAsync()} />;
  }
}
