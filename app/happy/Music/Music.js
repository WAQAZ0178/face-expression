import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet, Pressable, Image, ImageBackground} from 'react-native';
import {FontAwesome5, Ionicons} from '@expo/vector-icons';
import {Audio} from 'expo-av';

import {musiclibrary} from './Data';
import MusicPlayerScreen from './MusicPlayerScreen';

const Tracks = [
    {
        id: 0,
        name: "Song 1",
        img : require('../../assets/Wallpapers/1.jpg'),
        track: require ('../../assets/Songs/Asma-ul-Husna.mp3'),
        duration: 305
    },
    {
        id: 1,
        name: "Song 2",
        img : require('../../assets/Wallpapers/2.jpg'),
        track: require ('../../assets/Songs/Asma-ul-Husna.mp3'),
        duration: 147
    },
    {
        id: 2,
        name: "Song 3",
        img : require('../../assets/Wallpapers/6.jpg'),
        track: require ('../../assets/Songs/Asma-ul-Husna.mp3'),
        duration: 248
    },
  ];

export default function Music() {
    
    const sound = React.useRef(new Audio.Sound());
    const [Status, SetStatus] = React.useState(false);
    const [selectedMusic, setSelectedMusic] = useState(null);
    const [selectedMusicIndex, setSelectedMusicIndex] = useState(null);
    const [timestamp, setTimestamp] = useState(0);
    const [isPlayerModalVisible, setisPlayerModalVisible] = useState(false);
    
    const [Loaded, SetLoaded] = React.useState(false);
    const [Loading, SetLoading] = React.useState(false);
    const [CurrentSong, SetCurrentSong] = React.useState(Tracks[0]);

    // -------Play Sound--------
    
    // async function playSound() {
    //     console.log('Loading Sound');
          
    //     //   const sound = new Audio.Sound();
    //     //   await sound.loadAsync(source={musiclibrary});

    //     // const { sound } = await Audio.Sound.createAsync(
    //     //     require('../../assets/Songs/Asma-ul-Husna.mp3')
    //     // );



    //     const result = await sound.current.getStatusAsync();
    //     if (result.isLoaded) {
    //         if (result.isPlaying === false) {
    //             setSound(sound);

    //             console.log('Playing Sound');
    //             await sound.playAsync(); 
    //             SetStatus(true);
    //         }
    //     }
    // }

    // React.useEffect(() => {
    //     return sound
    //       ? () => {
        //           console.log('Unloading Sound');
        //           sound.unloadAsync(); }
        //       : undefined;
        // }, [sound]);
        
        //-------Pause Sound--------
    
        // const pauseSound = async () => {
        //     console.log('Pausing Sound');
        //     const result = await sound.getStatusAsync();
        //     if (result.isPlaying === true) {
        //         await sound.pauseAsync();
        //         SetStatus(false);
        //     }
        //     console.log('Sound Paused');
        // };

    //------- Hook -------

    React.useEffect(() => {
        LoadAudio();
        return () => Unload();
    }, [CurrentSong]);

    //------ Unload Sound -----

    const Unload = async () => {
        await sound.current.unloadAsync();
    };

    //-------- Load Sound ---------

    const LoadAudio = async () => {
        SetLoaded(false);
        SetLoading(true);
        const checkLoading = await sound.current.getStatusAsync();
        if (checkLoading.isLoaded === false) {
            try {
                await sound.current.loadAsync(
                    CurrentSong.track,
                    {},
                    true
                );
            } 
            catch (error) {
                console.log(error);
                SetLoading(false);
            }
        } 
        else {
            SetLoading(false);
        }
    };

    //------ Play Sound ------

    const playSound = async () => {
        try {
            const result = await sound.current.getStatusAsync();
            if (result.isLoaded) {
                if (result.isPlaying === false) {
                    console.log('Playing Sound');
                    sound.current.playAsync();
                    SetStatus(true);
                }
            }
        } 
        catch (error) {
            console.log(error);
        }
    };

    //-------Pause Sound--------

    const pauseSound = async () => {
        try {
            const result = await sound.current.getStatusAsync();
            if (result.isLoaded) {
                if (result.isPlaying === true) {
                    sound.current.pauseAsync();
                    SetStatus(false);
                    console.log('Sound Paused');
                }
            }
        } 
        catch (error) {
            console.log(error);
        }
    };
    

    //------- Select Track --------

    const onSelectTrack = async (selectedTrack, index) => {
        setSelectedMusic(selectedTrack);
        setTimestamp(0);
        setSelectedMusicIndex(index);
    };
    
    //------- Seek Track --------

    const onSeekTrack = newTimeStamp => {
        setTimestamp(newTimeStamp);
    };
    
    //------- Next  --------

    const nextSound = () => {
        setTimestamp(0);
        setSelectedMusic(
            Tracks[(selectedMusicIndex + 1) % Tracks.length],
        );
        setSelectedMusicIndex(selectedMusicIndex + 1);

        if (Tracks.id === Tracks[Tracks.length - 1].id) {
            setSelectedMusic(Tracks[0]);
        } 
        else {
            setSelectedMusic(Tracks[Tracks.id + 1]);
        }
    };

    // const NextSong = () => {
    //     if (CurrentSong.id === Tracks[Tracks.length - 1].id) {
    //       SetCurrentSong(Tracks[0]);
    //     } else {
    //       SetCurrentSong(Tracks[CurrentSong.id + 1]);
    //     }
    //   };

    //------- Previous --------
        
    const prevSound = () => {
        if (selectedMusicIndex === 0) {
            return;
        }
        setTimestamp(0);
        setSelectedMusic(
            Tracks[(selectedMusicIndex - 1) % Tracks.length],
        );
        setSelectedMusicIndex(selectedMusicIndex - 1);
    };

    //------- Render Single Music --------
    
    const renderSingleMusic = ({item, index}) => {
        return (
        <>
            {index === 0}
            <Pressable onPress = {() => onSelectTrack(item, index)}> 
                <Text style = {styles.musicTitle}> {item.name} </Text>
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
            source = { require ('../../assets/music.jpg') }
        >
            <View style = {styles.title}>
                <Text style = {styles.titletxt}> Music </Text>
            </View>

            <View style = {styles.container}>
                {selectedMusic && (
                    <MusicPlayerScreen
                    onCloseModal = {() => setisPlayerModalVisible(false)}
                    isVisible = {isPlayerModalVisible}
                    selectedMusic = {selectedMusic}
                    status = {Status}
                    onPlay = {playSound}
                    onPause = {pauseSound}
                    onNext = {nextSound}
                    onPrev = {prevSound}
                    onSeekTrack = {onSeekTrack}
                    timestamp = {timestamp}
                />
                )}

                <FlatList
                    data = {Tracks}
                    keyExtractor = {item => item.id}
                    renderItem = {renderSingleMusic}
                />

                {selectedMusic && (
                    <Pressable onPress = {() => setisPlayerModalVisible(true)}>
                    <View style = {[styles.widgetContainer, {}]}>
                        <View style = {{flexDirection: 'row'}}>
                            <Image
                                resizeMode = "cover"
                                source = {selectedMusic.img}
                                style = {styles.widgetImageStyle}
                            />
                            <View>
                                <Text style = {styles.widgetMusicTitle}>
                                    {selectedMusic.name}
                                </Text>
                            </View>
                        </View>

                        <Pressable 
                            onPress = {Status === false ? () => playSound() : () => pauseSound()} 
                            style = {{paddingRight: 15}}
                        >
                            {Status === false ? <FontAwesome5 name = "play" size = {23} color = "black" /> : <Ionicons name = "pause" size = {30} color = "black" />}
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
        marginTop: 15,
        marginHorizontal: 20
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
        marginTop: 18,
        marginHorizontal: 10
    }
});
