import { UserProvider } from "./src/contexts/AccountContext";
import { useState, useEffect } from "react";
import RootNavigation from "./src/navigation";
import * as Location from "expo-location";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StripeProvider } from '@stripe/stripe-react-native';

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
    publishableKey="pk_test_51OkRuMIEw4TLc4pSBaJKzQx2JlNMxJxVs4orWx4CUWwNwf4WkNpXCS6Z0PydUSWdK32vuYBPNphYrDrBAbYh4tim00TQesbcaB"
    urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
    merchantIdentifier="merchant.com.{{JavaRewards}}" // required for Apple Pay
  >
    <UserProvider>
      <RootNavigation />
    </UserProvider>
    </StripeProvider>
  );
}

{/* <UserProvider>
      <RootNavigation/>
    </UserProvider> */}


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginTop: Constants.statusBarHeight
//   },
// });
