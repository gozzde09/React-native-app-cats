// REACT PAPER :https://callstack.github.io/react-native-paper/docs/guides/getting-started/
// API Doc :https://developers.thecatapi.com

import { Card } from "react-native-paper";
import React from "react";
import PropTypes from "prop-types";
import { View, Text,  StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import CatImage from "../components/CatImages"

export default function Cards({ item }) {
  const navigation = useNavigation();

  return (
    <Card style={styles.cards}>
      <View style={styles.rowContainer}>
        <CatImage referenceImageId={item.reference_image_id} style={styles.image} />
        <Card.Content>
          <Text style={styles.infoText} variant='titleLarge'>
            Name:{item.name}
          </Text>
          <Text style={styles.infoText} variant='titleLarge'>
            Origin:{item.origin}
          </Text>
          <Text style={styles.infoText} variant='titleLarge'>
            Life Span:{item.life_span} years
          </Text>
          <TouchableOpacity
            style={[styles.button, { backgroundColor: "#1C2B63" }]}
            onPress={() =>
              navigation.navigate("AboutCat", { catName: item.name })
            }>
            <Text style={styles.buttonText}>Read more...</Text>
          </TouchableOpacity>
        </Card.Content>
      </View>
    </Card>
  );
}
// PropTypes
Cards.propTypes = {
  item: PropTypes.shape({
    wikipedia_url: PropTypes.string,
    reference_image_id: PropTypes.string,
    name: PropTypes.string.isRequired,
    origin: PropTypes.string,
    life_span: PropTypes.string,
    description: PropTypes.string,
    adaptability: PropTypes.number,
    affection_level: PropTypes.number,
    child_friendly: PropTypes.number,
    dog_friendly: PropTypes.number,
    energy_level: PropTypes.number,
    grooming: PropTypes.number,
    health_issues: PropTypes.number,
    intelligence: PropTypes.number,
    shedding_level: PropTypes.number,
    social_needs: PropTypes.number,
    stranger_friendly: PropTypes.number,
  }).isRequired,
};
const styles = StyleSheet.create({
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  buttonText: {
    color: "#f5f5f5",
    textAlign: "center",
    fontSize: 20,
    fontFamily: "PatrickHand-Regular",
  },
  button: {
    backgroundColor: "#FB8A21",
    borderRadius: 15,
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  infoText: {
    fontSize: 20,
    color: "#333",
    fontFamily: "PatrickHand-Regular",
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    margin: 5,
    marginBottom: 70,
  },
  cards: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    margin: 10,
  },
  image: {
    width: 175,
    height: 175,
  },
  noResultsText: {
    fontSize: 40,
    color: "#FB8A21",
    textAlign: "center",
    marginTop: 30,
    fontFamily: "PatrickHand-Regular",
  },
});
