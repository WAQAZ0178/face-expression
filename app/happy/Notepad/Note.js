import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default class Notepad extends React.Component {
  render() {
      return (
        <View key = {this.props.keyval} style = {styles.note}>

            <Text style = {styles.noteText}>{this.props.val.date}</Text>
            <Text style = {styles.noteText}>{this.props.val.note}</Text>

            <TouchableOpacity onPress = {this.props.deleteMethod} style = {styles.noteDelete}>
              <Ionicons name = "trash-bin" size = {20} color = "white" /> 
            </TouchableOpacity>

        </View>
      );
  }
}

const styles = StyleSheet.create({
    note:{
      position: 'relative',
      padding: 20,
      paddingRight: 100,
      borderBottomWidth: 2,
      borderBottomColor: '#191970',
    },
    noteText:{
      paddingLeft: 20,
      borderLeftWidth: 10,
      borderLeftColor: '#E19E63',
    },
    noteDelete:{
      position: 'absolute',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#191970',

      padding: 10,
      top: 10,
      bottom: 10,
      right: 10,
    }
});
