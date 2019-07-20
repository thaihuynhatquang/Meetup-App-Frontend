import React, { Component } from 'react';
import Colors from '../../constants/Colors';
import { Platform } from 'react-native';
import TextSize from '../../constants/TextSize';
import CreateGroupBody from '../../components/Group/CreateGroupBody';
import { Icon } from 'react-native-elements';

export default class CreateGroupScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const prevRoute = navigation.getParam('prevRoute', 'HomeScreen')
    return {
      title: 'New Meeting',
      headerStyle: {
        // backgroundColor: Colors.tintColor,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: TextSize.TEXT_TITLE,
        color: Colors.tintColor,
      },
      headerLeft: (
        <Icon
          name={Platform.OS === 'ios' ? 'ios-close' : 'md-close'}
          type='ionicon'
          size={35}
          color={Colors.tintColor}
          iconStyle={{
            marginLeft: 15,
          }}
          onPress={() => navigation.navigate(prevRoute)}
        />
      ),
      tabBarOptions: {
        showLabel: false,
      },
    };
  };

  render() {
    return <CreateGroupBody continueCreateGroup={() => this.props.navigation.navigate('CreateGroupScreen2')} />;
  }
}
