import { StyleSheet, TouchableOpacity, View } from "react-native"
import { useState, useEffect } from 'react'
import axios from "axios";
import {Card, Text, Image} from '@rneui/themed'
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView } from "react-native-gesture-handler";
import Loading from "./Loading";
import MapHome from "./MapHome";
import logo from '../Images/1eDC0L-LogoMakr.png'

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
    <Loading />
  ) : (
    <SafeAreaView>
    <ScrollView style={styles.safeArea}>
      <View style={styles.root}>
        <Card containerStyle={styles.titleCard}>
          <View style={{flexDirection: 'row', alignItems: 'center', height: 30, width: '100%', justifyContent: 'space-between'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>Java Rewards</Text>
          <Image source={logo} style={{ height: 80, width: 30, marginTop: 10}}/>
          </View>
        </Card>
        <Text style={{fontSize: 15, fontWeight: 'bold'}}>Nearby Shops</Text>
      <Card containerStyle={styles.card0}>
        <MapHome/>
      </Card>
      {shops.map((shop,index) => {
        return (

          
          <View style={styles.root} key={shop.email}>

          <TouchableOpacity style={{width: '90%', alignItems: 'center'}} onPress={() => {
            navigation.navigate("IndividualShop", {email: shop.email})
        }}>
          <Card containerStyle={styles.card1}>
            <Card.Title>{shop.name}</Card.Title>
            <Card.Image
              style={styles.image}
              source={{ uri: `${shop.avatar_url}` }}
            />
            <Card.Title>{shop.description}</Card.Title>
 
          </Card>
          </TouchableOpacity>
          </View>
        )
      })
    } 
      </View>
      <View style={{height: 70, backgroundColor: '#f5ece4'}}></View>
      </ScrollView>
      
      </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
    alignItems: "center",
    flexDirection: "column",
    backgroundColor: "#f5ece4",
  },
  titleCard: {
    width: '90%',
    borderRadius: 8,
    marginBottom: 5,
  },
  card0: {
    flex: 1.5,
    alignItems: "center",
    padding: 10,
    width: "90%",
    justifyContent: "space-evenly",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 8
  },
  card1: {
    flex: 1.5,
    alignItems: "center",
    padding: 10,
    width: "100%",
    justifyContent: "space-evenly",
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 8,
    alignContent: 'center'
  },
  image: {
    width: "95%",
    borderRadius: 8,
  }
});