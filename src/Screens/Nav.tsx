
import { ActionBar, View, Button} from "react-native-ui-lib"
import { StyleSheet } from "react-native"

export default function Navbar() {
    return <View style={styles.container} >
       <Button label='Feed'></Button>
       <Button label='Map'></Button>
       <Button label='QR code'></Button>
       <Button label='Profile'></Button>
    </View>
}

const styles = StyleSheet.create({
    
    container: {
       flexDirection: 'row',
       backgroundColor: 'orange'
       justifyContent: 'flex-end',
       alignItems: 'flex-end'

    }

})


