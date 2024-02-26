import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NavBusiness from "../Screens/NavBusiness";
import UpdateBusinessProfile from "../Screens/UpdateBusinessProfile";

const Stack = createStackNavigator();

export default function BusinessStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Nav" component={NavBusiness}/>
      <Stack.Screen name="UpdateProfile" component={UpdateBusinessProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}