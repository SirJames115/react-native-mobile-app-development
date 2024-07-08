import { StyleSheet, Text, View } from "react-native";
import React from "react";
import UserIntro from "../../components/Profile/UserIntro";
import MenuList from "../../components/Profile/MenuList";

export default function profile() {
  return (
    <View
      style={{
        padding: 20,
      }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontsize: 35,
        }}>
        profile
      </Text>
      {/* User info */}
      <UserIntro />

      {/* Menu List */}
      <MenuList />
    </View>
  );
}

const styles = StyleSheet.create({});
