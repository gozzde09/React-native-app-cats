import React from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import Karusel from "../components/Carousel";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.container}>
        <Karusel />
        <View style={styles.textContainer}>
          <Text style={styles.title}>
            Discover the Fascinating World of Cats!
          </Text>
          <Text style={styles.description}>
            Explore a diverse range of cat breeds, each with their unique
            characteristics, history, and personality traits. Whether you are a
            cat enthusiast or just curious, our collection offers a wealth of
            information about various breeds, from the playful Abyssinian to the
            elegant Maine Coon. Dive into detailed profiles, view stunning
            images, and find out which breed might be the perfect match for you.
            Start your journey now and learn more about these wonderful feline
            companions!
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    margin: 0,
  },
  textContainer: {
    flex: 1,
    margin: 10,
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    color: "#1C2B63",
    textAlign: "center",
    marginBottom: 10,
    fontFamily: "PatrickHand-Regular",
  },
  description: {
    fontSize: 20,
    color: "#333",
    fontFamily: "PatrickHand-Regular",
  },
});
