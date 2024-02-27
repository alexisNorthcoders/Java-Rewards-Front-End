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
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react'
import { updateShopData } from '../../utils/api';
import { useNavigation } from '@react-navigation/native';
import { getUserEmail } from "../../utils/rememberUserType";
import { getOffersByEmail } from "../../utils/feedapi";
import { updateOffer } from "../../utils/feedapi";



const UpdateOffers = ({route}) => {
    const navigation = useNavigation()
    const [email, setEmail] = useState("")
    const [newOffer, setNewOffer] = useState({
        img: "",
        description: "",
        date: ""
    })
    const{offers} = route.params

    interface updateOffersState{
        offers: {
            img: string,
            description: string,
            date: Date
        }
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

    return(
        <SafeAreaView style={styles.form}>
      <Text>This is the update offers page:</Text>
      <TextInput
       style={styles.input}
       value={newOffer.img}
        placeholder="Image"
        returnKeyType="next"
        onChangeText={(text) => 
          {setNewOffer((currItem) => {
            return {...currItem, img: text}
          })}}
      />
       <TextInput
       style={styles.input}
       value={newOffer.description}
        placeholder="Offer Description"
        returnKeyType="next"
        onChangeText={(text) => 
          {setNewOffer((currItem) => {
            return {...currItem, description: text}
          })}}
      />
      <TextInput
       style={styles.input}
       value={newOffer.date}
        placeholder="Date"
        returnKeyType="next"
        onChangeText={(text) => 
          {setNewOffer((currItem) => {
            return {...currItem, date: text}
          })}}
      />
      <Button title="Add Offer"
      text60B0
      onPress={() => {
        updateOffer(email, newOffer).then(() => {
            console.log("in then block")
            navigation.navigate("Nav")
        })
        .catch((err) => {
            console.log(err)
        })
      }}
      />
        </SafeAreaView>
    )
}
export default UpdateOffers

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