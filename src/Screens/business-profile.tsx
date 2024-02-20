
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import { Card } from '@rneui/themed';
import { LineChart } from 'react-native-chart-kit';
import profile from '../Images/7LUyy3-LogoMakr (1).png';



export default function BusinessProfile() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                <Image style={styles.avatar} source={profile}/>
                </View>
                <Text>"hello"</Text>
            </View>
            <View style={styles.bio}>
                    <Card>
                        <Card.Title>"My Bio"</Card.Title>
                        <Card.Divider/>
                        <Text>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."</Text>
                    </Card>
            </View>
            <View style={styles.stats}>
            <View style={styles.graph}>
  <Text>Number of JavaRewards Customers:</Text>
  <LineChart
    data={{
      labels: ["Jan", "Feb", "Mar", "Apr", "May", "June"],
      datasets: [
        {
          data: [ 10, 20, 30, 40, 10, 33
          ]
        }
      ]
    }}
    width={Dimensions.get("window").width * 0.8} // from react-native
    height={220}
    yAxisInterval={1} // optional, defaults to 1
    chartConfig={{
      backgroundColor: "#e26a00",
      backgroundGradientFrom: "#fb8c00",
      backgroundGradientTo: "#ffa726",
      decimalPlaces: 0, // optional, defaults to 2dp
      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
      labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
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
</View>
                <Text>"customer stats"</Text>
            </View>
            
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    header: {
        flexDirection: "row",
      width: "100%",
      marginTop: 60,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 30,
      paddingLeft: 0,
      gap: 10,
      alignItems: "center",
      backgroundColor: "yellow"
    },
    bio: {
        flex: 1
    },
    stats: {
        flex: 1
    },
    avatar: {
        margin: 0,
        height: 60,
        width: 60,
        resizeMode: "contain",
        backgroundColor: "red"
    },
    graph: {
        flex: 1
    }
})