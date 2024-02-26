import { LineChart } from 'react-native-chart-kit';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { Card, Button } from '@rneui/themed';
import { useEffect, useState } from 'react';
import { getOrdersByMonth } from '../../utils/feedapi';
type filteredOrder = {
    jan: number;
    fev: number;
    dec:number;
};
export default function Chart(){
    const [orders,setOrders] = useState<filteredOrder>({
        jan: 0,
        fev: 0,
        dec: 0
    });

    useEffect(() => {
        getOrdersByMonth(1,"2024","01").then((orders)=>   setOrders(prevOrders => ({
            ...prevOrders,
            jan: orders.length
          })))
          getOrdersByMonth(1,"2024","02").then((orders)=>   setOrders(prevOrders => ({
            ...prevOrders,
            fev: orders.length
          })))
          getOrdersByMonth(1,"2023","12").then((orders)=>   setOrders(prevOrders => ({
            ...prevOrders,
            dec: orders.length
          })))
    }, []);
return (
<View style={styles.graph}>
<Card containerStyle={{borderRadius: 8}}>
  <Card.Title style={styles.title}>Stats</Card.Title>
  <Text>Orders by Month:</Text>
  <LineChart
    data={{
      labels: ["Dec", "Jan", "Fev"],
      datasets: [
        {
          data: [ orders.dec,orders.jan, orders.fev ]
        }
      ]
    }}
    width={Dimensions.get("window").width * 0.8} // from react-native
    height={180}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "beige",
      backgroundGradientFrom: "beige",
      backgroundGradientTo: "beige",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(1, 1, 1, ${opacity})`,
      style: {
        borderRadius: 16
      },
      propsForDots: {
        r: "6",
        strokeWidth: "2",
        stroke: "#ffa726"
      }
    }}
    bezier
    style={{
      marginVertical: 8,
      borderRadius: 16
    }}
  />
</Card>
</View>)
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
      width: "100%",
      marginTop: 10,
      marginLeft: 10,
      marginRight: 10,
      paddingLeft: 0,
      gap: 10,
      alignItems: "center",
    },
    bio: {
        marginBottom: 20,
    },
    button: {
      width: "30%",
      alignSelf: "center",
      marginTop: 5
    },

    title: {
      textAlign: "center",
      fontWeight: "700",
    },
    stats: {
        flex: 1,
        backgroundColor: "yellow"
    },
    avatar: {
        margin: 0,
        height: 60,
        width: 60,
        resizeMode: "contain",
    },
    graph: {
        flex: 1,
    },
    businessName: {
      fontWeight: "700"
    }
})