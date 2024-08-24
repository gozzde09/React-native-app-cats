// REACT PAPER :https://callstack.github.io/react-native-paper/docs/guides/getting-started/
// API Doc :https://developers.thecatapi.com
// IOS ActionSheet : https://reactnative.dev/docs/actionsheetios
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
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
  Linking,
  ActionSheetIOS,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function AboutCat({ route }) {
  // console.log(route);
  // console.log(route.params);
  const navigation = useNavigation();
  const backExplore = () => {
    navigation.navigate("Explore");
  };
  const { catName } = route.params;
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
          renderItem={({ item }) => <Cards item={item} />}
          keyExtractor={(item) => item.id}
        />
      </View>
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
const Cards = ({ item }) => {
  // ActionSheetIOS
  const handlePress = () => {
    const url = item.wikipedia_url;
    ActionSheetIOS.showActionSheetWithOptions(
      {
        options: ["Cancel", "Open in Browser"],
        cancelButtonIndex: 0,
        destructiveButtonIndex: 1,
        title: "Open Link",
        message: "Do you want to open the link in your browser?",
      },
      (buttonIndex) => {
        if (buttonIndex === 1) {
          Linking.canOpenURL(url)
            .then((supported) => {
              if (supported) {
                return Linking.openURL(url);
              } else {
                Alert.alert("Error", "Can't handle URL");
              }
            })
            .catch((err) => console.error("An error occurred", err));
        }
      }
    );
  };
  return (
    <Card style={styles.cards}>
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
        <Text style={styles.infoText} variant='bodyMedium'>
          {item.description}
        </Text>
        <TouchableOpacity onPress={handlePress} style={styles.touchable}>
          <Text style={[styles.link, styles.linkActive]}>
            {item.wikipedia_url}
          </Text>
        </TouchableOpacity>
        <Text style={styles.infoText}>
          Adaptability: {renderStars(item.adaptability)}
        </Text>
        <Text style={styles.infoText}>
          Affection Level: {renderStars(item.affection_level)}
        </Text>
        <Text style={styles.infoText}>
          Child Friendly: {renderStars(item.child_friendly)}
        </Text>
        <Text style={styles.infoText}>
          Dog Friendly: {renderStars(item.dog_friendly)}
        </Text>
        <Text style={styles.infoText}>
          Energy Level: {renderStars(item.energy_level)}
        </Text>
        <Text style={styles.infoText}>
          Grooming: {renderStars(item.grooming)}
        </Text>
        <Text style={styles.infoText}>
          Health Issues: {renderStars(item.health_issues)}
        </Text>
        <Text style={styles.infoText}>
          Intelligence: {renderStars(item.intelligence)}
        </Text>
        <Text style={styles.infoText}>
          Shedding Level: {renderStars(item.shedding_level)}
        </Text>
        <Text style={styles.infoText}>
          Social Needs: {renderStars(item.social_needs)}
        </Text>
        <Text style={styles.infoText}>
          Stranger Friendly: {renderStars(item.stranger_friendly)}
        </Text>
      </Card.Content>
    </Card>
  );
};
const renderStars = (rating) => {
  let stars = [];
  for (let i = 1; i <= 5; i++) {
    stars.push(
      <Icon
        key={i}
        name={i <= rating ? "star" : "star-o"}
        size={20}
        color={i <= rating ? "#FB8A21" : "#d3d3d3"}
      />
    );
  }
  return <View style={styles.starsContainer}>{stars}</View>;
};
// PropTypes
Cards.propTypes = {
  item: PropTypes.shape({
    wikipedia_url: PropTypes.string,
    reference_image_id: PropTypes.string,
    name: PropTypes.string,
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
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText: {
    fontSize: 20,
    color: "#333",
    fontFamily: "PatrickHand-Regular",
  },
  link: {
    fontSize: 20,
    textDecorationLine: "underline",
    color: "#FB8A21",
    fontFamily: "PatrickHand-Regular",
  },
  linkActive: {
    color: "#FB8A21",
  },
  cardContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f5f5f5",
    margin: 5,
  },
  cards: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    margin: 10,
  },
  image: {
    width: 300,
    height: 300,
    marginHorizontal: 40,
    marginVertical: 5,
  },
  starsContainer: {
    flexDirection: "row",
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
