import { StatusBar } from 'expo-status-bar';

import { StyleSheet, Text, View } from 'react-native';
import Login from './src/Screens/login';
import Homepage from './src/Screens/home-page';
import {
  SafeAreaView
} from 'react-native-safe-area-context';
import Constants from 'expo-constants';
import BusinessProfile from './src/Screens/business-profile';
import CreateAccount from './src/Screens/create-account';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <CreateAccount/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  },
});
