import { View, Text, Image, TextInput } from "react-native";
import React from "react";
import { useUser } from "@clerk/clerk-expo";
import { Colors } from "./../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";

export default function Header() {
  const { user } = useUser();

  return (
    <View
      style={{
        padding: 20,
        paddingTop: 40,
        backgroundColor: Colors.PRIMARY,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        elevation: 7,
      }}>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{
            width: 45,
            height: 45,
            borderRadius: 100,
          }}
        />
        <View>
          <Text
            style={{
              color: Colors.WHITE,
              fontSize: 19,
              fontFamily: "outfit-regular",
            }}>
            Welcome,
          </Text>
          <Text
            style={{
              color: Colors.WHITE,
              fontSize: 19,
              fontFamily: "outfit-medium",
            }}>
            {user?.fullName}
          </Text>
        </View>
      </View>
      {/* Search Bar */}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: Colors.WHITE,
          gap: 10,
          padding: 10,
          borderRadius: 8,
          marginTop: 15,
          elevation: 7,
          marginVertical: 10,
          overflow: "hidden",
        }}>
        <Ionicons name="search" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="Search..."
          style={{
            fontFamily: "outfit-regular",
            fontSize: 16,
            paddingTop: 1,
            paddingLeft: 2,
            display: "flex",
            alignItems: "center",
          }}
        />
      </View>
    </View>
  );
}
