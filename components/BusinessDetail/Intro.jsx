import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Alert,
  ToastAndroid,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Colors } from "./../../constants/Colors";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";

export default function Intro({ business }) {
  const router = useRouter();
  const { user } = useUser();

  const onDelete = async () => {
    Alert.alert(
      "Do you want to delete?",
      "Do you really want to delete this business?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => deleteBusiness(),
        },
      ],
    );
  };

  const deleteBusiness = async () => {
    console.log(`Deleted business with id as: ${business?.id}`);
    await deleteDoc(doc(db, "BusinessList", business?.id));
    router.back();
    ToastAndroid.show("Business Deleted", ToastAndroid.LONG);
  };

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
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor: "#fff",
          marginTop: -20,
          padding: 20,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          elevation: 5,
          // alignItems: "center",
        }}>
        <View
          style={{
            marginTop: -20,
            backgroundColor: "#fff",
            padding: 20,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
            // elevation: 5,
          }}>
          <Text
            style={{
              fontFamily: "outfit-bold",
              fontSize: 26,
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
        {user?.primaryEmailAddress?.emailAddress == business?.userEmail && (
          <TouchableOpacity onPress={() => onDelete()}>
            <Ionicons name="trash-outline" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}
