import React from 'react';
import { AsyncStorage, View, Button, TextInput, Text, StyleSheet, Image, KeyboardAvoidingView } from 'react-native';
import firebaseSvc from '../../FirebaseServices';
import Colors from '../../constants/Colors';
import imageLogo from '../../assets/images/robot-dev.png';

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
  loginSuccess = () => {
    console.log('login successful, navigate to chat.');
    this.props.navigation.navigate('Chat', {
      name: this.state.name,
      email: this.state.email,
    });
  };
  loginFailed = () => {
    alert('Login failure. Please tried again.');
  };

  render() {
    const { email, password, emailTouched, passwordTouched } = this.state;
    // Show the validation errors only when the inputs
    // are empty AND have been blurred at least once
    const emailError = !email && emailTouched ? 'Email is required' : undefined;
    const passwordError = !password && passwordTouched ? 'Password is required' : undefined;
    return (
      <KeyboardAvoidingView style={styles.container} behavior='padding'>
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
          <Button title='Sign in' onPress={this._signInAsync} />
        </View>
      </KeyboardAvoidingView>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    height: 40,
    borderColor: Colors.silver,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 20,
  },
  errorText: {
    height: 20,
    color: Colors.torch_red,
  },
});
