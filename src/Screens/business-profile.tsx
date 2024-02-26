
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity} from 'react-native';
import { Card, Button } from '@rneui/themed';
import { LineChart } from 'react-native-chart-kit';
import profile from '../Images/7LUyy3-LogoMakr (1).png';
import { auth } from '../config/firebase';
import { clearUserType, storeUserType } from '../../utils/rememberUserType';



export default function BusinessProfile() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View>
                <Image style={styles.avatar} source={profile}/>
                </View>
                <Text style={styles.businessName}>Business Name</Text>
            </View>
            <View style={styles.bio}>
                    <Card containerStyle={{borderRadius: 8}}>
                        <Card.Title>Your bio</Card.Title>
                        <Text>"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."</Text>
                    <Button title="Update bio" containerStyle={styles.button} 
                    titleStyle={{fontWeight: "bold", fontSize: 13}}
                    buttonStyle={{backgroundColor: "#bf6240"}}
                    />
                    <Button onPress={() => {
                      clearUserType()
                      auth.signOut()
                      }}>Sign Out</Button>
                    </Card>
            </View>
            

            <View style={styles.graph}>
            <Card containerStyle={{borderRadius: 8}}>
              <Card.Title style={styles.title}>Stats</Card.Title>
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
            </View>
        </View>
    )
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