import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import Category from "../../components/Home/Category";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import ExploreBusinessList from "../../components/Explore/ExploreBusinessList";

export default function Explore() {
  const [businesslist, setBusinessList] = useState([]);

  const getBusinessByCategory = async (category) => {
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("category", "==", category),
    );
    const querySnapshot = await getDocs(q);
    const businesses = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      businesses.push({ id: doc.id, ...doc.data() });
    });
    setBusinessList(businesses);
  };

  return (
    <ScrollView
      style={{
        padding: 20,
        paddingTop: 30,
      }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}>
        Explore More
      </Text>
      {/* Search bar */}
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
      {/* Category */}
      <Category
        explore={true}
        onCategorySelect={(category) => getBusinessByCategory(category)}
      />
      {/* Business list */}
      <ExploreBusinessList businesslist={businesslist} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
