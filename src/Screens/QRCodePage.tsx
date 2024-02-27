import QRCode from "react-qr-code"
import { StyleSheet, ImageBackground, View, Text} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { getUserEmail } from "../../utils/rememberUserType";
import background from '../Images/top-view-coffee-beans-hole-center-white-background-horizontal.jpg'

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
    navigation.navigate('Profile')
  }
  return (
    <>
    <View style={styles.root}>
    <ImageBackground 
      source={background}
      style={styles.container}
      imageStyle={styles.image}
    >
      <Text>Collect your points</Text>
    <QRCode value={email}/>
    </ImageBackground>
    </View>
    </>
  )
}
const styles = StyleSheet.create({
  root: { flex: 1, width: "100%" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    opacity: 0.2,
  },
  btn: {
    display: 'flex',
    justifyContent: 'flex-start'
  }
});