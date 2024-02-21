import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Screens/login';
import Homepage from './src/Screens/home-page';
import Constants from 'expo-constants';
import BusinessProfile from './src/Screens/business-profile';
import CreateAccount from './src/Screens/create-account';
import Shopprofile from './src/Screens/shop-profile';
import Navigation from './src/Screens/Nav';
import { createNativeStackNavigator } from '@react-navigation/native-stack'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
            <Stack.Screen name='Home' component={Homepage}></Stack.Screen>
            <Stack.Screen name='Login' component={Login}></Stack.Screen>
        </Stack.Navigator>
    </NavigationContainer>
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
