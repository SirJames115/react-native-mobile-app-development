import { View, Text, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-expo";
import { query } from "firebase/database";
import { collection, getDoc, getDocs, where } from "firebase/firestore";
import { db } from "./../../configs/FirebaseConfig";
import BusinessListCard from "../../components/Explore/BusinessListCard";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";

export default function MyBusiness() {
  const { user } = useUser();
  const [businessList, setBusinessList] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "My Business",
      headerStyle: {
        backgroundColor: Colors.PRIMARY,
      },
      headerTintColor: "#fff",
    });

    user && GetUserBusiness();
  }, [user]);

  /**
   * Used to get business list by user email
   */
  const GetUserBusiness = async () => {
    setLoading(true);
    setBusinessList([]);
    const q = query(
      collection(db, "BusinessList"),
      where("userEmail", "==", user?.primaryEmailAddress?.emailAddress),
    );

    const querySnapshot = await getDocs(q);
    const business = [];
    querySnapshot.forEach((doc) => {
      //   console.log(doc.data());
      business.push({ id: doc.id, ...doc.data() });
      setBusinessList(business);
      console.log("Businesses: ", business);
    });
    // console.log(user);
    setLoading(false);
  };

  return (
    <View
      style={{
        padding: 20,
      }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 30,
        }}>
        my-business
      </Text>

      <FlatList
        data={businessList}
        onRefresh={GetUserBusiness}
        refreshing={loading}
        renderItem={({ item, index }) => (
          <BusinessListCard business={item} key={index} />
        )}
      />
    </View>
  );
}
