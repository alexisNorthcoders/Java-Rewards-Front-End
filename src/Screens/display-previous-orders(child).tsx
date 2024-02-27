import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Animated} from 'react-native';
import { Card, Button } from "@rneui/themed";
import { green } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';


export default function DisplayPreviousOrders({items}) {


    const itemsArr = items.items;

    return (
    <Card >
    <Text >Order Number {items.order_id} </Text>    
    <Text>Ordered on {items.date}</Text>
    
    {
        itemsArr.map((item) => {

            return <Text>{item.quantity} x {item.item_name} £{item.price}</Text>

        })
    }

    <Text>Total cost: £{items.totalCost}</Text>
    </Card>
    )

}

const styles = StyleSheet.create({

    orderView: {

        margin: 10,
        padding: 10,
        backgroundColor: "brown",
        borderRadius: 10,
        borderBlockColor: "brown",
        borderWidth: 3
    }

})
