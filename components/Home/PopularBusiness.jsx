import { FlatList, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../constants/Colors";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import PopularBusinessCard from "./PopularBusinessCard";

export default function PopularBusiness() {
  const [businessList, setBusinessList] = useState([]);
  useEffect(() => {
    GetBusinessList();
  }, []);

  const GetBusinessList = async () => {
    setBusinessList([]);
    const q = query(collection(db, "BusinessList"), limit(10));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      setBusinessList((prev) => [...prev, { id: doc.id, ...doc.data() }]);
    });
  };
  return (
    <View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingLeft: 20,
          marginBottom: 10,
          marginTop: 20,
        }}>
        <Text
          style={{
            fontFamily: "outfit-bold",
            fontSize: 20,
            // paddingLeft: 20,
            // paddingTop: 20,
            marginBottom: 5,
          }}>
          Popular Business
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
        data={businessList}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <PopularBusinessCard key={index} business={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
