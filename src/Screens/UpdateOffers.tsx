import {
    Text,
    TextInput,
    StyleSheet,
  } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native';
import { getUserEmail } from "../../utils/rememberUserType";
import { updateOffer } from "../../utils/feedapi";
import { Button, Card } from "@rneui/themed";



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
        <Card containerStyle={styles.card}>
          <Card.Title style={styles.title}>Update your business offer</Card.Title>
          <Card.Divider color='#fff'/>
          <TextInput
          style={styles.input}
          value={newOffer.img}
            placeholder="Image URL"
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
          multiline={true}
          />
          <TextInput
          style={styles.input}
          value={newOffer.date}
            placeholder="Expiry Date e.g. 01/06/2024"
            returnKeyType="next"
            onChangeText={(text) => 
              {setNewOffer((currItem) => {
                return {...currItem, date: text}
              })}}
          />
          <Button title="Update"
          raised={true}
          titleStyle={{color: "#bf6420"}}
          buttonStyle={{
            backgroundColor: '#fff',
            borderRadius: 3,
          }}
          containerStyle={{
            width: 150,
            marginHorizontal: 80,
            marginVertical: 20,
          }}
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

        </Card>
      </SafeAreaView>
    )
}
export default UpdateOffers

const styles = StyleSheet.create({
    form: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: "#f5ece4"
    },
    input: {
      paddingHorizontal: 15,
      paddingVertical: 10,
      backgroundColor: "#fff",
      borderRadius: 10,
      marginTop: 5,
      width: 300,
      borderColor: "brown",
    borderWidth: 1,
    },
    card: {
      borderRadius: 8,
      backgroundColor: "#bf6240"
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center'
    },
  }
  )