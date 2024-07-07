import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
  Image,
} from "react-native";
import React, { useState } from "react";
import { Rating } from "react-native-ratings";
import { Colors } from "../../constants/Colors";
import { db } from "../../configs/FirebaseConfig";
import { useUser } from "@clerk/clerk-expo";
import { updateDoc, doc, arrayUnion } from "firebase/firestore";

export default function Reviews({ business }) {
  const [rating, setRating] = useState(4);
  const [userInput, setUserInput] = useState();
  const { user } = useUser();

  const onSubmit = async () => {
    const docRef = doc(db, "BusinessList", business?.id);
    await updateDoc(docRef, {
      reviews: arrayUnion({
        rating: rating,
        comment: userInput,
        userName: user?.fullName,
        userImage: user?.imageUrl,
        userEmail: user?.primaryEmailAddress?.emailAddress,
      }),
    });

    ToastAndroid.show("Comment added successfully!", ToastAndroid.BOTTOM);
    // setUserInput();
  };

  return (
    <View
      style={{
        padding: 20,
        backgroundColor: "#fff",
      }}>
      <Text
        style={{
          fontFamily: "outfit-bold",
          fontSize: 20,
          marginBottom: 10,
        }}>
        Reviews
      </Text>

      <View>
        <Rating
          showRating={false}
          imageSize={20}
          onFinishRating={(rating) => setRating(rating)}
          style={{ paddingVertical: 10 }}
        />

        <View>
          <TextInput
            placeholder="Write your comment..."
            numberOfLines={4}
            onChangeText={(value) => setUserInput(value)}
            oncg
            style={{
              borderWidth: 1,
              borderRadius: 5,
              borderBlockColor: Colors.GRAY,
              textAlignVertical: "top",
            }}
          />
          <TouchableOpacity disabled={!userInput} onPress={() => onSubmit()}>
            <Text
              style={{
                fontFamily: "outfit-regular",
                backgroundColor: Colors.PRIMARY,
                color: "#fff",
                textAlign: "center",
                padding: 10,
                marginTop: 10,
                borderRadius: 5,
              }}>
              Submit
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* Display previous reviews */}
      <View>
        {business?.reviews?.map((item, index) => (
          <View
            key={index}
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 10,
              marginTop: 10,
              alignItems: "center",
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: Colors.GRAY,
              borderRadius: 5,
            }}>
            <Image
              source={{ uri: item.userImage }}
              style={{
                width: 50,
                height: 50,
                borderRadius: 100,
              }}
            />
            <View
              style={{
                display: "flex",
                gap: 5,
              }}>
              <Text style={{ color: Colors.GRAY, fontFamily: "outfit-medium" }}>
                {item.userName}
              </Text>
              <Rating
                imageSize={20}
                ratingCount={item.rating}
                style={{
                  alignItems: "flex-start",
                }}
              />
              <Text
                style={{
                  fontFamily: "outfit-regular",
                  // textAlign: "center",
                  // alignContent: "center",
                }}>
                {item.comment}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
