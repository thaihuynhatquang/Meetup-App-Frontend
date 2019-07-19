import React, { Component } from 'react';
import { StyleSheet, Text, Platform, FlatList } from 'react-native';
import { Container, Body, ListItem, Thumbnail, Left, CheckBox, Header, Item, Input, Icon, Button } from 'native-base';
import { users } from '../../data/SampleData';
import Colors from '../../constants/Colors';

export default class CreateGroupBody2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: users,
      inputSearch: null,
    };
  }

  _filterListContacts = (users, filterValue) => {

  };

  _handleSearchEvent = (event) => {
    value = event.nativeEvent.text;
    this.setState({ inputSearch: value });
  };

  _renderItem = ({ item }) => {
    return (
      <ListItem thumbnail noIndent>
        <Left>
          <Thumbnail small source={{ uri: item.image }} />
        </Left>
        <Body>
          <Text style={{ fontWeight: 'bold' }}>{item.name}</Text>
        </Body>
        <CheckBox checked={false} color={Colors.tintColor} />
      </ListItem>
    );
  };

  render() {
    return (
      <Container>
        <Header searchBar rounded>
          <Item>
            <Icon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} />
            <Input placeholder='Search' value={this.state.inputSearch} onChange={this._handleSearchEvent} />
            <Icon name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'} />
          </Item>
          <Button transparent>
            <Text>Search</Text>
          </Button>
        </Header>
        <FlatList
          style={{ padding: 5 }}
          data={this.state.data}
          renderItem={(item) => this._renderItem(item)}
          keyExtractor={(item) => item.id.toString()}
        />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
