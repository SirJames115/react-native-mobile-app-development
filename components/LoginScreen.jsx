import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "@/constants/Colors";
import loginCup from "../assets/images/loginCup.jpg";
import addPic from "./../assets/images/addPic.png";

export default function LoginScreen() {
  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 50,
        }}>
        <Image
          source={loginCup}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "purple",
          }}
        />
      </View>

      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}>
          Your Very Ultimate{" "}
          <Text style={{ color: Colors.PRIMARY }}>
            {" "}
            Community Business Directory{"'"}s
          </Text>{" "}
          App
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            marginVertical: 10,
            fontFamily: "outfit-regular",
            color: Colors.GRAY,
          }}>
          Find your favorite busines near you and push your own business to your
          Community
        </Text>
        <TouchableOpacity style={styles.btn}>
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit-regular",
            }}>
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
    elevation: 7,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 16,
    borderRadius: 100,
    marginBottom: 50,
  },
});
