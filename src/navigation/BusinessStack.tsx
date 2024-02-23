import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessProfile from "../Screens/business-profile";
import NavBusiness from "../Screens/NavBusiness";

const Stack = createStackNavigator();

export default function BusinessStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Nav" component={NavBusiness}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}