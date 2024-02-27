import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import NavBusiness from "../Screens/NavBusiness";
import UpdateBusinessProfile from "../Screens/UpdateBusinessProfile";
import UpdateMenu from "../Screens/UpdateMenu";
import UpdateOffers from "../Screens/UpdateOffers";

const Stack = createStackNavigator();

export default function BusinessStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Nav" component={NavBusiness}/>
      <Stack.Screen name="UpdateProfile" component={UpdateBusinessProfile} />
      <Stack.Screen name="updateMenu" component={UpdateMenu} />
      <Stack.Screen name="updateOffers" component={UpdateOffers} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}