import { AsyncStorage, Alert, Platform } from 'react-native';
import { iosClientId, androidClientId, API_URL } from '../constants/services';
import { Google } from 'expo';
import axios from 'axios';

export const onSignIn = async (userInfo) => {
  try {
    await AsyncStorage.clear();
    await AsyncStorage.setItem('userData', JSON.stringify(userInfo));
  } catch (error) {
    console.log('Something went wrong', error);
  }
};

export const onSignOut = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {}
};

export const isSignedIn = async () => {
  try {
    let userData = await AsyncStorage.getItem('userData');
    if (!userData) return false;
    let data = JSON.parse(userData);
    axios.defaults.headers.common['authorization'] = data.token;
    await axios
      .post(`${API_URL}/user/auth`, { token: data.token })
      .then((res) => {
        if (res.status !== 200) {
          return true;
        }
      })
      .catch((error) => {
        Alert.alert(error);
        return false;
      });
    return true;
  } catch (error) {
    console.log('Something went wrong', error);
    return false;
  }
};

export const signInWithGoogleAsync = async () => {
  try {
    const { type, idToken } = await Google.logInAsync({
      clientId: Platform.OS === 'android' ? androidClientId : iosClientId,
    });
    if (type === 'success') {
      return { idToken: idToken, platform: Platform.OS };
    } else {
      return { cancelled: true };
    }
  } catch (e) {
    return { error: true };
  }
};

export const authenticate = (user) => {
  if (user !== null) return true;
};
