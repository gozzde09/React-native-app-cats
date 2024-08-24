import React, { useState, useEffect } from "react";
import { Image, ScrollView, StyleSheet } from "react-native";

export default function Carousel() {
  const [catImages, setCatImages] = useState([]);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/images/search?limit=5") //Hämtar 10 ändå
      .then((response) => response.json())
      .then((result) => {
        setCatImages(result.slice(0, 5));
      });
  }, []);

  return (
    <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
      {catImages.map((cat, index) => (
        <Image
          key={index}
          style={styles.image}
          source={{
            uri: cat.url,
          }}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    alignItems: "center",
    height: 280,
    backgroundColor: "#ededed",
    borderBottomWidth: 3,
    borderBottomColor: "#FB8A21",
  },
  image: {
    width: 300,
    height: 250,
    borderTopLeftRadius: 150,
    borderBottomRightRadius: 150,
    marginLeft: 2,
  },
});
