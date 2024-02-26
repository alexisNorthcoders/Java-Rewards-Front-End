import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Animated, Button, ScrollView} from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DisplayPreviousOrders from './display-previous-orders(child)';
import { getUserEmail } from '../../utils/rememberUserType';


export default function UserProfile() {


    interface User {
        avatar_url: string;
        name: string
    }

    const currentUserId = 1
    const [userList, setUserList] = useState<User[]>([]);
    const [previousOrders, setPreviousOrders] = useState([]);
    const [profileImage, setProfileImage] = useState('');
    const [email, setEmail] = useState("")

   

    useEffect(() => {
        axios.get(`https://javarewards-api.onrender.com/orders?user_id=9`).then((res) => {
            setPreviousOrders(res.data.orders[0].orders);
        })
    }, [])
    useEffect(() => {
    
        const fetchEmailFromStorage = async () => {
          try {
            const {email} = await getUserEmail()
            setEmail(email)
            
          }
          catch (err) {
      
            console.log("Error fetching account email")
          }
    
          
      }
      fetchEmailFromStorage()
    }, [])

    useEffect(() => { 
        axios.post(`https://javarewards-api.onrender.com/users/email`, {email: email}).then((res) => {
            setUserList(res.data.user)
        })
    }, [])
   


    return (
        
            <ScrollView > 
            <Text style={styles.title}>Profile</Text>
            {userList.length > 0 && (
                <View style={styles.profileContainer}>
                    <Image 
                        source={{ uri: userList[0].avatar_url }}
                        style={styles.profileImage}
                    />
                    <Text style={styles.userName} >{userList[0].name}</Text>
                    <Button title="Logout"/>
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
         </ScrollView>
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
  