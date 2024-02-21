import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Login from "./src/Screens/login";
import Homepage from "./src/Screens/home-page";
import Constants from "expo-constants";
import BusinessProfile from "./src/Screens/business-profile";
import Shopprofile from "./src/Screens/shop-profile";
import Navigation from "./src/Screens/Nav";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccountCustomer from "./src/Screens/create-account-customer";
import {
  UserProvider
} from "./src/contexts/AccountContext";
import { useState } from "react";
import CreateAccountBusiness from "./src/Screens/create-account-business";
import { auth } from "./src/config/firebase";
import RootNavigation from "./src/navigation";

const Stack = createNativeStackNavigator();


export default function App() {
  return (
    <UserProvider>
      <RootNavigation/>
    </UserProvider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: Constants.statusBarHeight
//   },
// });
