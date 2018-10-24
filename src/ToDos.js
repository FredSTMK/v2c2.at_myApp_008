//
// https://blog.invertase.io/getting-started-with-cloud-firestore-on-react-native-b338fb6525b9
//
import React from 'react';
import { StyleSheet, Text, TextInput, ScrollView, FlatList, View, Button } from 'react-native'
import firebase from 'react-native-firebase';
import ToDo from './ToDo';

class ToDos extends React.Component {
  constructor() {
    super();
    this.ref = firebase.firestore().collection('todos');
    this.unsubscribe = null;
    this.state = {
        textInput: '',
        loading: true,
        todos: [],
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
  
  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate) 
  }

  componentWillUnmount() {
    this.unsubscribe();
  }
  
  onCollectionUpdate = (querySnapshot) => {
    const todos = [];

    querySnapshot.forEach((doc) => {
    const { title, complete } = doc.data();

    todos.push({
        key: doc.id,
        doc, // DocumentSnapshot
        title,
        complete,
      });
    });

    this.setState({ 
      todos,
      loading: false,
    });
  }
  
  render() {
    if (this.state.loading) {
      return null; // or render a loading icon
    }
    return (
      <View>  
        <FlatList
          data={this.state.todos}
          renderItem={({ item }) => <ToDo {...item} />}
        />
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