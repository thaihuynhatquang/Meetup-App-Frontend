import React, { Component } from 'react';
import Colors from '../../constants/Colors';
import { Platform } from 'react-native';
import TextSize from '../../constants/TextSize';
import ListGroupBody from '../../components/Group/ListGroupBody';
import { Icon } from 'react-native-elements';

export default class GroupScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Groups',
      headerStyle: {
        // backgroundColor: Colors.tintColor,
      },
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: TextSize.TEXT_TITLE,
        color: Colors.tintColor,
      },
      headerRight: (
        <Icon
          name={Platform.OS === 'ios' ? 'ios-add-circle-outline' : 'md-add-circle-outline'}
          type='ionicon'
          size={28}
          color={Colors.tintColor}
          iconStyle={{
            marginRight: 15,
          }}
          onPress={() => navigation.navigate('CreateGroupScreen')}
        />
      ),
      tabBarOptions: {
        showLabel: false,
      },
    };
  };
  render() {
    return <ListGroupBody />;
  }
}
