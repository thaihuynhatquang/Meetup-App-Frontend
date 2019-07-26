import React, { Component } from 'react';
import { StyleSheet, Platform, FlatList, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { Text, Button, Container, Body, ListItem, Content, Thumbnail, Left, Header, Item, Input } from 'native-base';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { users } from '../../data/SampleData';
import Colors from '../../constants/Colors';
import TextSize from '../../constants/TextSize';
import { connect } from 'react-redux';
import { createGroup } from '../../store/actions/groupAction';

class CreateGroupScreen2 extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: 'New Meeting',
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
        <View style={{ justifyContent: 'center', marginRight: 5 }}>
          <Button
            onPress={() => {
              if (navigation.getParam('createNewGroup', null)) {
                return navigation.getParam('createNewGroup')();
              }
            }}
            small
            rounded
            style={{ backgroundColor: Colors.tintColor }}>
            <Text>Done</Text>
          </Button>
        </View>
      ),
      tabBarOptions: {
        showLabel: false,
      },
    };
  };

  async componentDidMount() {
    await this.props.navigation.setParams({
      createNewGroup: () => this.createNewGroup(),
    });
    console.log(this.props.listUser);
  }

  createNewGroup = async () => {
    let groupInformation = this.props.navigation.getParam('groupInformation');
    groupInformation.member = [];
    groupInformation.adminEmail = this.props.userInfo.userName || 'thaihuynhatquang@gmail.com';
    const bodyFormData = new FormData();

    const uri = groupInformation.groupAvatar;
    if (uri != null) {
      const uriParts = uri.split('.');
      const fileType = uriParts[uriParts.length - 1];
      bodyFormData.append('groupAvatar', {
        uri,
        name: `groupAvatar.${fileType}`,
        type: `image/${fileType}`,
      });
    }

    bodyFormData.append('adminEmail', groupInformation.adminEmail);
    bodyFormData.append('category', groupInformation.category);
    bodyFormData.append('description', groupInformation.description);
    bodyFormData.append('groupName', groupInformation.groupName);
    bodyFormData.append('member', groupInformation.member);

    console.log(bodyFormData);
    await this.props.onCreateGroup(groupInformation);
    this.props.navigation.navigate('GroupChatScreen');
  };

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.listUser,
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
        }}>
        <ListItem thumbnail selected noIndent>
          <Left>
            <Thumbnail small source={{ uri: item.avatar }} />
          </Left>
          <Body>
            <Text style={{ fontWeight: 'bold', color: Colors.tintColor }}>{item.name}</Text>
          </Body>
          {item.checked ? (
            <Icon
              name={Platform.OS === 'ios' ? 'ios-checkmark-circle' : 'md-checkmark-circle'}
              iconStyle={{ color: Colors.tintColor, fontSize: 24 }}
              type='ionicon'
              color={Colors.tintColor}
            />
          ) : (
            <Icon
              name={Platform.OS === 'ios' ? 'ios-radio-button-off' : 'md-radio-button-off'}
              iconStyle={{ color: Colors.tintColor, fontSize: 24 }}
              type='ionicon'
              color={Colors.tintColor}
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
          <Item style={{ alignSelf: 'center', paddingLeft: 10, paddingRight: 10 }}>
            <Icon name={Platform.OS === 'ios' ? 'ios-search' : 'md-search'} type='ionicon' color={Colors.tintColor} />
            <Input placeholder='Search' value={this.state.inputSearch} onChange={this._handleSearchEvent} />
            <Icon name={Platform.OS === 'ios' ? 'ios-people' : 'md-people'} type='ionicon' color={Colors.tintColor} />
          </Item>
        </Header>
        <Content>
          <FlatList
            style={{ padding: 5 }}
            data={this.state.data}
            renderItem={(item) => this._renderItem(item)}
            keyExtractor={(item) => item.name.toString()}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  userInfo: state.authReducer.userInfo,
  listUser: state.listUserReducer.listUser,
});

const mapDispatchToProps = (dispatch) => ({
  onCreateGroup: (groupInformation) => dispatch(createGroup(groupInformation)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CreateGroupScreen2);

const styles = StyleSheet.create({});
