import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Animated} from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';



export default function UserProfile() {

    const [previousOrders, setPreviousOrders] = useState([]);

    useEffect(() => {
        axios.get(`https://javarewards-api.onrender.com/orders?user_id=9`).then((res) => {

           console.log(res.data.orders[0].orders)
            setPreviousOrders(res.data.orders);

        })
    }, [])

    
   console.log(previousOrders)


    return (<>
        <Text>Profile</Text>
        <View>
        <Image></Image>
        <Text>Name</Text>
        </View>
    
       <View>
        <Text>4 more coffees to go before a free coffee!</Text>
       </View>
        
        <View>
        {/* {previousOrders.map((item) => {
            console.log(item.orders.items)
        })} */}
        </View>
        
        </>)  

}

