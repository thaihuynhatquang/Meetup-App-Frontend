import React, { Component } from 'react';
import {
  StyleSheet,
  Platform,
  ScrollView,
  View,
  Image,
  Text,
  KeyboardAvoidingView,
  TextInput,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Icon, Input, Button } from 'react-native-elements';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from 'react-native-picker-select';
import * as NativeBaseComponent from 'native-base';

import { categoryPlaces } from '../../data/SampleData';
import TextSize from '../../constants/TextSize';
import Colors from '../../constants/Colors';
import Layout from '../../constants/Layout';

export default class GroupDetailScreen extends Component {
  state = {
    image: null,
    hasExplorePermission: null,
    type: Camera.Constants.Type.back,
    editMode: false,
    groupName: 'Group Name',
    textInputValue: 'Eating',
    description: 'Nothing here',
  };

  static navigationOptions = ({ navigation }) => {
    const { state } = navigation;
    return {
      title: 'Groups Detail',
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
          <NativeBaseComponent.Button
            onPress={() => {
              if (navigation.getParam('handleMode', null)) {
                return navigation.getParam('handleMode')();
              }
            }}
            small
            rounded
            style={{ backgroundColor: Colors.tintColor }}>
            <NativeBaseComponent.Text>
              {navigation.getParam('editMode', false) === true ? 'Save' : 'Edit'}
            </NativeBaseComponent.Text>
          </NativeBaseComponent.Button>
        </View>
      ),
    };
  };

  async componentDidMount() {
    await this.props.navigation.setParams({ handleMode: () => this.switchMode() });
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

  switchMode = async () => {
    await this.setState({
      editMode: !this.state.editMode,
    });
    this.props.navigation.setParams({ editMode: this.state.editMode });
  };

  render() {
    const { image, editMode } = this.state;
    const placeholder = {
      label: 'Select category place...',
      value: null,
      color: '#9EA0A4',
    };
    return (
      <NativeBaseComponent.Content style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() =>
                this._pickImageFromExplorer()
                  .then((r) => console.log(r))
                  .catch((e) => console.log(e))
              }
              disabled={!editMode}>
              {image ? (
                <NativeBaseComponent.Thumbnail
                  large
                  style={[styles.avatar, { borderColor: editMode ? 'white' : Colors.disableInputBackground }]}
                  source={{ uri: image }}
                />
              ) : (
                <NativeBaseComponent.Thumbnail
                  large
                  style={[styles.avatar, { borderColor: editMode ? 'white' : Colors.disableInputBackground }]}
                  source={{ uri: 'https://uphinh.org/images/2019/07/18/Untitled-16446da271a5f9b7c.png' }}
                />
              )}
            </TouchableOpacity>
            <Input
              inputStyle={[styles.name, { color: editMode ? '#FFFFFF' : Colors.silver }]}
              value={this.state.groupName}
              editable={editMode}
            />
          </View>
        </View>
        <View style={{ flex: 3, justifyContent: 'flex-start', paddingHorizontal: 30 }}>
          <Text style={{ marginTop: 15, marginBottom: 15, fontWeight: 'bold' }}>Description</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: editMode ? 'white' : Colors.disableInputBackground }]}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.description}
            placeholder='Describe something about this...'
            placeholderTextColor={Colors.placeHolderLightColor}
            editable={editMode}
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
            style={{
              inputIOS: [styles.textInput, { backgroundColor: editMode ? 'white' : Colors.disableInputBackground }],
              inputAndroid: [styles.textInput, { backgroundColor: editMode ? 'white' : Colors.disableInputBackground }],
            }}
            value={this.state.textInputValue}
            placeholderTextColor={Colors.placeHolderLightColor}
            disabled={!editMode}
          />
          <Text style={{ marginTop: 15, marginBottom: 15, fontWeight: 'bold' }}>Description</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: editMode ? 'white' : Colors.disableInputBackground }]}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.description}
            placeholder='Describe something about this...'
            placeholderTextColor={Colors.placeHolderLightColor}
            editable={editMode}
          />
          <Text style={{ marginTop: 15, marginBottom: 15, fontWeight: 'bold' }}>Description</Text>
          <TextInput
            style={[styles.textInput, { backgroundColor: editMode ? 'white' : Colors.disableInputBackground }]}
            onChangeText={(text) => this.setState({ text })}
            value={this.state.description}
            placeholder='Describe something about this...'
            placeholderTextColor={Colors.placeHolderLightColor}
            editable={editMode}
          />
        </View>
      </NativeBaseComponent.Content>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    backgroundColor: Colors.tintColor,
  },
  headerContent: {
    padding: 30,
    alignItems: 'center',
  },
  avatar: {
    // flex: 1,
    // width: 80,
    // height: 80,
    // borderRadius: 40,
    borderWidth: 4,
    // marginBottom: 10,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  category: {
    flex: 1,
    justifyContent: 'center',
    margin: 30,
  },
  textDecription: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    color: 'black',
    borderRadius: 4,
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
