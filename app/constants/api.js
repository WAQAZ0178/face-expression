import axios from "axios";
import { Platform } from "react-native";
export const postFlaskData = async (data) => {
  let response = "";
  const url = "http://192.168.0.111:5000/saveTrainImage";
  console.log("url :", url);
  const config = {
    method: "POST",
    url: url,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: data,
  };
  await axios(config)
    .then((res) => {
      response = res;
    })

    .catch((error) => {
      response = { error: error };
    });
  return response;
};
