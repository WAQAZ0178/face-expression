import React from 'react';
import {StyleSheet, Text, View, TextInput, ScrollView, TouchableOpacity, ImageBackground, Dimensions} from 'react-native';

import Note from './Note'

export default class Notepad extends React.Component {

  state = {
    noteArray: [],
    noteText: '',
  }

  render() {

    Let: notes = this.state.noteArray.map((val, key) => {
      return <Note key = {key} keyval = {key} val = {val} deleteMethod = {() => this.deleteNote(key)} />
    });

    return (

      <ImageBackground
          style = {styles.container}
          source = { require ('../../assets/notepad.jpg') }
      >

        <View style = {styles.heading}>
            <Text style = {styles.top}> Notepad </Text>
        </View>

        <ScrollView style = {styles.scrollContainer}>
          {notes}
        </ScrollView>

        <View style = {styles.footer}>

          <TouchableOpacity onPress = {this.addNote.bind(this)} style = {styles.addButtom}>
            <Text style = {styles.addButtomText}> + </Text>
          </TouchableOpacity>

          <TextInput style = {styles.textInput}
            onChangeText = {(noteText) => this.setState({ noteText })} value = {this.state.noteText}
            placeholder = '+ Add Notes' placeholderTextColor = 'white' underlineColor = 'transparent'>
          </TextInput>

        </View>

      </ImageBackground>
    );
  }
  addNote() {
    if (this.state.noteText) {
      var data = new Date();

      if (data.getMonth() <= 9) {
        var sep = "/0";
      }

      this.state.noteArray.push({ date: data.getDate() + sep + data.getMonth() + "/" + data.getFullYear(), 'note': this.state.noteText });
      this.setState({ 'noteArray': this.state.noteArray })
      this.setState({ 'noteText': '' });
    }
  }
  deleteNote(key) {
    this.state.noteArray.splice(key, 1);
    this.setState({ 'noteArray': this.state.noteArray });
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get('screen').width,
    height: Dimensions.get('screen').height
  },
  heading: {
    marginTop: "28%",
    marginBottom: "18%",
    marginLeft: "7%"
  },
  top: {
      color: "white",
      fontSize: 18,
      textDecorationLine: 'underline'
  },
  scrollContainer: {
    flex: 1,
    marginBottom: 100,
  },
  footer: {
    position: 'absolute',
    alignItems: 'center',
    bottom: 0,
    left: 0,
    right: 0
  },
  addButtom: {
    backgroundColor: '#a3b9fe',
    width: 80,
    height: 80,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -45,
    zIndex: 10
  },
  addButtomText: {
    color: '#010b65',
    fontSize: 35
  },
  textInput: {
    alignSelf: 'stretch',
    color: '#fff',
    padding: 20,
    paddingTop: 46,
    backgroundColor: '#252525',
    borderTopWidth: 2,
    borderTopColor: '#010b65'
  },
});