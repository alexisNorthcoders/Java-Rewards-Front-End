import {
    Image,
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    StatusBar,
  } from "react-native";
import { auth } from "../config/firebase";
import { Button } from "@rneui/themed";
import { clearUserEmail, clearUserType, getUserEmail } from "../../utils/rememberUserType";

export const BusinessSignOutButton = () => {
    return (<Button titleStyle={{ fontWeight: "bold", fontSize: 13}}
    buttonStyle={{ backgroundColor: "#bf6240", width:80, marginTop: 6 }}
      
      onPress={() => {
        clearUserType()
        clearUserEmail()
        auth.signOut();
      }}
    >
      Sign Out
    </Button>
)}

const styles = StyleSheet.create({
    signOutButton: {
        width: 70,
        height: 70,
        marginBottom: 10,
        marginLeft: 30,
        resizeMode: "contain",
        fontWeight: "bold", 
        fontSize: 13
        
      },
})