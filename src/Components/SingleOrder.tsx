import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Button} from "@rneui/themed";

export default function SingleOrder({items,hide}:any) {
    
    return <Card containerStyle={{ borderRadius: 8 }}>
        {items.map((item:any,index)=>{
            return  <Text key={`${index}_${item.item_name}`}style={{fontSize:20}}> {item.quantity} x {item.item_name}</Text>
           
        })}
    </Card>
}
const styles = StyleSheet.create({

    middle: {
      flex: 0.3,
      backgroundColor: 'tan',
      borderWidth: 1,
      borderRadius:10,
      paddingHorizontal:4
    }

  });