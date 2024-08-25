// REACT PAPER :https://callstack.github.io/react-native-paper/docs/guides/getting-started/
// API Doc :https://developers.thecatapi.com
// IOS ActionSheet : https://reactnative.dev/docs/actionsheetios
import { Card } from "react-native-paper";
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ActionSheetIOS,
  Alert,
} from "react-native";
import CatImage from "./CatImages";

export default function CatCard({ item }) {
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
      <CatImage
        referenceImageId={item.reference_image_id}
        style={styles.image}
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
        {/* LINK */}
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
}
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
CatCard.propTypes = {
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
  cards: {
    flex: 1,
    backgroundColor: "#E3F2FD",
    margin: 10,
  },
  image: {
    width: 384,
    height: 300,
    marginVertical: 5,
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
