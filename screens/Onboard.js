// Stillsätta knapparna : https://reactnative.dev/docs/touchableopacity
// LOTTIE : https://docs.expo.dev/versions/latest/sdk/lottie/
// SWIPER : https://www.npmjs.com/package/react-native-onboarding-swiper

import { React, useRef } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import LottieView from "lottie-react-native";
import { useNavigation } from "@react-navigation/native";

export default function Board() {
  const navigation = useNavigation();
  const handleDone = () => {
    navigation.navigate("CATOPIA");
  };

  const animation = useRef(); //Lottie
  //Anpassar knapparna
  const Skip = ({ ...props }) => (
    <TouchableOpacity
      {...props}
      style={[styles.button, { backgroundColor: "#1C2B63" }]}>
      <Text style={styles.buttonText}>Skip</Text>
    </TouchableOpacity>
  );
  const Next = ({ ...props }) => (
    <TouchableOpacity {...props} style={styles.button}>
      <Text style={styles.buttonText}>Next</Text>
    </TouchableOpacity>
  );
  const Done = ({ ...props }) => (
    <TouchableOpacity {...props} style={styles.button}>
      <Text style={styles.buttonText}>Done</Text>
    </TouchableOpacity>
  );

  return (
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        SkipButtonComponent={Skip}
        NextButtonComponent={Next}
        DoneButtonComponent={Done}
        titleStyles={styles.title}
        subTitleStyles={styles.subtitle}
        pages={[
          {
            backgroundColor: "#f5f5f5",
            image: (
              <LottieView
                style={styles.lottie}
                source={require("../assets/animations/confetti.json")}
                autoPlay
                loop
                ref={animation}
              />
            ),
            title: "Welcome!",
            subtitle: "Explore the world of cats with Catopia!",
          },
          {
            backgroundColor: "#f5f5f5",
            image: (
              <LottieView
                style={styles.lottie}
                source={require("../assets/animations/cat.json")}
                autoPlay
                loop
                ref={animation}
              />
            ),
            title: "Discover Cats",
            subtitle:
              "Browse beautiful cat images and learn about different cat breeds.",
          },
          {
            backgroundColor: "#f5f5f5",

            image: (
              <LottieView
                style={styles.lottie}
                source={require("../assets/animations/cat-box.json")}
                autoPlay
                loop
                ref={animation}
              />
            ),
            title: "Let's Get Started!",
            subtitle: "Your favorite cats are waiting for you. Loading meow...",
          },
        ]}
      />
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 300,
    height: 250,
  },
  subtitle: {
    fontSize: 24,
    fontFamily: "PatrickHand-Regular",
    marginBottom: 200,
  },
  title: {
    fontSize: 60,
    color: "#1C2B63",
    fontFamily: "PatrickHand-Regular",
  },
  buttonText: {
    color: "#f5f5f5",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "PatrickHand-Regular",
  },
  button: {
    backgroundColor: "#FB8A21",
    borderRadius: 20,
    width: 90,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    margin: 15,
  },
});
