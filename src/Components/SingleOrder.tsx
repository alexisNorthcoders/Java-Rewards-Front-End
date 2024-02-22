import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Button } from 'react-native';


export default function SingleOrder({items}:any) {

    return <View style={styles.middle}>
        {items.map((item:any)=>{
            return  <Text style={{fontSize:20}}> {item.quantity} x {item.item_name}</Text>
           
        })}
    </View>
}
const styles = StyleSheet.create({

    middle: {
      flex: 0.3,
      backgroundColor: 'tan',
      borderWidth: 1,
      borderRadius:10,
    }

  });