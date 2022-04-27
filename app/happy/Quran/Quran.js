import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable, Image, ImageBackground} from 'react-native';
import {FontAwesome5, Ionicons} from '@expo/vector-icons';

import {quranlibrary} from './Data';
import QuranScreen from './QuranScreen';

export default function Quran() {

    const [selectedMusic, setSelectedMusic] = useState(null);
    const [selectedMusicIndex, setSelectedMusicIndex] = useState(null);
    const [isPlayerModalVisible, setisPlayerModalVisible] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [timestamp, setTimestamp] = useState(0);

    const onSelectTrack = async (selectedTrack, index) => {
        setSelectedMusic(selectedTrack);
        setTimestamp(0);
        setSelectedMusicIndex(index);
    };

    const playOrPause = async () => {
        setIsPlaying(!isPlaying);
    };

    const onSeekTrack = newTimeStamp => {
        setTimestamp(newTimeStamp);
    };

    const onPressNext = () => {
        setTimestamp(0);
        setSelectedMusic(
            quranlibrary[(selectedMusicIndex + 1) % quranlibrary.length],
        );
        setSelectedMusicIndex(selectedMusicIndex + 1);
    };

    const onPressPrev = () => {
        if (selectedMusicIndex === 0) {
            return;
        }
        setTimestamp(0);
        setSelectedMusic(
            quranlibrary[(selectedMusicIndex - 1) % quranlibrary.length],
        );
        setSelectedMusicIndex(selectedMusicIndex - 1);
    };

    const renderSingleMusic = ({item, index}) => {
        return (
        <>
            {index === 0}
            <Pressable onPress = {() => onSelectTrack(item, index)}>
                <Text style = {styles.musicTitle}> {item.title} </Text>
                <Text style = {styles.artisteTitle}> {item.artist} </Text>
                <View style = {styles.lines}>
                    <Text style = {styles.line}> ______________________________________________________ </Text>
                </View>
            </Pressable>
        </>
        );
    };

    return (
        <ImageBackground
            style = {styles.container}
            source = { require ('../../assets/islamic.jpg') }
        >
            <View style = {styles.title}>
                <Text style = {styles.titletxt}> Quran </Text>
            </View>

            <View style = {styles.container}>
                {selectedMusic && (
                <QuranScreen
                    onCloseModal = {() => setisPlayerModalVisible(false)}
                    isVisible = {isPlayerModalVisible}
                    isPlaying = {isPlaying}
                    playOrPause = {playOrPause}
                    selectedMusic = {selectedMusic}
                    onSeekTrack = {onSeekTrack}
                    timestamp = {timestamp}
                    onPressNext = {onPressNext}
                    onPressPrev = {onPressPrev}
                />
                )}

                <FlatList
                    data = {quranlibrary}
                    keyExtractor = {item => item.url}
                    renderItem = {renderSingleMusic}
                />

                {selectedMusic && (
                    <Pressable onPress = {() => setisPlayerModalVisible(true)}>
                    <View style = {[styles.widgetContainer, {}]}>
                        <View style = {{flexDirection: 'row'}}>
                            <Image
                                resizeMode = "cover"
                                source = {{uri: selectedMusic.artwork}}
                                style = {styles.widgetImageStyle}
                            />
                            <View>
                                <Text style = {styles.widgetMusicTitle}>
                                    {selectedMusic.title}
                                </Text>
                                <Text style = {styles.widgetArtisteTitle}>
                                    {selectedMusic.artist}
                                </Text>
                            </View>
                        </View>

                            <Pressable 
                                onPress = {() => playOrPause()}
                                style = {{paddingRight: 15}}
                            >
                                {isPlaying ? <Ionicons name = "pause" size = {30} color = "black" /> : <FontAwesome5 name = "play" size = {23} color = "black" />}
                            </Pressable>
                    </View>
                    </Pressable>
                )}
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    title: {
        marginTop: "23%",
        marginBottom: "15%"
    },
    titletxt: {
        fontSize: 22,
        color: "white",
        marginLeft: "5%",
        textDecorationLine: "underline"
    },
    musicTitle: {
        fontSize: 20,
        color: 'black',
        fontWeight: '500',
        marginTop: 10,
        marginHorizontal: 20
    },
    artisteTitle: {
        fontSize: 14,
        color: 'black',
        opacity: 0.8,
        marginHorizontal: 20,
    },
    lines: {
        alignItems: "center"
    },
    line: {
        color: "#a995e8",
        fontWeight: 'bold'
    },
    widgetContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 60,
        width: '100%',
        backgroundColor: '#a995e8'
    },
    widgetImageStyle: {
        width: 55,
        height: 60,
        marginTop: 3
    },
    widgetMusicTitle: {
        fontSize: 18,
        color: 'black',
        fontWeight: '500',
        marginTop: 12,
        marginHorizontal: 10
    },
    widgetArtisteTitle: {
        fontSize: 14,
        color: 'black',
        opacity: 0.8,
        marginHorizontal: 10,
        marginBottom: 12
    }
});
