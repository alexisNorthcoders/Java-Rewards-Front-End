import { View, Text } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Login from "./login";
import { Entypo, AntDesign, Feather } from "@expo/vector-icons";
import BusinessProfile from "./business-profile";
import IntroPage from "./IntroPage";
import QrcodeScan from "./CodeScanner";
import Feed from "../Components/Feed";
import BusinessOrders from "../Components/BusinessOrders";

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
      <Tab.Navigator screenOptions={screenOptions}>
        <Tab.Screen
          name={"Home"}
          component={BusinessOrders}
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
          name={"Profile"}
          component={BusinessProfile}
          initialParams={BusinessProfile}
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
  );
}
