import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Homepage from './home-page';

const Stack = createNativeStackNavigator();

export default function Navigation() {


  return (
        <Stack.Navigator>
            <Stack.Screen name='Homepage' component={Homepage}></Stack.Screen>
        </Stack.Navigator>
  );
}

// import { ActionBar, View, Button} from "react-native-ui-lib"
// import { StyleSheet} from "react-native"

// export default function Navbar() {



//     return (
//     <View style={styles.container} >
//        <Button label='Feed' backgroundColor={'#bf6240'} text70BO onPress={}></Button>
//        <Button label='Map' backgroundColor={'#bf6240'} text70BO></Button>
//        <Button label='QR code' backgroundColor={'#bf6240'} text70BO></Button>
//        <Button label='Profile' backgroundColor={'#bf6240'} text70BO></Button>
//     </View>
//     )
// }

// const styles = StyleSheet.create({
    
//     container: {
//        flexDirection: 'row',
//        alignItems: 'center',
//        justifyContent: 'space-evenly',
//        width: '100%',
//        backgroundColor: 'white',
//        height: '7%',
//        borderBlockColor: 'black'
//     }
// })


