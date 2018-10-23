//
// https://blog.invertase.io/getting-started-with-cloud-firestore-on-react-native-b338fb6525b9
//
import React from 'react';
import { StyleSheet, Text, TextInput, ScrollView, View, Button } from 'react-native'
import firebase from 'react-native-firebase';

class ToDos extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('todos');
    this.state = {
        textInput: '',
    };
  }
  
  updateTextInput(value) {
    this.setState({ textInput: value });
  }
  
  addTodo() {
    this.ref.add({
      title: this.state.textInput,
      complete: false,
    });

    this.setState({
      textInput: '',
    });
  }  
  
  render() {
    return (
      <View>
        <ScrollView>
          <Text>List of TODOs</Text>
        </ScrollView>
        <TextInput
          placeholder={'Add TODO'}
          value={this.state.textInput}
          onChangeText={(text) => this.updateTextInput(text)}
        />
        <Text>

        </Text>
        <Button
          title={'Add TODO'}
          disabled={!this.state.textInput.length}
          onPress={() => this.addTodo()}
        />
      </View>
    );
  }
}

export default ToDos;