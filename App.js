// BOTTOM NAVBAR https://reactnavigation.org/docs/bottom-tab-navigator/
// ICONS https://github.com/oblador/react-native-vector-icons?tab=readme-ov-file#installation
// NAV https://reactnavigation.org/docs/nesting-navigators/#nesting-multiple-navigators
// SPLASH SCREEN : https://docs.expo.dev/versions/latest/sdk/splash-screen/
import React, {useEffect,useState} from "react";
import Icon from "react-native-vector-icons/FontAwesome";
import { StatusBar } from "expo-status-bar";
import { StyleSheet,  View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";

import Home from "./screens/Home";
import Onboard from "./screens/Onboard";
import Explore from "./screens/Explore";
import Feedback from "./screens/Feedback";
import AboutCat from "./screens/AboutCat";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

SplashScreen.preventAutoHideAsync();

export default function App() {
    const [fontsLoaded] = Font.useFonts({
      "PatrickHand-Regular": require("./assets/fonts/PatrickHand-Regular.ttf"),
    });
    const [isReady, setIsReady] = useState(false);

    useEffect(() => {
      if (fontsLoaded) {
        setIsReady(true);
        SplashScreen.hideAsync(); // Hide splash screen after fonts are loaded
      }
    }, [fontsLoaded]);

    if (!isReady) {
        return console.log("Font is not ready yet!");
      }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Onboard'>
        <Stack.Screen
          name='Onboard'
          component={Onboard}
          options={{ headerShown: false }}
        />
        <Stack.Screen name='CATOPIA' component={TabNav} />
        <Stack.Screen
          name='AboutCat'
          component={AboutCat}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='BackExplore'
          component={Explore}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
      <StatusBar style='auto' />
    </NavigationContainer>
  );
}

function TabNav() {
  return (
    <>
      <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
          tabBarStyle: {
            position: "absolute",
            backgroundColor: "#ededed",
            height: 85,
          },
          tabBarIcon: ({ size, color }) => {
            let iconName;
            if (route.name === "Home") {
              iconName = "home";
            } else if (route.name === "Explore") {
              iconName = "globe";
              size = 40;
            } else if (route.name === "Feedback") {
              iconName = "envelope";
            }
            return (
              <View
                style={[
                  styles.iconContainer,
                  route.name === "Explore" && styles.exploreIconContainer,
                ]}>
                {/* Annan stil för explore */}
                <Icon name={iconName} size={size} color={color} />
              </View>
            );
          },
          tabBarLabelStyle: {
            fontSize: 20,
            fontFamily: "PatrickHand-Regular",
          },
          tabBarActiveTintColor: "#FB8A21",
          tabBarInactiveTintColor: "#1C2B63",
        })}>
        <Tab.Screen
          name='Home'
          component={Home}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name='Explore'
          component={Explore}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name='Feedback'
          component={Feedback}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </>
  );
}
const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  exploreIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    bottom: 2,
    backgroundColor: "#ededed",
  },
});
