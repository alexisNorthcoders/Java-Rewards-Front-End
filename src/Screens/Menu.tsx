import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity, Modal} from 'react-native';
import { getMenuByEmail, postOrder } from '../../utils/feedapi';

type MenuItem = {
    item: string;
    cost: number;
    description: string;
    item_img: string;
    quantity: number;
};
type Order = {
       user_email:string;
    shop_email:string;
    items:[];
};
type PostedOrder = {
    totalCost:number;
};

type Menu = MenuItem[];

type State = {
    menu: Menu;
    isLoading: boolean;
};

export default function Menu() {

    const [state, setState] = useState<State>({ menu: [], isLoading: true });
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [postedOrder,setPostedOrder] = useState<PostedOrder>({totalCost: 0})


    useEffect(() => {
        getMenuByEmail("northernroast@example.com").then((res) => {
            setState({ menu: res, isLoading: false })
        })
            .catch(() => setState({ menu: [], isLoading: false }))
    }, []);

    const increaseQuantity = (index: number) => {
        const newMenu = [...state.menu];
        newMenu[index].quantity += 1;
        setState({ ...state, menu: newMenu });
    };
    const decreaseQuantity = (index: number) => {
        const newMenu = [...state.menu];
        newMenu[index].quantity -= 1;
        setState({ ...state, menu: newMenu });
    };

    const renderMenuItems = (menu: Menu) => {
        return menu.map((menuItem, index) => (
            <View key={index} style={styles.menuItem}>
                <Image source={{ uri: menuItem.item_img }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                    <Text style={styles.itemTitle}>{menuItem.item}</Text>
                    <Text>{menuItem.description}</Text>
                    <Text>£{menuItem.cost.toFixed(2)}</Text>
                    <View style={styles.quantityContainer}>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => increaseQuantity(index)}
                        >
                            <Text style={styles.quantityText}>+</Text>
                        </TouchableOpacity>
                        <Text style={styles.quantityText}>{menuItem.quantity}</Text>
                        <TouchableOpacity
                            style={styles.quantityButton}
                            onPress={() => decreaseQuantity(index)}
                        >
                            <Text style={styles.quantityText}>-</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        ));
    };

    const handleOrder = async () => {
        const orderItems:any = []
        state.menu.forEach(item => {
            if (item.quantity > 0){
                orderItems.push({price:item.cost,item_name:item.item,quantity:item.quantity} )
            }
       });
       const order:Order= {
        shop_email: "northernroast@example.com",
        user_email: "john@example.com",
        items: orderItems
       }
        postOrder(order).then((res)=> {
            console.log(res);
            
            setPostedOrder(res)
            setModalVisible(true)})
    }


    return (
        <ScrollView style={styles.container}>
              <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Your order has been placed!</Text>
                    <Text style={styles.modalText}>Total Cost: {postedOrder.totalCost}</Text>
                    <Button
                        title="Close"
                        onPress={() => setModalVisible(!modalVisible)}
                    />
                </View>
            </View>
        </Modal>
            {state.isLoading ? (
                <Text>Loading menu...</Text>
            ) : (
                <>
                    {renderMenuItems(state.menu)}
                    <Button title="Place Order" onPress={handleOrder} />
                </>
            )}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    menuItem: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    itemImage: {
        width: 100,
        height: 100,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    itemTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        textAlign:"center"
    },
    quantityButton: {
        backgroundColor: '#ddd',
        width:30,
        height:30,
        justifyContent:"center"
        
    },
    quantityText: {
        fontSize: 16,
        paddingHorizontal: 5,
        textAlign:"center"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
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