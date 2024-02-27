import { View, Text, SafeAreaView } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IndividualShop from "./IndividualShop";
import { Entypo, AntDesign, MaterialIcons } from "@expo/vector-icons";
import CustomerHomeScreen from "./CustomerHomesceen";
import QRCodePage from "./QRCodePage";
import UserProfile from "./user-profile";
import Menu from "../Components/Menu";
import Feed from "../Components/Feed";
import { SafeAreaSpacerView } from "react-native-ui-lib";

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
                  marginLeft: 20,
                  marginRight: -10

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
        name={"Menu"}
        component={Menu}
        listeners={{
          tabPress: e => {
            e.preventDefault();
          }}
        }
        options={{
          tabBarIconStyle: { display: "none" },
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
                  marginLeft: -35
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
        name={"Feed"}
        component={Feed}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 20,
                  marginRight: -35
                }}
              >
                <MaterialIcons name="local-offer" size={24} color="black" />
                <Text style={{ fontSize: 12, color: "#16247d" }}>OFFERS</Text>
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name={"IndividualShop"}
        component={IndividualShop}
        options={{
          tabBarIconStyle: { display: "none" },
        }}
        listeners={{
          tabPress: e => {
            e.preventDefault();
          }}
        }
      />
      <Tab.Screen
        name={"Profile"}
        component={UserProfile}
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={{
                  alignItems: "center",
                  justifyContent: "center",
                  paddingTop: 20,
                  marginRight: 20,
                  marginLeft: -10
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
  );
}
