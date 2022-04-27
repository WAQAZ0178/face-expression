import React from 'react';
import {StyleSheet, View, Text, ImageBackground, ScrollView} from 'react-native';

function Report () {
    return (
        <ImageBackground
            style = {styles.background}
            source = { require ('../assets/graph.jpg') }
        >

        <View style = {styles.heading}>
            <Text style = {styles.top}> Your Play List </Text>
        </View>

        <ScrollView showsVerticalScrollIndicator = {false}>

            <View style = {styles.each}>
                <Text style = {styles.txt}> Music 1 </Text>
            </View>

            <View style = {styles.each}>
                <Text style = {styles.txt}> Music 2 </Text>
            </View>

            <View style = {styles.each}>
                <Text style = {styles.txt}> Music 3 </Text>
            </View>

            <View style = {styles.each}>
                <Text style = {styles.txt}> Music 4 </Text>
            </View>

            <View style = {styles.each}>
                <Text style = {styles.txt}> Music 5 </Text>
            </View>

        </ScrollView>

        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        alignItems: "center"
    },
    heading: {
        marginTop: "23%",
        marginBottom: "18%",
        marginRight: "60%"
    },
    top: {
        color: "white",
        fontSize: 18,
        textDecorationLine: 'underline'
    },
    each: {
        borderRadius: 10,
        overflow: "hidden",
        margin: "6%",
        backgroundColor: "purple",
        width: 300,
        height: 40,
        alignItems: "center",
        justifyContent: "center"
    },
    styling: {
        width: 300,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
    },
    txt: {
        color: "white"
    }
})

export default Report;