import { View, Text, Dimensions, StyleSheet, ScrollView } from 'react-native'
import { LineChart } from "react-native-chart-kit";
import { Card, Button } from "@rneui/themed";
import { useEffect, useState } from 'react';
import { getOrdersByShopId } from '../../utils/api';

const BusinessStats = ({shopData, id}) => {

  const [shopOrders, setShopOrders] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    getOrdersByShopId(id).then((res) => {
      const orders = res.data.orders

      const allOrders = []
      orders.forEach((order) => {
        allOrders.push(order.orders)
      })
      setShopOrders(allOrders)
    })
  }, [])


  const totalOrders = shopOrders.flat()
  const formatOrders = totalOrders.map((order) => {
    const date = order.date
    const newDate = new Date(date)
    const formatDate = newDate.getUTCMonth()

    return {...order, date: formatDate}
  })

  const decemberOrders = formatOrders.filter((order) => {
    return order.date === 11})
  
  const januaryOrders = formatOrders.filter((order) => {
      return order.date === 0})

  const februaryOrders = formatOrders.filter((order) => {
        return order.date === 1})

  const decemberItems = []

  decemberOrders.forEach((order) => {
    decemberItems.push(order.items)
  })
  
  return (
    <View style={styles.graph}>
      <ScrollView horizontal={true} contentContainerStyle={{
          alignItems: 'center', justifyContent: "center"}}>
        <Card containerStyle={{ borderRadius: 8, width: Dimensions.get("window").width * 0.92} }>
          <Card.Title style={styles.title}>Stats</Card.Title>
          <Text style={styles.centerText}>Number of customers</Text>
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
              datasets: [
                {
                  data: [10, 20, 30, 20, 10, 33],
                },
              ]
            }}
            width={Dimensions.get("window").width * 0.8} // from react-native
            height={180}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </Card>

        <Card containerStyle={{ borderRadius: 8 }}>
          <Card.Title style={styles.title}>Stats</Card.Title>
          <Text style={styles.centerText}>Number of orders</Text>
          <LineChart
            data={{
              labels: ["Dec", "Jan", "Feb"],
              datasets: [
                {
                  data: [decemberOrders.length, januaryOrders.length, februaryOrders.length],
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.8} // from react-native
            height={180}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#e26a00",
              backgroundGradientFrom: "#fb8c00",
              backgroundGradientTo: "#ffa726",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "6",
                strokeWidth: "2",
                stroke: "#ffa726",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </Card>

      </ScrollView>
      </View>
  )
}

export default BusinessStats

const styles = StyleSheet.create({
  graph: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
  },
  centerText: {
    textAlign: 'center'
  }
})