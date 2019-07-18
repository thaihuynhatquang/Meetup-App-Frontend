import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList } from 'react-native';
import Colors from '../../constants/Colors';
import { groups } from '../../data/SampleData';

export default class ListGroupBody extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: groups,
    };
  }

  renderGroupMembers = (group) => {
    if (group.members) {
      return (
        <View style={styles.groupMembersContent}>
          {group.members.map((prop, key) => {
            return <Image key={key} style={styles.memberImage} source={{ uri: prop }} />;
          })}
        </View>
      );
    }
    return null;
  };

  render() {
    return (
      <FlatList
        style={styles.root}
        data={this.state.data}
        extraData={this.state}
        ItemSeparatorComponent={() => {
          return <View style={styles.separator} />;
        }}
        keyExtractor={(item) => {
          return item.id.toString();
        }}
        renderItem={(item) => {
          const Group = item.item;
          let mainContentStyle;
          if (Group.attachment) {
            mainContentStyle = styles.mainContent;
          }
          return (
            <View style={styles.container}>
              <Image source={{ uri: Group.image }} style={styles.avatar} />
              <View style={styles.content}>
                <View style={mainContentStyle}>
                  <View style={styles.text}>
                    <Text style={styles.groupName}>{Group.name}</Text>
                  </View>
                  <Text style={styles.countMembers}>{Group.countMembers} members</Text>
                  <Text style={styles.timeAgo}>Updated 2 months ago</Text>
                  {this.renderGroupMembers(Group)}
                </View>
              </View>
            </View>
          );
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#FFFFFF',
  },
  container: {
    padding: 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 55,
    height: 55,
    borderRadius: 25,
  },
  text: {
    marginBottom: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  content: {
    flex: 1,
    marginLeft: 16,
    marginRight: 0,
  },
  mainContent: {
    marginRight: 60,
  },
  memberImage: {
    height: 30,
    width: 30,
    marginRight: 4,
    borderRadius: 10,
  },
  separator: {
    height: 1,
    backgroundColor: '#CCCCCC',
  },
  countMembers: {
    color: '#20B2AA',
  },
  timeAgo: {
    fontSize: 12,
    color: '#696969',
  },
  groupName: {
    fontSize: 23,
    color: Colors.tintColor,
  },
  groupMembersContent: {
    flexDirection: 'row',
    marginTop: 10,
  },
});
