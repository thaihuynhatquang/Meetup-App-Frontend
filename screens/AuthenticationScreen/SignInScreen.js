import React from 'react';
import {
  AsyncStorage,
  View,
  TextInput,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import firebaseSvc from '../../FirebaseServices';
import Colors from '../../constants/Colors';
import imageLogo from '../../assets/images/robot-dev.png';
import { Platform } from '@unimodules/core';
import TextSize from '../../constants/TextSize';
import Layout from '../../constants/Layout';

export default class SignInScreen extends React.Component {
  passwordInputRef = React.createRef();

  static navigationOptions = {
    title: 'Login',
  };

  state = {
    email: '',
    password: '',
    emailTouched: false,
    passwordTouched: false,
  };

  handleEmailChange = (email) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password: password });
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handleEmailBlur = () => {
    this.setState({ emailTouched: true });
  };

  handlePasswordBlur = () => {
    this.setState({ passwordTouched: true });
  };

  onPressLogin = async () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    firebaseSvc.login(user, this.loginSuccess, this.loginFailed);
  };
  loginSuccess = async (userData) => {
    await AsyncStorage.setItem('userData', JSON.stringify(userData));
    this.props.navigation.navigate('App');
  };
  loginFailed = () => {
    alert('Login failure. Please tried again.');
  };

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };

  render() {
    const { email, password, emailTouched, passwordTouched } = this.state;
    // Show the validation errors only when the inputs
    // are empty AND have been blurred at least once
    const emailError = !email && emailTouched ? 'Email is required' : undefined;
    const passwordError = !password && passwordTouched ? 'Password is required' : undefined;
    return (
      <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <Image source={imageLogo} style={styles.logo} />
        <View style={styles.form}>
          <TextInput
            value={email}
            selectionColor={Colors.tintColor}
            style={styles.textInput}
            onChangeText={this.handleEmailChange}
            placeholder='Email'
            onSubmitEditing={this.handleEmailSubmitPress}
            autoCorrect={false}
            keyboardType='email-address'
            returnKeyType='next'
            onBlur={this.handleEmailBlur}
            blurOnSubmit={Platform.OS === 'ios'}
          />
          <Text style={styles.errorText}>{emailError || ''}</Text>
          <TextInput
            ref={this.passwordInputRef}
            value={password}
            selectionColor={Colors.tintColor}
            style={styles.textInput}
            onChangeText={this.handlePasswordChange}
            placeholder='Password'
            secureTextEntry={true}
            returnKeyType='done'
            onBlur={this.handlePasswordBlur}
          />
          <Text style={styles.errorText}>{passwordError || ''}</Text>
        </View>
        <Button
          title='Sign in'
          buttonStyle={styles.button}
          titleStyle={{ fontSize: TextSize.TEXT_MEDIUM_SIZE }}
          onPress={this.onPressLogin}
        />
        <TouchableOpacity style={{ marginVertical: 30 }} onPress={() => this.props.navigation.navigate('SignUp')}>
          <Text style={{ color: Colors.tintColor }}>New to Meetup? Register Here</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logo: {
    flex: 1,
    width: '100%',
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    width: '80%',
  },
  textInput: {
    height: 30,
    borderColor: Colors.silver,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 5,
  },
  errorText: {
    height: 15,
    color: Colors.torch_red,
    fontSize: 12,
  },
  button: {
    backgroundColor: Colors.tintColor,
    borderRadius: 4,
    height: Layout.window.height * 0.07,
    width: Layout.window.width * 0.8,
    shadowColor: Colors.tintColor,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.35,
    shadowRadius: 9,
    elevation: 14,
    marginTop: 20,
  },
});
