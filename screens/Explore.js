// REACT PAPER :https://callstack.github.io/react-native-paper/docs/guides/getting-started/
// API Doc :https://developers.thecatapi.com
import { Card } from "react-native-paper";
import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function ExploreScreen() {
  const [allCats, setAllCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((result) => {
        //  console.log(result);
        // console.log(result.length);
        setAllCats(result);
        setFilteredCats(result);
        setIsLoading(false);
      });
  }, []);
  const filterCats = () => {
    setIsLoading(true);
    Keyboard.dismiss(); // Klavyeyi kapat

    if (selectedBreed.trim() === "") {
      // Ladda om listan
      setFilteredCats(allCats);
    } else {
      const filtered = allCats.filter((cat) =>
        cat.name.toLowerCase().includes(selectedBreed.toLowerCase())
      );
      setFilteredCats(filtered);
    }
    setSelectedBreed("");
    setIsLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* SÖK och FILTER FUNKTION */}
      <View style={styles.searchContainer}>
        <View style={styles.rowContainer}>
          <TextInput
            style={styles.input}
            placeholder='Enter breed name'
            value={selectedBreed}
            onChangeText={(text) => {
              setSelectedBreed(text);
              if (text === "") {
                setFilteredCats(allCats);
              }
            }}
            onSubmitEditing={filterCats} //Submit med tangentbord
          />
          <Text style={styles.resultText}>
            {filteredCats.length} result{filteredCats.length !== 1 ? "s" : ""}
            {/* 'result' or 'resultS' :) */}
          </Text>
        </View>
        <TouchableOpacity
          style={[styles.button, { marginTop: 0 }]}
          onPress={filterCats}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color='#FB8A21' size='large' />
          </View>
        )}
        {!isLoading && filteredCats.length === 0 && (
          <Text style={styles.noResultsText}>
            {" "}
            No cats found. Please try a different breed or check your spelling.
          </Text>
        )}
        {!isLoading && filteredCats.length > 0 && (
          <FlatList
            data={filteredCats}
            renderItem={({ item }) => <Cards item={item} />}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
const Cards = ({ item }) => {
  const navigation = useNavigation();
  return (
    <Card style={styles.cards}>
      <View style={styles.rowContainer}>
        <Card.Cover
          style={styles.image}
          source={{
            uri: `https://cdn2.thecatapi.com/images/${item.reference_image_id}.jpg`,
          }}
        />
        <Card.Content>
          <Text style={styles.infoText} variant='titleLarge'>
            Name: {item.name}
          </Text>
          <Text style={styles.infoText} variant='titleLarge'>
            Origin: {item.origin}
          </Text>
          <Text style={styles.infoText} variant='titleLarge'>
            Life Span: {item.life_span} years
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
};
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
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    alignItems: "center",
    justifyContent: "center",
  },
  searchContainer: {
    flex: 1,
    backgroundColor: "#ededed",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 0,
    width: "100%",
    zIndex: 2,
  },
  rowContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
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
  input: {
    height: 40,
    width: 300,
    fontSize: 20,
    backgroundColor: "#f5f5f5",
    borderColor: "#1C2B63",
    borderWidth: 2,
    borderRadius: 20,
    margin: 20,
    padding: 10,
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
    borderRadius: 15,
    width: 100,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },
  resultText: {
    color: "#1C2B63",
    fontFamily: "PatrickHand-Regular",
    fontSize: 18,
    marginRight: 20,
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
    marginTop: 140,
    marginBottom: 70,
  },
  cards: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    margin: 10,
  },
  image: {
    width: 150,
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
