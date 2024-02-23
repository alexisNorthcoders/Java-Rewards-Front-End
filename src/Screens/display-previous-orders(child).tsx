import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Animated} from 'react-native';


export default function DisplayPreviousOrders({items}) {


    const itemsArr = items.items;

   

    return (<>
    <Text>{items.date}</Text>
    
    {
        itemsArr.map((item) => {

            return <View> 
              <Text>{item.item_name}</Text>
              <Text>{item.price}</Text>
              <Text>{item.quantity}</Text>
            </View>

            console.log(item)


        })
    }
       
    
    
    
    </>)
    
    
    



}