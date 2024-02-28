import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { getBusinessOrders, updateOrderStatus } from "../../utils/feedapi"
import Loading from '../Screens/Loading';
import { getUserEmail } from '../../utils/rememberUserType';
import { getShopData } from '../../utils/api';
import Swipe from './Swipe';

export default function BusinessOrders() {
    const [businessOrders, setBusinessOrders] = useState<any[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [hide, setHide] = useState({})
    const [shop, setShop] = useState({ id: "", name: "" })

    function handleUpdateStatus(order_id: number) {
        setHide((current) => ({ ...current, [order_id]: true }))
        updateOrderStatus(order_id).then(() => {
        })
    }
    useEffect(() => {
        getUserEmail().then(({ email }) => {
            if (!email) { return }
            getShopData(email).then(({ _id, name }) => {
                setShop((previousShop) => ({ ...previousShop, id: _id, name: name }))
                getBusinessOrders(_id).then((data: any) => {
                    setBusinessOrders(data.orders);

                    setIsLoading(false)
                });
            })
        })
        const interval = setInterval(() => {

            setShop(previousShop => {
                getBusinessOrders(previousShop.id).then((data: any) => {
                    setBusinessOrders(data.orders);
                });
                return previousShop;
            });
        }, 15000);

        return () => clearInterval(interval);

    }, [shop.id]);

    return (
        <ScrollView contentContainerStyle={styles.container} stickyHeaderIndices={[0]}>
          
             <View style={{ backgroundColor: "#f5ece4", justifyContent: "center", paddingBottom: 15,paddingTop:30 ,alignItems:"center"}}><Text style={styles.h1}>{shop.name}</Text></View>
      
            {isLoading ? <Loading /> : businessOrders.some((order) => order.orders.some((singleorder: any) => singleorder.status === "open")) ? businessOrders.map((order) => {

                return order.orders.slice(-40).map((singleorder: any) => {
                    if (singleorder.status === "closed") { return }
                    return (hide[singleorder.order_id] === true ? null : <View style={{minHeight:220,maxHeight:220}}>
                          <Swipe key={singleorder.order_id}order={singleorder} handleUpdateStatus={handleUpdateStatus}></Swipe></View>
                   
                    );
                })
            }) : <Text style={styles.h1}>You have no pending orders</Text>}
            { }
        </ScrollView>
    );
}
const { width,height } = Dimensions.get('window');
const styles = StyleSheet.create({
    
    container: {
        display:"flex",
        flexDirection:"column",
       paddingBottom:100,
       marginTop:0,
        backgroundColor: "#f5ece4",
    
        
    },
         text: {
        textAlign: "center",
        fontSize: 50,
        backgroundColor: "transparent"
      },
    h1: {
        
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    

    },

    image: {
        width: width * 0.25,
        height: width * 0.25,
        resizeMode: 'cover',
    },
  
     description: {
        fontSize: width * 0.035,
        color: '#666',
        marginVertical: width * 0.005,
        marginLeft: width * 0.05,

        flex: 1,
        flexWrap: 'wrap',

    },
    date: {
        fontSize: width * 0.03,
        color: '#999',
    },
});