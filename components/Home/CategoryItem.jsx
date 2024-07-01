import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors } from "../../constants/Colors";
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from "react-native-gesture-handler";

export default function CategoryItem({ category, onCategoryPress }) {
  return (
    <GestureHandlerRootView>
      <TouchableOpacity
        onPress={() => onCategoryPress(category)}
        style={{ display: "flex", justifyContent: "center", marginRight: 15 }}>
        <Image
          source={{ uri: category.name }}
          style={{
            width: 50,
            height: 50,
            borderRadius: 15,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
          }}
        />
        <Text style={{ textAlign: "center", fontFamily: "outfit-regular" }}>
          {category.name}
        </Text>
      </TouchableOpacity>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({});
