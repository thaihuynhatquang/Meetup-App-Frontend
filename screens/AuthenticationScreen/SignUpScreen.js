import React from 'react';
import { AsyncStorage, View, TextInput, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import firebase from 'firebase';
import { Button } from 'react-native-elements';
import firebaseSvc from '../../FirebaseServices';
import Colors from '../../constants/Colors';
import imageLogo from '../../assets/images/robot-dev.png';
import { Platform } from '@unimodules/core';
import TextSize from '../../constants/TextSize';
import Layout from '../../constants/Layout';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SignUpScreen extends React.Component {
  passwordInputRef = React.createRef();
  confirmPasswordInputRef = React.createRef();

  static navigationOptions = {
    title: 'Register',
  };

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    emailTouched: false,
    passwordTouched: false,
    confirmPasswordTouched: false,
  };

  handleEmailChange = (email) => {
    this.setState({ email: email });
  };

  handlePasswordChange = (password) => {
    this.setState({ password: password });
  };

  handleConfirmPasswordChange = (confirmPassword) => {
    this.setState({ confirmPassword: confirmPassword });
  };

  handleEmailSubmitPress = () => {
    if (this.passwordInputRef.current) {
      this.passwordInputRef.current.focus();
    }
  };

  handlePasswordSubmitPress = () => {
    if (this.confirmPasswordInputRef.current) {
      this.confirmPasswordInputRef.current.focus();
    }
  };

  handleEmailBlur = () => {
    this.setState({ emailTouched: true });
  };

  handlePasswordBlur = () => {
    this.setState({ passwordTouched: true });
  };

  handleConfirmPasswordBlur = () => {
    this.setState({ confirmPasswordTouched: true });
  };

  onPressCreate = async () => {
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    firebaseSvc.createAccount(user, this.registerSuccess, this.registerFailure);
  };

  registerSuccess = () => {
    console.log('login successful, navigate to chat.');
    // this.props.navigation.navigate('Chat', {
    //   name: this.state.name,
    //   email: this.state.email,
    // });
  };
  registerFailure = (error) => {
    console.error('got error:' + error.message);
    alert('Create account failed.');
  };

  // _signInAsync = async () => {
  //   await AsyncStorage.setItem('userToken', 'abc');
  //   this.props.navigation.navigate('App');
  // };

  render() {
    const { email, password, confirmPassword, emailTouched, passwordTouched, confirmPasswordTouched } = this.state;
    const emailError = !email && emailTouched ? 'Email is required' : undefined;
    const passwordError = !password && passwordTouched ? 'Password is required' : undefined;
    const confirmPasswordError =
      !confirmPassword && confirmPasswordTouched
        ? 'Confirm Password is required'
        : password !== confirmPassword && confirmPasswordTouched
        ? 'Password is not matched'
        : undefined;

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
            onSubmitEditing={this.handlePasswordSubmitPress}
            secureTextEntry={true}
            returnKeyType='next'
            onBlur={this.handlePasswordBlur}
            blurOnSubmit={Platform.OS === 'ios'}
          />
          <Text style={styles.errorText}>{passwordError || ''}</Text>

          <TextInput
            ref={this.confirmPasswordInputRef}
            value={confirmPassword}
            selectionColor={Colors.tintColor}
            style={styles.textInput}
            onChangeText={this.handleConfirmPasswordChange}
            placeholder='Confirm password'
            secureTextEntry={true}
            returnKeyType='done'
            onBlur={this.handleConfirmPasswordBlur}
          />
          <Text style={styles.errorText}>{confirmPasswordError || ''}</Text>
        </View>
        <Button
          title='Create New Account'
          buttonStyle={styles.button}
          titleStyle={{ fontSize: TextSize.TEXT_MEDIUM_SIZE }}
          onPress={this.onPressCreate}
        />
        <TouchableOpacity style={{ marginVertical: 30 }} onPress={() => this.props.navigation.navigate('SignIn')}>
          <Text style={{ color: Colors.tintColor }}>Already have acccount? Login Here</Text>
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
