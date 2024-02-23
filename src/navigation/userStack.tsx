import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessProfile from "../Screens/business-profile";
import CustomerHomeScreen from "../Screens/CustomerHomesceen";
import NavUser from "../Screens/NavUser";
import QrcodeScan from "../Screens/CodeScanner";
import Menu from "../Components/Menu";
const Stack = createStackNavigator();

export default function UserStack() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        <Stack.Screen name="Nav" component={NavUser}/>
        <Stack.Screen name="Menu" component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
