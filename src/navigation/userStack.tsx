import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessProfile from "../Screens/business-profile";
const Stack = createStackNavigator();

export default function UserStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Business Profile" component={BusinessProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}