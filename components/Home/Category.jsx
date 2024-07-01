import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import CategoryItem from "./CategoryItem";

export default function Category() {
  const [categoryListing, setCategoryListing] = useState([]);

  useEffect(() => {
    GetCategoryList();
  }, []);

  const GetCategoryList = async () => {
    setCategoryListing([]);
    const q = query(collection(db, "Category"));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());

      setCategoryListing((prev) => [...prev, doc.data()]);
    });
  };

  const onCategoryPress = (category) => {
    console.log(category);
  };
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
        }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            // paddingLeft: 20,
            // paddingTop: 20,
            marginBottom: 5,
          }}>
          Category
        </Text>
        <Text
          style={{
            paddingRight: 10,
            color: Colors.PRIMARY,
          }}>
          View All
        </Text>
      </View>

      <FlatList
        data={categoryListing}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CategoryItem
            category={item}
            key={index}
            onCategoryPress={onCategoryPress}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
