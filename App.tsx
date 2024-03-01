import { UserProvider } from "./src/contexts/AccountContext";
import { useState, useEffect } from "react";
import RootNavigation from "./src/navigation";
import * as Location from "expo-location";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserProfile from "./src/Screens/user-profile";
import { StripeProvider } from '@stripe/stripe-react-native';
import { Alert } from "react-native";
import Constants from 'expo-constants'

const Stack = createNativeStackNavigator();

export default function App() {
  const [location, setLocation] = useState({});
  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Please grant location permission");
        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    };
    getPermissions();
  }, []);


  return (
    <StripeProvider
    publishableKey={Constants.expoConfig?.extra?.stripe}
    urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    merchantIdentifier="merchant.com.{{JavaRewards}}" // required for Apple Pay
  >
    <UserProvider>
      <RootNavigation />
    </UserProvider>
    </StripeProvider>
  );
}

