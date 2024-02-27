import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Animated} from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DisplayPreviousOrders from './display-previous-orders(child)';
import { clearUserEmail, clearUserType } from '../../utils/rememberUserType';
import { auth } from '../config/firebase';
import { Button } from '@rneui/themed';

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
            <Text style={styles.title}>Profile</Text>
            {userList.length > 0 && (
                <View style={styles.profileContainer}>
                    <Image 
                        source={{ uri: userList[0].avatar_url }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.userName} >{userList[0].name}</Text>
                    <Button
                    title="log out"
                    titleStyle={{ fontWeight: "bold", fontSize: 13 }}
                    buttonStyle={{ backgroundColor: "#bf6240" }}
                    onPress={() => {
                        clearUserType()
                        clearUserEmail()
                        auth.signOut();
                    }}>
                    Sign Out
                    </Button>
                </View>
            )}
            <View>
                <Text style={styles.coffeeMessage}>4 more coffees to go before a free coffee!</Text>
            </View>
            <View>
                <Text>Previous Orders</Text>
                {previousOrders.map((item) => (
                    <DisplayPreviousOrders key={item._id} items={item}/>
                ))}
            </View>
        </>
    ); 

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff', 
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center', 
    },
    profileContainer: {
      flexDirection: 'row', 
      alignItems: 'center',
      marginBottom: 20,
    },
    profileImage: {
        width: 100, 
        height: 100, 
        borderRadius: 50, 
        marginBottom: 10,
      },
    userName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10, 
      },
    coffeeMessage: {
      fontSize: 16,
      marginBottom: 20,
      textAlign: 'center', 
    },
    profileContainer: {
        flexDirection: 'column', 
        alignItems: 'center', 
        marginBottom: 20,
      },
  });
  





// const styles = StyleSheet.create({
//     container: {
//       flex: 1,
//       alignItems: 'center',
//       justifyContent: 'center',
//       backgroundColor: '#fff', 
//     },
//     title: {
//       fontSize: 24,
//       fontWeight: 'bold',
//       marginBottom: 20,
//     },
//     profileImage: {
//       width: 200,
//       height: 200,
//       borderRadius: 100,
//       marginBottom: 10,
//     },
//     userName: {
//       fontSize: 18,
//       fontWeight: 'bold',
//       textAlign: 'center',
//       marginBottom: 20,
//     },
//     coffeeMessage: {
//       fontSize: 16,
//       marginBottom: 20,
//     },
//   });
  