import React, { Component } from 'react';
import { StyleSheet, Text, Platform, FlatList, View } from 'react-native';
import {
  Container,
  Body,
  ListItem,
  Content,
  Thumbnail,
  Left,
  Header,
  Item,
  Input,
  Icon,
  } from 'native-base';
import { users } from '../../data/SampleData';
import Colors from '../../constants/Colors';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class CreateGroupBody2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: users,
      inputSearch: null,
      selectedData: [],
    };
  }

  _filterListContacts = (users, filterValue) => {
    return users.filter((user) => user.name.includes(filterValue));
  };

  _handleSearchEvent = (event) => {
    value = event.nativeEvent.text;
    this.setState({ inputSearch: value });
    if (value && value !== '') {
      this.setState({ data: this._filterListContacts(users, value) });
    } else {
      this.setState({ data: users });
    }
  };

  _renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          item.checked = !item.checked;
          this.setState({ data: users });
          console.log(item.checked);
        }}>
        <ListItem thumbnail selected noIndent>
          <Left>
            <Thumbnail small source={{ uri: item.image }} />
          </Left>
          <Body>
            <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
          </Body>
          {item.checked ? (
            <Icon
              ios='ios-checkmark-circle'
              android='md-checkmark-circle'
              style={{ color: Colors.tintColor, fontSize: 24 }}
            />
          ) : (
            <Icon
              ios='ios-radio-button-off'
              android='md-radio-button-off'
              style={{ color: Colors.tintColor, fontSize: 24 }}
            />
          )}
        </ListItem>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <Container>
        <Header searchBar rounded style={{ paddingBottom: 10 }}>
          <Item style={{ alignSelf: 'center' }}>
            <Icon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
            <Input placeholder='Search' value={this.state.inputSearch} onChange={this._handleSearchEvent} />
            <Icon name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'} />
          </Item>
        </Header>
        <Content>
          <FlatList
            style={{ padding: 5 }}
            data={this.state.data}
            renderItem={(item) => this._renderItem(item)}
            keyExtractor={(item) => item.id.toString()}
          />
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({});
