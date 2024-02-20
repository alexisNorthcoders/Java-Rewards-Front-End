import { StyleSheet, ImageBackground, Image,} from "react-native"
import { Button, View, Text } from "react-native-ui-lib"
import background from '../../'
import Navbar from "./Nav"

export default function Shopprofile() { 

    return <View style={styles.root}>
    <Text  text30BO color={'#bf6240'}> Shop Name </Text> 
     <Image src='' />
     <Text> About us</Text>
     <Text>Lorum Ipsum eowfnhe2</Text>
     {/* Child componant for map here */}
     <Text > Reviews</Text>
     <Button size={Button.sizes.large} backgroundColor={'#bf6240'} text60BO label='Order Now'></Button> 
     <Navbar></Navbar>
    
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
  