import { View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Homepage from "./home-page";
import Login from "./login";
import IndividualShop from "./IndividualShop";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import QrcodeScan from "./CodeScanner";

const Tab = createBottomTabNavigator();

export default function NavBusiness() {
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
    <NavigationContainer>
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name={"Home"}
          component={Homepage}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 20,
                  }}>
                  <Entypo
                    name="home"
                    size={24}
                    color={focused ? "#16247d" : "#111"}
                  />
                  <Text style={{ fontSize: 12, color: "#16247d" }}>ORDERS</Text>
                </View>
              );
            },
          }}
        />
        <Tab.Screen
          name={"Qrcode scanner"}
          component={QrcodeScan}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    paddingTop: 20,
                  }}>
                  <Feather
                    name="camera"
                    size={24}
                    color={focused ? "#16247d" : "#111"}
                  />
                  <Text style={{ fontSize: 12, color: "#16247d" }}>CAMERA</Text>
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
                  }}>
                  <AntDesign
                    name="profile"
                    size={24}
                    color={focused ? "#16247d" : "#111"}
                  />
                  <Text style={{ fontSize: 12, color: "#16247d" }}>
                    PROFILE
                  </Text>
                </View>
              );
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
