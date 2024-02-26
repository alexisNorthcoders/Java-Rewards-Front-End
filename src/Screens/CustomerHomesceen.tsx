import { StyleSheet, StatusBar } from "react-native"
import { auth } from "../config/firebase"
import { useState, useEffect, Component } from 'react'
import axios from "axios";
import { View, Card, Button, Text} from 'react-native-ui-lib'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import Map from "./Map";
import Feed from "../Components/Feed";

export default function CustomerHomeScreen({navigation}: any) {

  type Shop = {
    email: string,
    name: string,
    avatar_url: string,
    description: string
  }

  const [loading, setLoading] = useState<boolean>(true);
  const [shops, setShops] = useState<Shop[]>([])

  useEffect(() => {
    setLoading(true);
    axios.get(`https://javarewards-api.onrender.com/shops`)
      .then((res) => {
        setShops(res.data.shops);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <View>
      <Text>...Loading</Text>
    </View>
  ) : (
    <SafeAreaView style={styles.safeArea}>
    <StatusBar backgroundColor={'black'}/>
    <ScrollView>
      <View style={styles.root}>
      <Card style={styles.card0}>
        <Map latitude={0} longitude={0} name=""/>
        <Card.Section
          contentStyle={{ alignItems: "center" }}
        />
      </Card>
      {shops.map((shop,index) => {
        return (

          
          <View style={styles.root} key={shop.email}>

          <Card style={styles.card1} onPress={() => {
            navigation.navigate("IndividualShop", {email: shop.email})
        }}>
            <Card.Section
              content={[{ text: `${shop.name}`, text30BO: true, grey10: true }]}
              contentStyle={{ alignItems: "center" }}
            />
            <Card.Image
              style={styles.image}
              source={{ uri: `${shop.avatar_url}` }}
              height={115}
            />
            <Card.Section
              content={[
              { text: `${shop.description}`, text70: true, grey10: true },
            ]}
            contentStyle={{ alignItems: "center" }}
            />
          </Card>
          </View>
        )
      })
    } 
      </View>
      <Feed></Feed>
      </ScrollView>
      
      </SafeAreaView>
    // <Button title="Sign Out"onPress={() => {auth.signOut()}}></Button>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#C4A484",
  },
  card0: {
    flex: 1.5,
    alignItems: "center",
    padding: 10,
    width: "90%",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
  },
  card1: {
    flex: 1.5,
    alignItems: "center",
    padding: 10,
    width: "90%",
    justifyContent: "space-evenly",
    marginTop: 10,
    marginBottom: 10,
  },
  image: {
    width: "95%",
    borderRadius: 10,
  },
  safeArea: {
    marginBottom: 30
  }
});