import React, { Component } from 'react';
import {
  Container,
  Left,
  Right,
  Body,
  Button,
  Header,
  Icon,
  Content,
  Card,
  CardItem,
  Text,
  Item,
  ListItem,
} from 'native-base';
import { View, StyleSheet, ScrollView, Platform, FlatList } from 'react-native';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';
import TextSize from '../constants/TextSize';
import PureChart from 'react-native-pure-chart';
import { timeListData } from '../data/SampleData';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class SetPlanMeetup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowChart: false,
      selectedIndex: -1,
    };
  }

  render() {
    const { isShowChart } = this.state;
    return (
      <Container
        style={{ flex: 1, padding: 0, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Header
          style={{
            height: 50,
            alignItems: 'center',
            backgroundColor: 'white',
            width: '100%',
            justifyContent: 'center',
            paddingBottom: 5,
          }}>
          <Left>
            <Button transparent onPress={() => this.props.closeModal()}>
              <Icon
                name={Platform.OS === 'ios' ? 'ios-arrow-back' : 'md-arrow-back'}
                style={{ fontSize: 28, color: Colors.tintColor }}
              />
            </Button>
          </Left>
          <Body>
            <Text style={{ fontWeight: 'bold', fontSize: TextSize.TEXT_TITLE, color: Colors.tintColor }}>
              Plan Meetup
            </Text>
          </Body>
          <Right />
        </Header>
        <Content style={{ flex: 1, padding: 15 }}>
          <View style={{ alignItems: 'center' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Button
                onPress={() => {
                  this.setState({ isShowChart: !isShowChart });
                }}
                style={styles.button}>
                <Text style={{ fontWeight: '600', textAlign: 'center', fontSize: TextSize.TEXT_SMALL_SIZE }}>
                  Load List Time
                </Text>
              </Button>
            </View>
            {isShowChart ? (
              <ScrollView horizontal={true} contentContainerStyle={{ alignItems: 'flex-start' }}>
                <PureChart
                  data={[
                    {
                      seriesName: 'series1',
                      data: timeListData,
                      color: Colors.tintColor,
                    },
                  ]}
                  type='bar'
                />
              </ScrollView>
            ) : null}
          </View>
          {/* <FlatList
            horizontal
            data={timeListData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.setState({ selectedIndex: index });
                  }}>
                  <Card style={{ width: Layout.window.width * 0.7, padding: 15 }}>
                    <Text style={{ fontWeight: '600' }}>Time</Text>
                    <Text style={{ marginTop: 5, marginBottom: 20 }}>{item.x}</Text>

                    <Text style={{ fontWeight: '600' }}>Member Available</Text>
                    <Text style={{ marginTop: 5, marginBottom: 20 }}>{item.free_users.toString()}</Text>

                    <Text style={{ fontWeight: '600' }}>Member Busy</Text>
                    <Text style={{ marginTop: 5, marginBottom: 20 }}>{item.busy_users.toString()}</Text>
                    {this.state.selectedIndex === index ? (
                      <Icon
                        name={Platform.OS === 'ios' ? 'ios-radio-button-on' : 'md-radio-button-on'}
                        style={{ fontSize: 28, color: Colors.tintColor }}
                      />
                    ) : (
                      <Icon
                        name={Platform.OS === 'ios' ? 'ios-radio-button-off' : 'md-radio-button-off'}
                        style={{ fontSize: 28, color: Colors.tintColor }}
                      />
                    )}
                  </Card>
                </TouchableOpacity>
              );
            }}
          /> */}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.tintColor,
    borderRadius: 4,
    height: Layout.window.height * 0.07,
    width: Layout.window.width * 0.4,
    shadowColor: Colors.tintColor,
    shadowOffset: {
      width: 0,
      height: 9,
    },
    shadowOpacity: 0.35,
    shadowRadius: 9,
    elevation: 14,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
