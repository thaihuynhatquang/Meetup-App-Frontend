import React, { Component } from 'react';
import { StyleSheet, Platform, View, Image, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';

import { categoryPlaces } from '../../data/SampleData';
import TextSize from '../../constants/TextSize';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

export default class CreateGroupScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const prevRoute = navigation.getParam('prevRoute', 'HomeScreen');
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

  constructor(props) {
    super(props);

    this.inputRefs = {
      category: '',
    };

    this.state = {
      groupAvatar: null,
      description: null,
      groupName: null,
      category: 'Eating',
      hasExplorePermission: null,
      type: Camera.Constants.Type.back,
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasExplorePermission: status === 'granted' });
  }

  _getSelectedPickerValue = () => {
    Alert.alert('Selected country is : ' + this.state.PickerSelectedVal);
  };

  _pickImageFromExplorer = async () => {
    console.log('PickImageS');
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      console.log('result: ', result);
      this.setState({ groupAvatar: result.uri });
      return Promise.resolve(result);
    }
    console.log('Reject');
    return Promise.reject();
  };

  render() {
    const { groupAvatar } = this.state;
    const disabledButton =
      this.state.groupAvatar === null ||
      this.state.description === null ||
      this.state.groupName === null ||
      this.state.category === null;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() =>
                this._pickImageFromExplorer()
                  .then((r) => console.log(r))
                  .catch((e) => console.log(e))
              }>
              {groupAvatar ? (
                <Image style={styles.avatar} source={{ uri: groupAvatar }} />
              ) : (
                <Image
                  style={styles.avatar}
                  source={{ uri: 'https://uphinh.org/images/2019/07/18/Untitled-16446da271a5f9b7c.png' }}
                />
              )}
            </TouchableOpacity>
            <Input
              value={this.state.groupName}
              onChangeText={(groupName) => {
                this.setState({ groupName: groupName });
              }}
              inputStyle={styles.name}
              placeholder='Group name'
              placeholderTextColor={Colors.placeHolderLightColor}
            />
          </View>
        </View>
        <View style={{ flex: 2, justifyContent: 'flex-start', paddingHorizontal: 30 }}>
          <Text style={{ marginTop: 15, marginBottom: 15, fontWeight: 'bold' }}>Description</Text>
          <TextInput
            style={Platform.OS === 'ios' ? pickerSelectStyles.inputIOS : pickerSelectStyles.inputAndroid}
            onChangeText={(description) => this.setState({ description: description })}
            value={this.state.text}
            placeholder='Describe something about this...'
          />
          <Text style={{ marginTop: 15, marginBottom: 15, fontWeight: 'bold' }}>Category</Text>
          <RNPickerSelect
            items={categoryPlaces}
            onValueChange={(value) => {
              this.setState({
                category: value,
              });
            }}
            style={pickerSelectStyles}
            value={this.state.category}
            ref={(el) => {
              this.inputRefs.category = el;
            }}
          />
          <View style={{ alignItems: 'center' }}>
            <Button
              title='Continue'
              // disabled={disabledButton}
              buttonStyle={[
                styles.button,
                {
                  backgroundColor: disabledButton ? undefined : Colors.tintColor,
                  shadowColor: disabledButton ? undefined : Colors.tintColor,
                },
              ]}
              titleStyle={{ fontSize: TextSize.TEXT_MEDIUM_SIZE }}
              onPress={() => {
                let groupInformation = {
                  groupAvatar: this.state.groupAvatar,
                  description: this.state.description,
                  groupName: this.state.groupName,
                  category: this.state.category,
                };
                this.props.navigation.navigate('CreateGroupScreen2', { groupInformation: groupInformation });
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: Colors.tintColor,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: '#FFFFFF',
    fontWeight: '600',
    textAlign: 'center',
  },
  category: {
    flex: 1,
    justifyContent: 'center',
    margin: 30,
  },
  button: {
    borderRadius: 4,
    height: Layout.window.height * 0.07,
    width: Layout.window.height * 0.3,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.35,
    shadowRadius: 9,
    elevation: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
