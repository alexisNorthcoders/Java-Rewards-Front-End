import { View, Text, Dimensions, StyleSheet, ScrollView } from "react-native";
import { LineChart, PieChart } from "react-native-chart-kit";
import { Card} from "@rneui/themed";
import { useEffect, useState } from "react";
import { getItemsByShopId, getOrdersByShopId } from "../../utils/api";

const BusinessStats = ({ shopData, id }) => {
  const [shopOrders, setShopOrders] = useState([]);
  const [orderedItems, setOrderedItems] = useState(null)

  useEffect(() => {
    getOrdersByShopId(id).then((res) => {
      const orders = res.data.orders;

      const allOrders = [];
      orders.forEach((order) => {
        allOrders.push(order.orders);
      });
      setShopOrders(allOrders);
    });

    getItemsByShopId(id).then((items) => {
      setOrderedItems(items)
    })
    .catch((err) => {
      console.log(err)
    })
  }, []);

  const totalOrders = shopOrders.flat();
  const formatOrders = totalOrders.map((order) => {
    const date = order.date;
    const newDate = new Date(date);
    const formatDate = newDate.getUTCMonth();

    return { ...order, date: formatDate };
  });

  const decemberOrders = formatOrders.filter((order) => {
    return order.date === 11;
  });

  const januaryOrders = formatOrders.filter((order) => {
    return order.date === 0;
  });

  const februaryOrders = formatOrders.filter((order) => {
    return order.date === 1;
  });

  const decemberItems = [];

  decemberOrders.forEach((order) => {
    decemberItems.push(order.items);
  });

  return (
    <View style={styles.graph}>
      <ScrollView
        horizontal={true}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* <Card
          containerStyle={{
            borderRadius: 8,
            width: Dimensions.get("window").width * 0.92,
          }}
        >
          <Card.Title style={styles.title}>Stats</Card.Title>
          <Text style={styles.centerText}>Number of customers</Text>
          <LineChart
            data={{
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
              datasets: [
                {
                  data: [10, 20, 30, 20, 10, 33],
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.8} // from react-native
            height={180}
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={{
              backgroundColor: "#519e8a",
              backgroundGradientFrom: "#519e8a",
              backgroundGradientTo: "#519e8a",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "3",
                strokeWidth: "2",
                stroke: "white",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </Card> */}

        <Card containerStyle={{ borderRadius: 8 }}>
          <Card.Title style={styles.title}>Stats</Card.Title>
          <Text style={styles.centerText}>Number of orders {'(last 3 months)'}</Text>
          <LineChart
            data={{
              labels: ["Dec", "Jan", "Feb"],
              datasets: [
                {
                  data: [
                    decemberOrders.length,
                    januaryOrders.length,
                    februaryOrders.length,
                  ],
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.8}
            height={180}
            yAxisInterval={0.5}
            chartConfig={{
              backgroundColor: "#62466b",
              backgroundGradientFrom: "#62466b",
              backgroundGradientTo: "#62466b",
              decimalPlaces: 0, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "3",
                strokeWidth: "2",
                stroke: "white",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
            fromZero = {true}
          />
        </Card>

       {orderedItems ? (<Card containerStyle={{ borderRadius: 8 }}>
          <Card.Title style={styles.title}>Stats</Card.Title>
          <Text style={styles.centerText}>Total number of sales per item</Text>
          <PieChart
            data={
              [
                {
                  name: orderedItems[0]._id,
                  population: orderedItems[0].totalAmount,
                  color: 'orange'
                },
                {
                  name: orderedItems[1]._id,
                  population: orderedItems[1].totalAmount,
                  color: 'gold'
                },
                {
                  name: orderedItems[2]._id,
                  population: orderedItems[2].totalAmount,
                  color: 'darkblue'
                },
                {
                  name: orderedItems[3]._id,
                  population: orderedItems[3].totalAmount,
                  color: 'green'
                },
                {
                  name: orderedItems[4]._id,
                  population: orderedItems[4].totalAmount,
                  color: 'purple'
                },
                {
                  name: orderedItems[5]._id,
                  population: orderedItems[5].totalAmount,
                  color: 'lightblue'
                },
                {
                  name: orderedItems[6]._id,
                  population: orderedItems[6].totalAmount,
                  color: 'violet'
                },
                {
                  name: orderedItems[7]._id,
                  population: orderedItems[7].totalAmount,
                  color: 'grey'
                },
                {
                  name: orderedItems[8]._id,
                  population: orderedItems[8].totalAmount,
                  color: 'darkred'
                },
                {
                  name: orderedItems[9]._id,
                  population: orderedItems[9].totalAmount,
                  color: 'indigo'
                },
                {
                  name: orderedItems[10]._id,
                  population: orderedItems[10].totalAmount,
                  color: 'black'
                }
            ]
            }
            width={Dimensions.get('window').width * 0.82}
            height={194}
            chartConfig={{
                color: (opacity = 3) => `rgba(255, 255, 255, ${opacity})`
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="8"
            absolute
        />
        </Card>) : null } 
      </ScrollView>
    </View>
  );
};

export default BusinessStats;

const styles = StyleSheet.create({
  graph: {
    width: "100%",
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
  },
  centerText: {
    textAlign: "center",
  },
});
