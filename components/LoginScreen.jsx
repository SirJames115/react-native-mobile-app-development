import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Linking from "expo-linking";
import React from "react";
import { Colors } from "@/constants/Colors";
import loginCup from "../assets/images/loginCup.jpg";
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from "./../hooks/useWarmUpBrowser";
import { useOAuth } from "@clerk/clerk-expo";

WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();

  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL("/home", { scheme: "myapp" }),
        });

      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }, []);

  return (
    <View>
      <View
        style={{
          display: "flex",
          alignItems: "center",
          marginTop: 50,
        }}>
        <Image
          source={loginCup}
          style={{
            width: 220,
            height: 450,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: "purple",
          }}
        />
      </View>

      <View style={styles.subContainer}>
        <Text
          style={{
            fontSize: 25,
            fontFamily: "outfit-bold",
            textAlign: "center",
          }}>
          Your Very Ultimate{" "}
          <Text style={{ color: Colors.PRIMARY }}>
            {" "}
            Community Business Directory{"'"}s
          </Text>{" "}
          App
        </Text>
        <Text
          style={{
            fontSize: 15,
            textAlign: "center",
            marginVertical: 10,
            fontFamily: "outfit-regular",
            color: Colors.GRAY,
          }}>
          Find your favorite busines near you and push your own business to your
          Community
        </Text>
        <TouchableOpacity style={styles.btn} onPress={onPress}>
          <Text
            style={{
              color: Colors.WHITE,
              textAlign: "center",
              fontFamily: "outfit-regular",
            }}>
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    backgroundColor: "#fff",
    padding: 20,
    marginTop: -20,
    elevation: 7,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    paddingVertical: 16,
    borderRadius: 100,
    marginBottom: 50,
  },
});
