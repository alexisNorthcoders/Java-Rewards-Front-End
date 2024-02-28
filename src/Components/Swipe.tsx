
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import Swiper from 'react-native-deck-swiper';
import SingleOrder from './SingleOrder';
import { Card, Button } from "@rneui/themed";
import { formatDate, updateOrderStatus } from '../../utils/feedapi';
import { useState } from 'react';

export default function Swipe({ order, handleUpdateStatus }: any) {
    const [showCard, setShowCard] = useState(true)

    return (showCard ?

        <Swiper
            cardVerticalMargin={0}
            cardHorizontalMargin={0}
            marginBottom={0}
            marginTop={0}
            cards={[order]}
            verticalSwipe={false}
            renderCard={(card) => {

                return (<Card containerStyle={{ marginTop: 0, borderRadius: 8, padding: 0, backgroundColor: "white", marginHorizontal: 60, alignContent: "center", justifyContent: "center", marginBottom: 0, elevation: 3 }} >

                    <Text style={{ fontSize: 30, fontWeight: "bold", color: "black", alignSelf: "center" }}>Order # {card.order_id}</Text>
                    <SingleOrder items={order.items}></SingleOrder>
                    <Text style={styles.description}>Customer #{card.user_id}</Text>
                    <Text style={styles.description}>{formatDate(card.date)}</Text>
                    <Button onPress={() => { handleUpdateStatus(order.order_id) }} title="Close Order" titleStyle={{ fontWeight: "bold", fontSize: 13 }} buttonStyle={{ borderRadius: 8, marginLeft: width * 0.04, marginTop: 5, marginBottom: 5, width: 100, backgroundColor: "#bf6240", alignSelf: "center" }} accessibilityLabel="Change order status" />


                </Card>
                )
            }}
            onSwiped={(cardIndex) => {
                setShowCard((show) => !show)
                handleUpdateStatus(order.order_id)
            }}

            onSwipedAll={() => { }}
            cardIndex={0}
            backgroundColor={'#f5ece4'}
            stackSize={1}>

        </Swiper> : null

    )
}


const { width, height } = Dimensions.get('window');
const styles = StyleSheet.create({

    shopName: {
        fontSize: width * 0.04,
        fontWeight: 'bold',
        color: "black"
    },
    description: {
        alignSelf: "center",
        fontSize: width * 0.035,
        color: '#666',
    },

});