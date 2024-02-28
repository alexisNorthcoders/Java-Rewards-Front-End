import { StyleSheet, SafeAreaView, StatusBar, View} from "react-native";
import { Button, Card } from '@rneui/themed'
import Map from "./Map";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import Loading from "./Loading";

export default function IndividualShop({route}: any) {

  const { email } = route.params;
  const navigation = useNavigation();
  type Shop = {
    avatar_url: string;
    name: string;
    description: string;
    location: {
      lat: number;
      long: number;
    };
    totalRating: {
      rating: number;
    }
  }

  const [shop, setShop] = useState<Shop[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    axios
      .post(`https://javarewards-api.onrender.com/shops/email`, {
        email: email,
      })
      .then((res) => {
        setShop(res.data.shop);
        setLoading(false);
      });
  }, [email]);

  return loading || !shop || shop.length === 0 ? (
    <Loading/>
  ) : (
    <SafeAreaView style={styles.root}>
      <StatusBar/>
          <Card containerStyle={styles.card1}>
            <Card.Title style={{fontSize: 25, fontWeight: 'bold', marginTop: 20}}>{shop[0].name}</Card.Title>
            <Card.Image
              style={styles.image}
              source={{ uri: `${shop[0].avatar_url}` }}
              height={115}
            />
            <Card.Title style={{paddingTop: 10}}>{shop[0].description}</Card.Title>
          </Card>
          <Card containerStyle={styles.card2}>
            <Map
              latitude={shop[0].location.lat}
              longitude={shop[0].location.long}
              name={shop[0].name}
            />
          </Card>
          <Card containerStyle={styles.card3}>
            <StarRatingDisplay rating={shop[0].totalRating.average_rating}/>
          </Card>
      <Button containerStyle={styles.button} buttonStyle={{ backgroundColor: "#bf6240" }} title="Order Now" onPress={()=> navigation.navigate("Menu",{ shop_email: shop[0].email })}></Button>
    </SafeAreaView>
  );
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
  card1: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    width: "90%",
    justifyContent: "space-evenly",
    marginTop: 30,
    marginBottom: 5,
    borderRadius: 8,
    alignContent: 'center'
  },
  card2: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    width: "90%",
    marginTop: 10,
    borderRadius: 8,
  },
  card3: {
    width:'90%',
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 15
  },
  image: {
    width: "95%",
    borderRadius: 10,
  },
  button: {
    width: "90%",
    marginBottom: 80,
    borderRadius: 8
  },
});