import React from 'react';
import {View, Text, Modal, Image, StyleSheet, Pressable, ImageBackground} from 'react-native';
import {Ionicons, MaterialIcons} from '@expo/vector-icons';

import {secsToTimestamp} from '../TimeFormat';
import Slider from '@react-native-community/slider';

export default function RingtonesScreen( {isVisible, onCloseModal, selectedMusic, isPlaying, playOrPause, 
    onSeekTrack, timestamp, onPressNext, onPressPrev} ) {

    return (
    <Modal
        animationType = "slide"
        visible = {isVisible}
        presentationStyle = "fullScreen">
        <ImageBackground
            style = {styles.container}
            source = { require ('../../assets/screen.jpg') }
        >
            <Pressable
                onPress = {onCloseModal}
                style = {styles.top}
            >
                {<Ionicons name = "arrow-back" size = {26} color = "#191970" />}
                <Text style = {{fontSize: 20, color: "#191970"}}> Ringtones </Text>
            </Pressable>

            <Image
                style = {{width: 330, height: 280, marginVertical: "30%"}}
                source = {{uri: selectedMusic.artwork}}
            />

            <View style = {{justifyContent: 'space-between', width: '100%'}}>
                <Text style = {styles.boldMainText}> {selectedMusic.title} </Text>
                <Text style = {styles.mainText}> {selectedMusic.artist} </Text>
            </View>

            <Slider
                tapToSeek = {true}
                minimumTrackTintColor = "black"
                onValueChange = {e => {
                    onSeekTrack(Math.floor(e * selectedMusic.duration));
                }}
                style = {{width: '100%'}}
                value = {timestamp / selectedMusic.duration}
            />

            <View
                style = {{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Text style = {styles.timer}> {secsToTimestamp(timestamp)} </Text>
                <Text style = {styles.timer}>
                    {secsToTimestamp(selectedMusic.duration - timestamp)}
                </Text>
            </View>

            <View style = {styles.timeStampHolder}>
                <Pressable onPress = {onPressPrev}>
                    <MaterialIcons name = "skip-previous" size = {35} color = "black" />
                </Pressable>
                <Pressable onPress = {playOrPause} style = {styles.playButtonHolder}>
                    {isPlaying ? <Ionicons name = "pause" size = {30} color="black" /> : <Ionicons name = "play" size = {30} color = "black" />}
                </Pressable>
                <Pressable onPress = {onPressNext}>
                    <MaterialIcons name = "skip-next" size = {35} color = "black" />
                </Pressable>
            </View>

      </ImageBackground>
    </Modal>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 10,
    },
    top: {
        position: 'absolute', 
        top: 20, 
        left: 20, 
        flexDirection: "row", 
        alignItems: "center"
    },
    boldMainText: {
        fontSize: 22,
        color: "black",
        fontWeight: '500',
        marginHorizontal: 20
    },
    mainText: {
        fontSize: 16,
        color: "black",
        opacity: 0.8,
        marginHorizontal: 20,
        marginBottom: 20
    },
    timer: {
        color: "white",
        fontSize: 16,
        marginHorizontal: 20,
        marginBottom: 20
    },
    timeStampHolder: {
        width: '50%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center'
    },
    playButtonHolder: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
});