import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions, Button } from 'react-native';
import SingleOrder from './SingleOrder';
import { getBusinessOrders,updateOrderStatus } from "../../utils/feedapi"
import { auth } from '../config/firebase';

export default function BusinessOrders() {
    const [businessOrders, setBusinessOrders] = useState<any[]>([])
    const [isButtonPressed, setButtonPressed] = useState(false)

    function handleUpdateStatus(order_id: number) {
        
        updateOrderStatus(order_id).then(() => {
            setButtonPressed((current) => !current)
        })
    }
    useEffect(() => {
        getBusinessOrders().then((data: any) => {

            setBusinessOrders(data.orders);
        });
    }, [isButtonPressed]);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View>
                <Text style={styles.h1}>Current Orders</Text>
            </View>
            <Button title="Sign Out" containerStyle={styles.button}
                titleStyle={{ fontWeight: "bold", fontSize: 13 }}
                buttonStyle={{ backgroundColor: "#bf6240" }}
              onPress={() => {
                auth.signOut();
              }}
            />
            {businessOrders.some((order)=>order.orders.some((singleorder:any)=> singleorder.status==="open"))? businessOrders.map((order) => {

                return order.orders.map((singleorder: any) => {
                    if (singleorder.status === "closed") { return }
                    return (
                        <View key={order.date} style={styles.card}>
                            <Button onPress={() => { handleUpdateStatus(singleorder._id) }} title="Close Order" color={singleorder.status === "open" ? "gray" : "red"} accessibilityLabel="Change order status" />
                            <View style={styles.cardContent}>
                                <Text style={styles.shopName}>Order # {singleorder._id}</Text>
                                <Text style={styles.description}>Customer #{order.user_id}</Text>
                                <Text style={styles.description}>{singleorder.date}</Text>
                              
                                <SingleOrder items={singleorder.items}></SingleOrder>
                            </View>
                           
                        </View>
                    );
                })


            }):<Text style={styles.h1}>You have no pending orders</Text>}
            { }
        </ScrollView>
    );
}

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        padding: width * 0.04,
    },
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    card: {
        backgroundColor: 'seashell',
        borderRadius: width * 0.02,
        overflow: 'hidden',
        marginBottom: width * 0.02,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft:10,
    },
    image: {
        width: width * 0.25,
        height: width * 0.25,
        resizeMode: 'cover',
    },
    cardContent: {
        padding: width * 0.04,
        flexShrink: 1,
    },
    shopName: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
    },
    description: {
        fontSize: width * 0.035,
        color: '#666',
        marginVertical: width * 0.005,

        flex: 1,
        flexWrap: 'wrap',

    },
    date: {
        fontSize: width * 0.03,
        color: '#999',
    },
});