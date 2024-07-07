import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "./../../constants/Colors";

export default function Intro({ business }) {
  const router = useRouter();
  return (
    <View>
      <View
        style={{
          position: "absolute",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          width: "100%",
          justifyContent: "space-between",
          padding: 25,
        }}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={40} color="white" />
        </TouchableOpacity>
        <Ionicons name="heart-outline" size={40} color="white" />
      </View>
      <Image
        source={{ uri: business?.imageUrl }}
        style={{
          width: "100%",
          height: 340,
        }}
      />

      <View
        style={{
          marginTop: -20,
          backgroundColor: "#fff",
          padding: 20,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          elevation: 5,
        }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
          }}>
          {business?.name}
        </Text>
        <Text
          style={{
            fontFamily: "outfit-regular",
            fontSize: 15,
            color: Colors.GRAY,
          }}>
          {business?.address}
        </Text>
      </View>
    </View>
  );
}
