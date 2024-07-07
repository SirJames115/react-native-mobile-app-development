import {
  View,
  Text,
  FlatList,
  Image,
  Linking,
  TouchableOpacity,
  Share,
} from "react-native";
import React from "react";

export default function ActionButton({ business }) {
  const actionButtonMenu = [
    {
      id: 1,
      name: "Call",
      icon: require("./../../assets/images/phone.png"),
      url: "tel:" + business?.contact,
    },
    {
      id: 2,
      name: "Location",
      icon: require("./../../assets/images/pin.png"),
      url:
        "https://www.google.com/maps/search/?api=1&query=" + business?.address,
    },
    {
      id: 3,
      name: "Web",
      icon: require("./../../assets/images/web.png"),
      url: business?.website
        ? business?.website
        : "http://" + business?.website,
    },
    {
      id: 4,
      name: "Share",
      icon: require("./../../assets/images/share.png"),
      url: "tel" + business?.contact,
    },
  ];

  const onPressHandler = (item) => {
    if (item?.name == "Share") {
      Share.share({
        message:
          business?.name +
          "\n Address:" +
          business.address +
          "\n Find more detail on Business Directory App by Sirjames115!",
      });
      return;
    }
    Linking.openURL(item.url);
  };
  return (
    <View
      style={{
        backgroundColor: "#fff",
        padding: 20,
      }}>
      <FlatList
        numColumns={4}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        data={actionButtonMenu}
        renderItem={({ item, index }) => (
          <TouchableOpacity key={index} onPress={() => onPressHandler(item)}>
            <Image
              source={item?.icon}
              style={{
                width: 40,
                height: 40,
              }}
            />
            <Text
              style={{
                fontFamily: "outfit-medium",
                textAlign: "center",
                marginTop: 3,
              }}>
              {item?.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
