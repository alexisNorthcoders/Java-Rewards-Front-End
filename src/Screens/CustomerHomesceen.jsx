import { View, Text, Button } from "react-native"
import { auth } from "../config/firebase"

export default function CustomerHomeScreen() {
  return (
    <View>
      <Text>This will be customer home page.</Text>
      <Button title="Sign Out"onPress={() => {auth.signOut()}}>Sign Out</Button>
    </View>
  )
}