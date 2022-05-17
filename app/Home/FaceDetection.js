import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import { Camera } from "expo-camera";
import { postFlaskData } from "../constants/api";
import * as FaceDetector from "expo-face-detector";
import { useIsFocused } from "@react-navigation/native";
function FaceDetection({ navigation }) {
  const [hasPermission, setHasPermission] = useState();
  const [faceData, setFaceData] = useState([]);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [Image, setImage] = useState("");
  const focus = useIsFocused();
  let camera = useRef();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, [focus]);
  const __takePicture = async () => {
    // let res = await camera.getAvailablePictureSizesAsync("4:3");
    // console.log(res);
    const photo = await camera.takePictureAsync();
    let content = photo?.uri;
    const file = {
      uri: content,
      name: content?.slice(content?.lastIndexOf("/") + 1),
      type: "image/jpg",
    };
    setImage(file);
    await FlaskUpload(file);
    console.log("photo is ", file);
  };
  const FlaskUpload = async (Img1) => {
    const body1 = new FormData();
    body1.append("file", Img1);
    try {
      var res = await postFlaskData(body1);
      var json = JSON.stringify(res);
      if (
        res?.data?.dominant_emotion == "happy" ||
        res?.data?.dominant_emotion == "sad" ||
        res?.data?.dominant_emotion == "angry" ||
        res?.data?.dominant_emotion == "surprise"
      ) {
        let mood=""
        if( res?.data?.dominant_emotion == "surprise")
        {
          mood="shock"
        }
        else  if( res?.data?.dominant_emotion == "fear")
        {
          mood="sad"
        }
        navigation.navigate("DrawerNavigator", {
          screen: "Feed",
          params: { data: mood },
        });
        console.log("res--", res.data);
      } else {
        ToastAndroid.show(
          "Please try agaian",
          ToastAndroid.SHORT,
          ToastAndroid.CENTER
        );
        console.log("else result ", res.data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  if (hasPermission === false) {
    return <Text> No access to camera </Text>;
  }
  function getFaceDataView() {
    if (faceData.length === 0) {
      return (
        <View style={styles.noFace}>
          <Text style={styles.faceDesc}> No Face Detected! </Text>
        </View>
      );
    } else {
      return faceData.map((face, index) => {
        const happy =
          face.smilingProbability > 0.7 &&
          face.rightEyeOpenProbability < 0.9 &&
          face.leftEyeOpenProbability < 0.9;
        const Shocked =
          face.rightEyeOpenProbability > 0.9 &&
          face.leftEyeOpenProbability > 0.9 &&
          !happy;
        const Angry =
          face.rightEyeOpenProbability > 0.9 &&
          face.leftEyeOpenProbability > 0.9 &&
          happy;
        const Scared =
          face.rightEyeOpenProbability < 0.9 &&
          face.leftEyeOpenProbability < 0.9 &&
          !happy;

        return (
          <View style={styles.faces}>
            <Text style={styles.faceDesc}> Happy: {happy.toString()} </Text>
            <Text style={styles.faceDesc}> Angry: {Angry.toString()} </Text>
            <Text style={styles.faceDesc}> Scared: {Scared.toString()} </Text>
            <Text style={styles.faceDesc}> Shocked: {Shocked.toString()} </Text>
          </View>
        );
      });
    }
  }
  const handleFacesDetected = ({ faces }) => {
    setFaceData(faces);
  };
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <Camera
        style={{ flex: 1, width: "100%" }}
        pictureSize="640x480"
        type={Camera.Constants.Type.back}
        ref={(r) => {
          camera = r;
        }}
      ></Camera>
      <View
        style={{
          position: "absolute",
          bottom: 0,
          flexDirection: "row",
          flex: 1,
          width: "100%",
          padding: 20,
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            alignSelf: "center",
            flex: 1,
            alignItems: "center",
          }}
        >
          <TouchableOpacity
            onPress={() => __takePicture()}
            style={{
              width: 70,
              height: 70,
              bottom: 0,
              borderRadius: 50,
              backgroundColor: "#fff",
            }}
          />
        </View>
      </View>
    </View>
    // <Camera
    //   // type={Camera.Constants.Type.front}
    //   style={styles.camera}
    //   type={type}
    //   onFacesDetected={handleFacesDetected}
    //   faceDetectorSettings={{
    //     mode: FaceDetector.FaceDetectorMode.accurate,
    //     detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
    //     runClassifications: FaceDetector.FaceDetectorClassifications.all,
    //     minDetectionInterval: 100,
    //     tracking: true,
    //   }}
    // >
    //   <View style={styles.buttonContainer}>
    //     <TouchableOpacity
    //       style={styles.button}
    //       onPress={() => {
    //         setType(
    //           type === Camera.Constants.Type.back
    //             ? Camera.Constants.Type.front
    //             : Camera.Constants.Type.back
    //         );
    //       }}
    //     >
    //       <Text style={styles.text}> Flip </Text>
    //     </TouchableOpacity>
    //   </View>
    //   {/* {getFaceDataView()} */}
    // </Camera>
  );
}
const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  noFace: {
    backgroundColor: "red",
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: "170%",
  },
  faces: {
    backgroundColor: "#ffffff",
    alignSelf: "stretch",
    alignItems: "center",
    marginTop: "170%",
  },
  faceDesc: {
    fontSize: 18,
  },
  text: {
    height: "22%",
    width: "80%",
    backgroundColor: "#4040bf",
    opacity: 0.8,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  txt: {
    color: "white",
  },
  text: {
    color: "white",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    backgroundColor: "dodgerblue",
    padding: 20,
    borderRadius: 35,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default FaceDetection;
