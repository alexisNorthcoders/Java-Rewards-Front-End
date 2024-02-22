import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import BusinessProfile from "../Screens/business-profile";
import CustomerHomeScreen from "../Screens/CustomerHomesceen";
import NavUser from "../Screens/NavUser";
import QrcodeScan from "../Screens/CodeScanner";
const Stack = createStackNavigator();

export default function UserStack() {

  return (
    <NavigationContainer>
      <Stack.Navigator>

        
        <Stack.Screen name="Nav" component={NavUser}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
