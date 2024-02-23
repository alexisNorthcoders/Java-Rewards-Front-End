import { UserProvider } from "./src/contexts/AccountContext";
import { useState, useEffect } from "react";
import RootNavigation from "./src/navigation";
import * as Location from "expo-location";
import "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
    <UserProvider>
      <RootNavigation />
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
