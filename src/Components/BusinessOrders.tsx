import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Card, Button } from "@rneui/themed";
import SingleOrder from './SingleOrder';

import { auth } from '../config/firebase';
import { formatDate, getBusinessOrders, updateOrderStatus } from "../../utils/feedapi"
import Loading from '../Screens/Loading';
import { getUserEmail } from '../../utils/rememberUserType';
import { getShopData } from '../../utils/api';
import { prepareUIRegistry } from 'react-native-reanimated/lib/typescript/reanimated2/frameCallback/FrameCallbackRegistryUI';

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

    }, []);

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={{}}>
                <Text style={styles.h1}>{shop.name}</Text>
            </View>
            <Button title="Sign Out"
                titleStyle={{ fontWeight: "bold", fontSize: 13 }}
                buttonStyle={{ backgroundColor: "#bf6240" }}
                onPress={() => {
                    auth.signOut();
                }}
            />
            {isLoading ? <Loading /> : businessOrders.some((order) => order.orders.some((singleorder: any) => singleorder.status === "open")) ? businessOrders.map((order) => {

                return order.orders.slice(-20).map((singleorder: any) => {
                    if (singleorder.status === "closed") { return }
                    return (
                        hide[singleorder.order_id] === true ? null : <Card containerStyle={{ borderRadius: 8, padding: 0 }} key={singleorder.date} >
                            <Card.Title><Text style={styles.orderId}>Order # {singleorder.order_id}</Text></Card.Title>

                            <Text style={styles.description}>Customer #{singleorder.user_id}</Text>
                            <Text style={styles.description}>{formatDate(singleorder.date)}</Text>

                            <SingleOrder items={singleorder.items} hide={true}></SingleOrder>

                            <Button onPress={() => { handleUpdateStatus(singleorder.order_id) }} title="Close Order" titleStyle={{ fontWeight: "bold", fontSize: 13 }} buttonStyle={{ borderRadius: 8, marginLeft: width * 0.04, marginTop: 5, marginBottom: 5, width: 100, backgroundColor: "#bf6240" }} accessibilityLabel="Change order status" />

                        </Card>
                    );
                })
            }) : <Text style={styles.h1}>You have no pending orders</Text>}
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
        marginTop: 20,
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,

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
    orderId: {
        fontSize: width * 0.06,
        fontWeight: 'bold',
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