import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Button,
} from "react-native";
import { useState, useEffect} from "react";
import { addMenuItem, getMenu } from "../../utils/api";
import { useNavigation } from '@react-navigation/native';
import { getUserEmail } from "../../utils/rememberUserType";
import { SafeAreaView } from "react-native-safe-area-context";
import { getMenuByEmail } from "../../utils/feedapi";

export default function UpdateMenu({route}) {
  const navigation = useNavigation()

  const [email, setEmail] = useState("")
  const [newMenuItem, setNewMenuItem] = useState({
    item: "",
    cost: "",
    description: "",
    item_img: ""
  })
  const {menu} = route.params

  interface updateMenuState{
    menu: [
      item: string,
      cost: number,
      description: string,
      item_img: string
    ]
  }

  useEffect(() => {
    const fetchEmailFromStorage = async () => {
      try {
        const {email} = await getUserEmail()
        setEmail(email)
        
      }
      catch (err) {
  
        console.log("Error fetching account email")
      }
  }
  fetchEmailFromStorage()
    
}, [])

  return (
    <SafeAreaView style={styles.form}>
      <Text>Menu</Text>
       <TextInput
       style={styles.input}
       value={newMenuItem.item}
        placeholder="Item"
        returnKeyType="next"
        onChangeText={(text) => 
          {setNewMenuItem((currItem) => {
            return {...currItem, item: text}
          })}}
      />
      <TextInput
      style={styles.input}
       value={newMenuItem.cost}
        placeholder="Cost"
        returnKeyType="next"
        onChangeText={(text) => 
          {setNewMenuItem((currItem) => {
            return {...currItem, cost: text}
          })}}
      />
      <TextInput
      style={styles.input}
       value={newMenuItem.description}
        placeholder="Description"
        returnKeyType="next"
        onChangeText={(text) => 
          {setNewMenuItem((currItem) => {
            return {...currItem, description: text}
          })}}
      />
      <TextInput
      style={styles.input}
       value={newMenuItem.item_img}
        placeholder="Image URL"
        returnKeyType="next"
        onChangeText={(text) => 
          {setNewMenuItem((currItem) => {
            return {...currItem, item_img: text}
          })}}
      />
      <Button
          title="Add Item"
          text60BO
          onPress={() => {
            addMenuItem(email, menu, newMenuItem).then(() => {
              setNewMenuItem(
                {item: "",
                cost: "",
                description: "",
                item_img: ""}
              )
              
              navigation.navigate("Nav")
            })
          }
          }
        />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#ECE1DD",
    borderRadius: 10,
    marginTop: 5,
    width: 300,
  }
}
)