// API Doc :https://developers.thecatapi.com
// IOS ActionSheet : https://reactnative.dev/docs/actionsheetios

import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import CatCard from "../components/CatCard";

export default function AboutCat({ route }) {
  // console.log(route);
  // console.log(route.params);
  const { catName } = route.params;

  const navigation = useNavigation();
  const backExplore = () => {
    navigation.navigate("Explore");
  };

  const [filteredCat, setFilteredCat] = useState(null);
  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((result) => {
        const foundCat = result.find(
          (cat) => cat.name.toLowerCase() === catName.toLowerCase()
        );
        setFilteredCat(foundCat);
      });
  }, [catName]);

  if (!filteredCat) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator color='#FB8A21' size='large' />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Card */}
      <View style={styles.cardContainer}>
        <FlatList
          data={[filteredCat]}
          renderItem={({ item }) => <CatCard item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={backExplore}>
        <Text style={styles.buttonText}>Back to the list</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
// PropTypes
AboutCat.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      catName: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    margin: 5,
  },
  buttonText: {
    color: "#f5f5f5",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "PatrickHand-Regular",
  },
  button: {
    backgroundColor: "#1C2B63",
    borderRadius: 20,
    width: 180,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 5,
  },
});
