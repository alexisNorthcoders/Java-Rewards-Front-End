import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Modal, Alert } from 'react-native';
import { getMenuByEmail, postOrder } from "../../utils/feedapi"
import { Card, Button } from "@rneui/themed";
import Loading from '../Screens/Loading';
import { useStripe } from '@stripe/stripe-react-native';
import { getUserEmail } from '../../utils/rememberUserType';
import { useNavigation } from '@react-navigation/native';
import { patchCoffeeCount } from '../../utils/api';

type MenuItem = {
    item: string;
    cost: number;
    description: string;
    item_img: string;
    quantity: number;

};
type Order = {
    user_email: string;
    shop_email: string;
    items: [];
};
type PostedOrder = {
    totalCost: number;
    order_id: number;
};

type Menu = MenuItem[];

type State = {
    menu: Menu;
    isLoading: boolean;
};

export default function Menu({ route }: any) {
    const { shop_email } = route.params;

    const [state, setState] = useState<State>({ menu: [], isLoading: true });
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [postedOrder, setPostedOrder] = useState<PostedOrder>({ totalCost: 0 })
    const [total, setTotal] = useState(0)
    const { initPaymentSheet, presentPaymentSheet } = useStripe();
    const navigation = useNavigation();

    const initializePaymentSheet = async (totalCost: number) => {
        try {

            const response = await fetch('https://javarewards-api.onrender.com/payment-sheet', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ totalCost }),
            });
            const { paymentIntent, ephemeralKey, customer, publishableKey } = await response.json();
            if (!response.ok) return Alert.alert('Failed to initialize payment sheet');
            // Initialize the payment sheet
            const { error } = await initPaymentSheet({
                customerId: customer,
                customerEphemeralKeySecret: ephemeralKey,
                paymentIntentClientSecret: paymentIntent,
                merchantDisplayName: 'JavaRewards',
                customFlow: false,
                style: 'alwaysDark',
                // Set other options if needed
            });

            if (error) {
                console.log(error);
                Alert.alert(`Error code: ${error.code}`, error.message);
                return;
            }
            return await presentPaymentSheet({ clientSecret: paymentIntent })
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Unable to initialize payment sheet');
        }
    };
    const handlePayment = async () => {
        const orderItems: any = []
        const { email } = await getUserEmail()
        state.menu.forEach(item => {
            if (item.quantity > 0) {
                orderItems.push({ price: item.cost, item_name: item.item, quantity: item.quantity })
            }
        });
        if (orderItems.length === 0) {
            Alert.alert('Invalid Order', 'You must order at least one item.');
            return;
        }

        const order: Order = {
            shop_email: shop_email,
            user_email: email,
            items: orderItems
        }
        const totalCost = state.menu.reduce((acc, item) => acc + item.cost * item.quantity, 0);

        const totalCostInCents = Math.round(totalCost * 100);
        try {
            const response: any = await initializePaymentSheet(totalCostInCents);

            if (response.error) {
                console.log(response.error)
                Alert.alert('Order canceled.');
                return
            }
            postOrder(order).then((res) => {
                setPostedOrder(res)
                setModalVisible(true)

            })
        }
        catch (err) {
            console.log(err)
            Alert.alert('Payment error.');

        }
    };
    useEffect(() => {

        getMenuByEmail(shop_email).then((res) => {

            setState({ menu: res, isLoading: false })
        })
            .catch(() => setState({ menu: [], isLoading: false }))
    }, [shop_email]);

    const increaseQuantity = (index: number) => {
        const newMenu = [...state.menu];
        newMenu[index].quantity += 1;
        let total = state.menu.reduce((acc, item) => acc + item.cost * item.quantity, 0)
        console.log(state.menu[0].quantity)
        setTotal(total.toFixed(2))
        setState({ ...state, menu: newMenu });
    };
    const decreaseQuantity = (index: number) => {
        const newMenu = [...state.menu];
        if (newMenu[index].quantity > 0) {
            newMenu[index].quantity -= 1;
            let total = state.menu.reduce((acc, item) => acc + item.cost * item.quantity, 0)
            setTotal(total.toFixed(2))
            setState({ ...state, menu: newMenu });
        }
    };
    const resetQuantity = () => {
        const newMenu = [...state.menu]
        newMenu.forEach((item) => {
            item.quantity = 0
        })
        setState({ ...state, menu: newMenu });

    }

    const renderMenuItems = (menu: Menu) => {
        return menu.map((menuItem, index) => (
            <Card key={index} containerStyle={{ alignSelf: "center", marginTop: 0, marginBottom: 5, borderRadius: 8, padding: 0, width: 300 }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={styles.itemDetails}>
                        <Text style={styles.itemTitle}>{menuItem.item}</Text>
                        <Image source={{ uri: menuItem.item_img }} style={styles.itemImage} />
                        <Text>{menuItem.description}</Text>
                        <Text style={{ fontSize: 18, fontWeight: "bold" }}>£{menuItem.cost.toFixed(2)}</Text>

                    </View>
                    <View style={styles.quantityContainer}>
                        <Button
                            titleStyle={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                            buttonStyle={{ backgroundColor: "#bf6240", borderRadius: 8, marginBottom: 5, width: 40, height: 40 }}
                            onPress={() => decreaseQuantity(index)}
                        >-</Button>
                        <Text style={styles.quantityText}>{menuItem.quantity}</Text>
                        <Button
                            titleStyle={{ color: "white", fontSize: 16, fontWeight: "bold" }}
                            buttonStyle={{ backgroundColor: "#bf6240", borderRadius: 8, marginBottom: 5, width: 40, height: 40 }}
                            onPress={() => increaseQuantity(index)}
                        >+</Button>

                    </View></View>
            </Card>
        ));
    };

    const handleOrder = async () => {
        const orderItems: any = []
        const { email } = await getUserEmail()

        state.menu.forEach(item => {
            if (item.quantity > 0) {
                orderItems.push({ price: item.cost, item_name: item.item, quantity: item.quantity })
            }
        });
        if (orderItems.length === 0) {
            Alert.alert('Invalid Order', 'You must order at least one item.');
            return;
        }
        const order: Order = {
            shop_email: shop_email,
            user_email: email,
            items: orderItems
        }
        postOrder(order).then((res) => {
            setPostedOrder(res)
            patchCoffeeCount(email)
            setModalVisible(true)

        })

    }


    return (<>
        <ScrollView style={styles.container} stickyHeaderIndices={[0]}>
            <View style={{ backgroundColor: "#edd8c5", height: "fit-content", justifyContent: "center", marginBottom: 15 }}><Text style={styles.h1}>Menu</Text></View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible)
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 20, marginBottom: 5, fontWeight: "bold" }}>Your order has been placed!</Text>
                        <View style={{ flexDirection: 'column', width: 150, alignContent: "center", alignItems: "center", alignSelf: "center" }}><Text style={{ fontSize: 20 }}><View style={{ backgroundColor: "#f5ece4", borderRadius: 8 }}><Text style={{ fontSize: 50, fontWeight: "bold" }}>{postedOrder.order_id}</Text></View></Text></View>
                        <Button titleStyle={{ color: "white", fontSize: 16, fontWeight: "bold" }} buttonStyle={{ backgroundColor: "#bf6240", borderRadius: 8, marginTop: 5, height: 40 }} title="Close"
                            onPress={() => {
                                setTotal(0)
                                resetQuantity()
                                setModalVisible(!modalVisible)
                                navigation.navigate('Profile');
                            }}
                        />
                    </View>
                </View>
            </Modal>
            {state.isLoading ? (
                <Loading/>
            ) : (
                <>
                    {renderMenuItems(state.menu)}

                </>
            )}

        </ScrollView>
        <View style={{ alignSelf: "center", backgroundColor: "#edd8c5", width: "100%", }}>
            <Card containerStyle={{ marginTop: 5, marginBottom: 5, borderRadius: 8, padding: 0, height: 40, alignSelf: "center", justifyContent: "center", width: 300 }}><Text style={{ fontSize: 20, fontWeight: "bold", alignSelf: "center" }}>Total: £{total}</Text></Card>
            <View style={{ marginTop: 5, alignSelf: "center", width: 300 }}>

                <Button titleStyle={{ color: "white", fontSize: 16, fontWeight: "bold" }} buttonStyle={{ backgroundColor: "#bf6240", borderRadius: 8, marginBottom: 5, height: 40 }} title="Order and Pay in Store" onPress={handleOrder} />
                <Button titleStyle={{ color: "white", fontSize: 16, fontWeight: "bold" }} buttonStyle={{ backgroundColor: "#bf6240", borderRadius: 8, marginBottom: 5, height: 40 }} title="Order and Pay Online" onPress={handlePayment} />
            </View></View>
        <View style={{ height: 70 }}></View></>
    );
}

const styles = StyleSheet.create({
    h1: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',

    },
    container: {
        flex: 1,
        backgroundColor: "#f5ece4"
    },
    itemImage: {
        borderRadius: 8,
        width: 100,
        height: 100,
        marginTop: 10,
    },
    itemDetails: {

        marginLeft: 10,
        flex: 1,
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: "center",
        color: "white"
    },

    quantityText: {
        fontSize: 16,
        paddingHorizontal: 5,
        textAlign: "center",
        fontWeight: "bold",
        color: "black"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        borderWidth: 5,
        borderColor: "#bf6240",
        flexDirection: "column",
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});