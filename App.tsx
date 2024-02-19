import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text} from 'react-native';
import Login from './src/Screens/login';
import {
  SafeAreaView
} from 'react-native-safe-area-context';
import Constants from 'expo-constants';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <Login />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight
  },
});
