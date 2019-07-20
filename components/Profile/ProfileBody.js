import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Colors from '../../constants/Colors';
import TextSize from '../../constants/TextSize';
import Layout from '../../constants/Layout';

export default class ProfileView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Image style={styles.avatar} source={{ uri: 'https://bootdey.com/img/Content/avatar/avatar1.png' }} />

            <Text style={styles.name}>John Doe</Text>
          </View>
        </View>

        <View style={styles.body}>
          <View style={styles.bodyContent}>
            <Text style={styles.textInfoBold}>Email:</Text>
            <Text style={styles.textInfo}>johndoe@gmail.com</Text>
            <Text style={styles.textInfoBold}>Address:</Text>
            <Text style={styles.textInfo}>157 Pháo Đài Láng, Phường Láng Thượng, Quận Đống Đa, Hà Nội</Text>
          </View>
        </View>

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Button
            title='Sign out'
            buttonStyle={styles.button}
            titleStyle={{ fontSize: TextSize.TEXT_MEDIUM_SIZE }}
            onPress={() => this.props.signOut()}
          />
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
  },
  body: {
    flex: 2,
  },
  bodyContent: {
    alignItems: 'flex-start',
    padding: 30,
  },
  textInfoBold: {
    fontSize: 18,
    marginTop: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  textInfo: {
    fontSize: 18,
    color: 'black',
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
  },
});
