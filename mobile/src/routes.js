import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Image, Text } from "react-native";

import logo from "../assets/logo.png";
import camera from "../assets/camera.png";

import Feed from "./pages/Feed";
import New from "./pages/New";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator();

export default function Routes() {
  return (
    <Stack.Navigator
      mode="modal"
      screenOptions={{ headerTitle: <Image source={logo}></Image>, headerTitleAlign: "center", headerBackTitle: null, headerTintColor: "#000" }}
    >
      <Stack.Screen
        name="Feed"
        component={Feed}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 20 }} onPress={() => navigation.navigate("New")}>
              <Image source={camera}></Image>
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen name="New" component={New} />
    </Stack.Navigator>
  );
}
