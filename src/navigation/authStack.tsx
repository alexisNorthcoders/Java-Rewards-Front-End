import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../Screens/login";
import Homepage from "../Screens/IntroPage";
import CreateAccountCustomer from "../Screens/create-account-customer";
import CreateAccountBusiness from "../Screens/create-account-business";

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }}>
        {<Stack.Screen name="Home" component={Homepage}></Stack.Screen>}
        <Stack.Screen name="Login" component={Login}></Stack.Screen>
        <Stack.Screen
          name="CreateAccCustomer"
          component={CreateAccountCustomer}
        ></Stack.Screen>
        <Stack.Screen
          name="CreateAccBusiness"
          component={CreateAccountBusiness}
        ></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
