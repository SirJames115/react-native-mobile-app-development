import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ToastAndroid,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "expo-router";
import { Colors } from "../../constants/Colors";
import * as ImagePicker from "expo-image-picker";
import { Picker } from "@react-native-picker/picker";
import { query } from "firebase/database";
import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db, storage } from "./../../configs/FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useUser } from "@clerk/clerk-expo";

export default function AddBusiness() {
  const { user } = useUser();
  const navigation = useNavigation();
  const [image, setImage] = useState(null);
  const [selectedValue, setSelectedValue] = useState("");
  const [categoryList, setCategoryList] = useState([]);

  const [name, setName] = useState();
  const [address, setAddress] = useState();
  const [contact, setContact] = useState();
  const [website, setWebsite] = useState();
  const [about, setAbout] = useState();
  const [category, setCategory] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: "Add New Business",
      headerShown: true,
    });

    GetCategoryList();
  }, []);

  const onImagePick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,

      quality: 1,
    });
    setImage(result?.assets[0].uri);
    console.log(result);
  };

  const GetCategoryList = async () => {
    setCategoryList([]);
    const q = query(collection(db, "Category"));
    const snapShot = await getDocs(q);
    const categories = [];
    snapShot.forEach((doc) => {
      console.log(doc.data());

      categories.push({ label: doc.data().name, value: doc.data().name });
    });
    // console.log("Category List:", categories); // Debugging log
    setCategoryList(categories);
  };

  const onAddNewBusiness = async () => {
    setLoading(true);
    const fileName = Date.now().toString() + ".jpg";
    const res = await fetch(image);
    const blob = await res.blob();

    const imageRef = ref(storage, "business-app/" + fileName);

    uploadBytes(imageRef, blob)
      .then((snapshot) => {
        console.log("File Uploaded...");
      })
      .then((res) => {
        getDownloadURL(imageRef).then(async (downloadUrl) => {
          console.log("Download URL: ", downloadUrl);
          saveBusinessDetail(downloadUrl);
        });
      });
    setLoading(false);
  };

  const saveBusinessDetail = async (imageUrl) => {
    await setDoc(doc(db, "BusinessList", Date.now().toString()), {
      name: name,
      address: address,
      contact: contact,
      about: about,
      website: website,
      category: category,
      username: user?.fullName,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userImage: user?.imageUrl,
      imageUrl: imageUrl,
    });

    setLoading(false);

    ToastAndroid.show("New business addedd...", ToastAndroid.LONG);
  };

  // const onAddNewBusiness = async () => {
  //   try {
  //     const fileName = Date.now().toString() + ".jpg";
  //     const res = await fetch(image);
  //     const blob = await res.blob();

  //     const imageRef = ref(storage, "business-app/" + fileName);

  //     await uploadBytes(imageRef, blob);
  //     console.log("File Uploaded...");

  //     const dowloadUrl = getDownloadURL(imageRef);
  //     console.log("Download URL: ", dowloadUrl);
  //   } catch (error) {
  //     console.error("Error uploading file:", error);
  //   }
  // };

  return (
    <ScrollView
      style={{
        padding: 20,
      }}>
      <Text style={{ fontFamily: "outfit-bold", fontSize: 25 }}>
        Add New Business
      </Text>
      <Text
        style={{
          fontFamily: "outfit-regular",
        }}>
        Fill all details in order th add new business
      </Text>
      <TouchableOpacity onPress={() => onImagePick()}>
        {!image ? (
          <Image
            source={require("./../../assets/images/image_icon.png")}
            style={{ width: 100, height: 100 }}
          />
        ) : (
          <Image
            source={{ uri: image }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 10,
            }}
          />
        )}
      </TouchableOpacity>

      <View>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => setName(value)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            borderRadius: 10,
            fontFamily: "outfit-regular",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        />
        <TextInput
          placeholder="address"
          onChangeText={(value) => setAddress(value)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            borderRadius: 10,
            fontFamily: "outfit-regular",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        />
        <TextInput
          placeholder="Contact"
          onChangeText={(value) => setContact(value)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            borderRadius: 10,
            fontFamily: "outfit-regular",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        />
        <TextInput
          placeholder="Website"
          onChangeText={(value) => setWebsite(value)}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            borderRadius: 10,
            fontFamily: "outfit-regular",
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        />
        <TextInput
          placeholder="About"
          onChangeText={(value) => setAbout(value)}
          multiline
          numberOfLines={3}
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: Colors.PRIMARY,
            borderRadius: 10,
            fontFamily: "outfit-regular",
            backgroundColor: "#fff",
            marginTop: 10,
            height: 100,
          }}
        />
        <View>
          <View
            style={{
              padding: 10,
              backgroundColor: "#fff",
              borderWidth: 1,
              borderColor: Colors.PRIMARY,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Text
              style={{
                fontFamily: "outfit-regular",
                color: Colors.GRAY,
              }}>
              Select category
            </Text>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(value) => setCategory(value)}
              style={{
                height: 50,
                width: "100%",
                borderWidth: 1,
                borderColor: Colors.PRIMARY,
              }}>
              {categoryList.map((category) => (
                <Picker.Item
                  style={{}}
                  key={category.value}
                  label={category.label}
                  value={category.value}
                />
              ))}
            </Picker>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={{
          padding: 15,
          backgroundColor: Colors.PRIMARY,
          borderRadius: 10,
          borderWidth: 1,
          borderColor: Colors.PRIMARY,
          marginTop: 10,
          marginBottom: "30%",
        }}
        onPress={() => onAddNewBusiness()}
        disabled={loading}>
        {loading ? (
          <ActivityIndicator size={"large"} color={"#fff"} />
        ) : (
          <Text
            style={{
              fontFamily: "outfit-medium",
              color: Colors.WHITE,
              textAlign: "center",
              textTransform: "uppercase",
            }}>
            Add New Business
          </Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
}
