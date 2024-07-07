import { View, Text, ActivityIndicator, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";
import Intro from "../../components/BusinessDetail/Intro";
import ActionButton from "../../components/BusinessDetail/ActionButton";
import About from "../../components/BusinessDetail/About";
import Reviews from "../../components/BusinessDetail/Reviews";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function BusinessDetail() {
  const { businessid } = useLocalSearchParams();

  const [business, setBusiness] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBusinessDetailById();
  }, []);

  const getBusinessDetailById = async () => {
    setLoading(true);
    setBusiness({});
    try {
      const docRef = doc(db, "BusinessList", businessid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBusiness({ id: docSnap.id, ...docSnap.data() });
      } else {
        console.log("No such business!");
      }
    } catch (error) {
      console.error("Error fetching business details:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View>
      {/* Intro */}
      <Intro business={business} />
      {/* Action buttons */}
      <ActionButton business={business} />
      {/* Review Section */}
      <Reviews business={business} />
      {/* About section */}
      <About business={business} />
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {loading ? (
        <ActivityIndicator
          style={{ marginTop: "20%" }}
          size={"large"}
          color={Colors.PRIMARY}
        />
      ) : (
        <FlatList
          data={[]}
          ListHeaderComponent={renderHeader}
          renderItem={null}
          keyExtractor={() => "key"}
        />
      )}
    </GestureHandlerRootView>
  );
}
