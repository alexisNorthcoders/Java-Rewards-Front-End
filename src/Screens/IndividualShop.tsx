import { StyleSheet, ImageBackground, Image } from "react-native";
import { Button, View, Text, Card } from "react-native-ui-lib";
import Map from "./Map";
import { useEffect, useState } from "react";
import axios from "axios";

export default function IndividualShop() {
  const baseShop: object[] = [];

  const [shop, setShop] = useState<(typeof baseShop)[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //email/shop_id needs to be passed in as a prop to make component dynamic
  useEffect(() => {
    setLoading(true);
    axios
      .post(`https://javarewards-api.onrender.com/shops/email`, {
        email: "mancunianbrew@example.com",
      })
      .then((res) => {
        console.log(res);
        setShop(res.data.shop);
        setLoading(false);
      });
  }, []);

  return loading ? (
    <View>
      <Text>...Loading</Text>
    </View>
  ) : (
    <View style={styles.root}>
      <Card style={styles.card1}>
        <Card.Section
          content={[{ text: `${shop[0].name}`, text30BO: true, grey10: true }]}
          contentStyle={{ alignItems: "center" }}
        />
        <Card.Image
          style={styles.image}
          source={{ uri: `${shop[0].avatar_url}` }}
          height={115}
        />
        <Card.Section
          content={[
            { text: `${shop[0].description}`, text70: true, grey10: true },
          ]}
          contentStyle={{ alignItems: "center" }}
        />
      </Card>
      <Card style={styles.card2}>
        <Map
          latitude={shop[0].location.lat}
          longitude={shop[0].location.long}
          name={shop[0].name}
        />
        <Card.Section
          content={[
            { text: `Rating`, text70BO: true, grey10: true },
            {
              text: `${shop[0].totalRating.rating}⭐️`,
              text70: true,
              grey10: true,
            },
          ]}
          contentStyle={{ alignItems: "center" }}
        />
      </Card>
      <Button style={styles.button} text60BO label="Order Now"></Button>
    </View>
  );
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
  card1: {
    flex: 1.5,
    alignItems: "center",
    padding: 10,
    width: "90%",
    justifyContent: "space-evenly",
    marginTop: 50,
    marginBottom: 10,
  },
  card2: {
    flex: 1,
    alignItems: "center",
    padding: 10,
    width: "90%",
    justifyContent: "space-evenly",
    marginBottom: 10,
  },
  image: {
    width: "95%",
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#bf6240",
    width: "90%",
    marginBottom: 80,
  },
});
