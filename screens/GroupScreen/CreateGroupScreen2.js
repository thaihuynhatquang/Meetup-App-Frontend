import React, { Component } from 'react';
import Colors from '../../constants/Colors';
import { Platform } from 'react-native';
import TextSize from '../../constants/TextSize';
import CreateGroupBody2 from '../../components/Group/CreateGroupBody2';
import { Icon } from 'react-native-elements';

export default class CreateGroupScreen2 extends Component {
  static navigationOptions = ({ navigation }) => {
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
          name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
          type='ionicon'
          size={28}
          color={Colors.tintColor}
          iconStyle={{
            marginLeft: 15,
          }}
          onPress={() => navigation.goBack()}
        />
      ),
      tabBarOptions: {
        showLabel: false,
      },
    };
  };

  render() {
    return <CreateGroupBody2 />;
  }
}
