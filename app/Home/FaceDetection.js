import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Camera} from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';

function FaceDetection() {
     
    const [hasPermission, setHasPermission] = useState();
    const [faceData, setFaceData] = useState([]);
      
    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        })();
    }, []);

    if (hasPermission === false) {
        return <Text> No access to camera </Text>
    }

    function getFaceDataView() {

        if (faceData.length === 0) {
            return (
                <View style = {styles.noFace}>
                    <Text style = {styles.faceDesc}> No Face Detected! </Text>
                </View>
            );
        }
        else {
            return faceData.map((face, index) => {

                const happy = (face.smilingProbability > 0.7) && (face.rightEyeOpenProbability < 0.9 && face.leftEyeOpenProbability < 0.9);
                const Shocked = (face.rightEyeOpenProbability > 0.9 && face.leftEyeOpenProbability > 0.9) && !happy;
                const Angry = (face.rightEyeOpenProbability > 0.9 && face.leftEyeOpenProbability > 0.9) && happy;
                const Scared = (face.rightEyeOpenProbability < 0.9 && face.leftEyeOpenProbability < 0.9) && !happy;
                
                return(
                    <View style = {styles.faces} >
                        <Text style = {styles.faceDesc}> Happy: {happy.toString()} </Text>
                        <Text style = {styles.faceDesc}> Angry: {Angry.toString()} </Text>
                        <Text style = {styles.faceDesc}> Scared: {Scared.toString()} </Text>
                        <Text style = {styles.faceDesc}> Shocked: {Shocked.toString()} </Text>
                    </View>
                );
            });
        }
    }

    const handleFacesDetected = ({faces}) => {
        setFaceData(faces);
    }

    return (
        <Camera
            type = {Camera.Constants.Type.front}
            style = {styles.camera}
            onFacesDetected = {handleFacesDetected}
            faceDetectorSettings = {{
                mode: FaceDetector.FaceDetectorMode.accurate,
                detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                runClassifications: FaceDetector.FaceDetectorClassifications.all,
                minDetectionInterval: 100,
                tracking: true 
            }}
        >
            {getFaceDataView()}
        </Camera>
    );
}

const styles = StyleSheet.create({
    camera: {
        flex: 1
    },
    noFace: {
        backgroundColor: "red",
        alignSelf: "stretch",
        alignItems: "center",
        marginTop: "170%"
    },
    faces: {
        backgroundColor: "#ffffff",
        alignSelf: "stretch",
        alignItems: "center",
        marginTop: "170%"
    },
    faceDesc: {
        fontSize: 18
    },
    text: {
        height: "22%",
        width: "80%",
        backgroundColor: '#4040bf',
        opacity: 0.8,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 10
    },
    txt: {
        color: "white"
    }
});

export default FaceDetection;

