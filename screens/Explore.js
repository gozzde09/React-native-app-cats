// API Doc :https://developers.thecatapi.com

import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from "react-native";
import Cards from "../components/Cards";

export default function ExploreScreen() {
  const [allCats, setAllCats] = useState([]);
  const [filteredCats, setFilteredCats] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.thecatapi.com/v1/breeds")
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        // console.log(result.length); 67
         const catsWithImages = result.filter((cat) => cat.reference_image_id);
         setAllCats(catsWithImages);
         setFilteredCats(catsWithImages);
        setIsLoading(false);
      });
  }, []);

  const filterCats = () => {
    setIsLoading(true);
    if (selectedBreed.trim() === "") {
      setFilteredCats(allCats); // Ladda om listan
    } else {
      const filtered = allCats.filter((cat) =>
        cat.name.toLowerCase().includes(selectedBreed.toLowerCase())
      );
      setFilteredCats(filtered);
    }
    setIsLoading(false);

    setTimeout(() => {
      // Stänga tangentbord
      Keyboard.dismiss();
    }, 2000);
  };

  useEffect(() => {
    //Söker input värden
    if (selectedBreed === "") {
      setFilteredCats(allCats);
    } else {
      filterCats();
    }
  }, [selectedBreed]);

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
          />
          <Text style={styles.resultText}>
            {filteredCats.length} result{filteredCats.length !== 1 ? "s" : ""}
            {/* 'result' or 'resultS' :) */}
          </Text>
        </View>
      </View>

      {/* CARDS */}
      <View style={styles.cardContainer}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator color='#FB8A21' size='large' />
          </View>
        )}
        {!isLoading && filteredCats.length === 0 && (
          <Text style={styles.noResultsText}>
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
    zIndex: 1,
  },
  resultText: {
    color: "#FB8A21",
    fontFamily: "PatrickHand-Regular",
    fontSize: 18,
    marginRight: 20,
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
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    margin: 5,
    marginVertical: 70,
  },

  noResultsText: {
    fontSize: 40,
    color: "#FB8A21",
    textAlign: "center",
    marginTop: 30,
    fontFamily: "PatrickHand-Regular",
  },
});
