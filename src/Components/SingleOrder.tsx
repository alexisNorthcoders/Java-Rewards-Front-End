import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Button} from "@rneui/themed";

export default function SingleOrder({items,hide}:any) {
    
    return <Card containerStyle={{ borderColor:"#bf6240",borderWidth:4,backgroundColor: "#f5ece4", marginBottom:10,borderRadius: 8,padding:0,maxWidth:200,alignSelf:"center"}}>
        {items.map((item:any,index)=>{
            return  <Text key={`${index}_${item.item_name}`}style={{fontSize:20,fontWeight:"bold"}}> {item.quantity} x {item.item_name}</Text>
           
        })}
    </Card>
}
