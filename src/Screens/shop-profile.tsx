import { StyleSheet, ImageBackground, Image,} from "react-native"
import { Button, View, Text } from "react-native-ui-lib"
import Map from "./Map"
import Navbar from "./Nav"
import { useEffect, useState } from "react"
import axios from 'axios';

export default function Shopprofile() {
    const [shop, setShop] = useState()

    const email = {
        email: 'mancunianbrew@example.com'
    }

    useEffect(() => {
        axios.get(`http://192.168.100.47:5050/shops`).then((res) => {
            console.log(res.data)
            setShop(res.data)
        })
    }, [])

    return <View style={styles.root}>
    <Text  text30BO color={'#bf6240'}> Shop Name </Text> 
     <Image src='' />
     <Text> About us</Text>
     <Text>Lorum Ipsum eowfnhe2</Text>
     <Map/>
     <Text > Reviews</Text>
     <Button size={Button.sizes.large} backgroundColor={'#bf6240'} text60BO label='Order Now'></Button> 

    </View>
    
}


const styles = StyleSheet.create({
    root: { flex: 1, width: '100%',  justifyContent: "space-evenly", alignItems: 'center'},
    
   


    // container: {
    //   flex: 1,
    //   alignItems: "center",
    
    // },
    // image: {
    //   opacity: .2
    // }
  })
  