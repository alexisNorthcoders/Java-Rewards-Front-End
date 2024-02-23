import QRCode from "react-qr-code"
import { StyleSheet, View, Text} from 'react-native';
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getUserEmail } from "../../utils/rememberUserType";

export default function QRCodePage() {
  const [email, setEmail] = useState("")


  useEffect(() => {
    
    const fetchEmailFromStorage = async () => {
      try {
        const {email} = await getUserEmail()
        console.log(email)
        setEmail(email)
        
      }
      catch (err) {
  
        console.log("Error fetching account email")
      }

      
  }
  fetchEmailFromStorage()
}, [])
  

  const navigation = useNavigation();
  function handleBackBtn() {
    navigation.navigate('UserProfile')
  }
  return (
    <View style={styles.fixToText}>
    <Text onPress={handleBackBtn}>Back to Profile</Text>
    <QRCode value={email}/>
    </View>
  )
}
const styles = StyleSheet.create({
  fixToText: {
    flexDirection: 'column',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
});