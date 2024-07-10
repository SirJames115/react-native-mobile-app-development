import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";
import { Colors } from "./../../constants/Colors";
import { useRouter } from "expo-router";
import { SignedOut, useAuth } from "@clerk/clerk-expo";

export default function MenuList() {
  const router = useRouter();
  const { signOut } = useAuth();
  const menuList = [
    {
      id: 1,
      name: "Add Business",
      icon: require("./../../assets/images/add.png"),
      path: "/business/add-business",
    },
    {
      id: 2,
      name: "My Business",
      icon: require("./../../assets/images/business-trade.png"),
      path: "/business/my-business",
    },
    {
      id: 3,
      name: "Share App",
      icon: require("./../../assets/images/share.png"),
      path: "share",
    },
    {
      id: 4,
      name: "Logout",
      icon: require("./../../assets/images/logout.png"),
      path: "logout",
    },
  ];

  const onMenuClick = (item) => {
    if (item.path == "logout") {
      SignedOut();
      return;
    }

    if (item.path == "share") {
      Share.share({
        message:
          "Download the Business Directory App repo by James Othniel from https://github.com/SirJames115/react-native-mobile-app-development",
      });
      return;
    }

    router.push(item.path);
  };

  // const onMenuClick = (item) => {
  //   if (item.path === "logout") {
  //     SignedOut();
  //     return;
  //   }

  //   if (item.path === "share") {
  //     Share.share({
  //       message:
  //         "Download the Business Directory App repo by James Othniel from https://github.com/SirJames115/react-native-mobile-app-development",
  //     });
  //     return;
  //   }

  //   router.push(item.path);
  // };

  return (
    <View
      style={{
        marginTop: 50,
      }}>
      <FlatList
        data={menuList}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => onMenuClick(item)}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              gap: 5,
              flex: 1,
              padding: 10,
              borderWidth: 1,
              borderRadius: 10,
              margin: 5,
              backgroundColor: "#fff",
              borderColor: Colors.PRIMARY,
            }}>
            <Image
              source={item.icon}
              style={{
                width: 50,
                height: 50,
              }}
            />
            <Text
              style={{ fontFamily: "outfit-medium", fontSize: 16, flex: 1 }}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
      />
      <Text
        style={{
          fontFamily: "outfit-regular",
          textAlign: "center",
          color: Colors.GRAY,
          marginTop: 50,
        }}>
        Developed by James Othniel (Sirjames115). This is the first mobile app
        I've ever made!!!
      </Text>
    </View>
  );
}
