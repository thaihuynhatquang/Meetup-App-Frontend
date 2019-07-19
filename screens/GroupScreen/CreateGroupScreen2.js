import React, { Component } from 'react';
import Colors from '../../constants/Colors';
import { Platform, View } from 'react-native';
import TextSize from '../../constants/TextSize';
import CreateGroupBody2 from '../../components/Group/CreateGroupBody2';
import { Icon } from 'react-native-elements';
import { Text, Button } from 'native-base';

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
      headerRight: (
        <View style={{ justifyContent: 'center', marginRight: 5 }}>
          <Button small rounded style={{ backgroundColor: Colors.tintColor }}>
            <Text>Done</Text>
          </Button>
        </View>
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
