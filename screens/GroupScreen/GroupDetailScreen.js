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

export default class GroupDetailScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Groups Detail',
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
        <Icon
          name={Platform.OS === 'ios' ? 'ios-create' : 'md-create'}
          type='ionicon'
          size={28}
          color={Colors.tintColor}
          iconStyle={{
            marginRight: 15,
          }}
          onPress={() => {
            console.log(state.editMode);
          }}
        />
      ),
    };
  };
  state = {
    image: null,
    hasExplorePermission: null,
    type: Camera.Constants.Type.back,
    editMode: false,
    textInputValue: '',
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    this.setState({ hasExplorePermission: status === 'granted' });
  }

  _getSelectedPickerValue = () => {
    Alert.alert('Selected country is : ' + this.state.PickerSelectedVal);
  };

  _pickImageFromExplorer = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
    });

    if (!result.cancelled) {
      this.setState({ image: result.uri });
      return Promise.resolve(result);
    }

    return Promise.reject();
  };

  switchMode = () => {
    this.setState({
      editMode: !editMode,
    });
  };

  render() {
    const { image } = this.state;
    const placeholder = {
      label: 'Select category place...',
      value: null,
      color: '#9EA0A4',
    };
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
              {image ? (
                <Image style={styles.avatar} source={{ uri: image }} />
              ) : (
                <Image
                  style={styles.avatar}
                  source={{ uri: 'https://uphinh.org/images/2019/07/18/Untitled-16446da271a5f9b7c.png' }}
                />
              )}
            </TouchableOpacity>
            <Input
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
            onChangeText={(text) => this.setState({ text })}
            value={this.state.text}
            placeholder='Describe something about this...'
          />
          <Text style={{ marginTop: 15, marginBottom: 15, fontWeight: 'bold' }}>Category</Text>
          <RNPickerSelect
            placeholder={placeholder}
            items={categoryPlaces}
            onValueChange={(value) => {
              this.setState({
                textInputValue: value,
              });
            }}
            style={pickerSelectStyles}
            value={this.state.textInputValue}
          />
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button
              title='Continue'
              buttonStyle={styles.button}
              titleStyle={{ fontSize: TextSize.TEXT_MEDIUM_SIZE }}
              onPress={() => this.props.navigation.navigate('CreateGroupScreen2')}
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
    backgroundColor: Colors.tintColor,
    borderRadius: 4,
    height: Layout.window.height * 0.07,
    width: '100%',
    shadowColor: Colors.tintColor,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.35,
    shadowRadius: 9,
    elevation: 14,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
