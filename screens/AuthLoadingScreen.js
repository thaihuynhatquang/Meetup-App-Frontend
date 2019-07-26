import React from 'react';
import { ActivityIndicator, AsyncStorage, StatusBar, Alert, View } from 'react-native';
import axios from 'axios';
import { API_URL } from '../constants/services';

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    this.props.navigation.navigate('Auth');

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle='default' />
      </View>
    );
  }
}
