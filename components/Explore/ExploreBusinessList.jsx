import { View, Text, FlatList, ScrollView } from "react-native";
import React from "react";
import BusinessListCard from "./BusinessListCard";

export default function ExploreBusinessList({ businesslist }) {
  return (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        scrollEnabled
        data={businesslist}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <BusinessListCard business={item} />}
      />
      <View style={{ height: 100 }}></View>
    </View>
  );
}
