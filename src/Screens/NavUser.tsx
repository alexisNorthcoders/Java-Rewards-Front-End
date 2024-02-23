import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "./IntroPage";
import Login from "./login";
import IndividualShop from "./IndividualShop";
import { Entypo, AntDesign } from "@expo/vector-icons";
import CustomerHomeScreen from "./CustomerHomesceen";
import QRCodePage from "./QRCodePage";
import UserProfile from "./user-profile";

const Tab = createBottomTabNavigator();

export default function NavUser() {
  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarStyle: {
      position: "absolute",
      bottom: 0,
      right: 0,
      left: 0,
      elevation: 0,
      height: 70,
      background: "#fff",
    },
  };

  return (
    // <NavigationContainer >
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name={"Home"}
        component={CustomerHomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 20,
                }}
              >
                <Entypo
                  name="home"
                  size={24}
                  color={focused ? "#16247d" : "#111"}
                />
                <Text style={{ fontSize: 12, color: "#16247d" }}>HOME</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={"QRCode"}
        component={QRCodePage}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 20,
                }}
              >
                <AntDesign
                  name="qrcode"
                  size={24}
                  color={focused ? "#16247d" : "#111"}
                />
                <Text style={{ fontSize: 12, color: "#16247d" }}>QR CODE</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={"IndividualShop"}
        component={IndividualShop}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 20,
                }}
              >
                <AntDesign
                  name="profile"
                  size={24}
                  color={focused ? "#16247d" : "#111"}
                />
                <Text style={{ fontSize: 12, color: "#16247d" }}>PROFILE</Text>
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
}
