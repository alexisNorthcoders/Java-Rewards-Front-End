import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Animated} from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DisplayPreviousOrders from './display-previous-orders(child)';



export default function UserProfile() {


    interface User {
        avatar_url: string;
        name: string
    }


    const currentUserId = 1
    const [userList, setUserList] = useState<User[]>([]);
    const [previousOrders, setPreviousOrders] = useState([]);
    const [profileImage, setProfileImage] = useState('');

    useEffect(() => {
        axios.get(`https://javarewards-api.onrender.com/orders?user_id=9`).then((res) => {
            // console.log(res.data.orders[0].orders)
            setPreviousOrders(res.data.orders[0].orders);

        })
    }, [])

    useEffect(() => { 
        axios.post(`https://javarewards-api.onrender.com/users/email`, {email: 'jane@example.com'}).then((res) => {
            setUserList(res.data.user)
        })
    }, [])
   


    return (
        <>
            <Text>Profile</Text>
            {userList.length > 0 && (
                <View>
                    <Image 
                        source={{ uri: userList[0].avatar_url }}
                        style={{ width: 400, height: 400 }} 
                    />
                    <Text>{userList[0].name}</Text>
                </View>
            )}
            <View>
                <Text>4 more coffees to go before a free coffee!</Text>
            </View>
            <View>
                {previousOrders.map((item) => (
                    <DisplayPreviousOrders key={item._id} items={item}/>
                ))}
            </View>
        </>
    ); 

}

