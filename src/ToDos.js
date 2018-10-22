//
// https://blog.invertase.io/getting-started-with-cloud-firestore-on-react-native-b338fb6525b9
//
import React from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, Button } from 'react-native'
import firebase from 'react-native-firebase';

class ToDos extends React.Component {
  constructor() {
    super();
    // this.ref = firebase.firestore().collection('todos');
  }
  render() {
    return (
      <View>
        <ScrollView>
          <Text>List of TODOs</Text>
        </ScrollView>
        <TextInput
          placeholder={'Add TODO'}
        />
        <Button
          title={'Add TODO'}
          disabled={true}
          onPress={() => {}}
        />
      </View>
    );
  }
}

export default ToDos;