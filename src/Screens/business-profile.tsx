import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Card, Button } from "@rneui/themed";
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { ScrollView } from "react-native-gesture-handler";

import { auth } from "../config/firebase";
import { useEffect, useState } from "react";
import { getShopData } from "../../utils/api";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { clearUserEmail, clearUserType, getUserEmail } from "../../utils/rememberUserType";
import BusinessStats from "./BusinessStats";
import Loading from "./Loading";

export default function BusinessProfile() {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);
  const [shopData, setShopData] = useState({
    name: "",
    email: "",
    avatar_url: "",
    location: "",
    description: "",
  });
  const [id, setId] = useState()
  const [rating, setRating] = useState()

  const isFocused = useIsFocused()
  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      getUserEmail().then((res) => {
        return getShopData(res.email)
      }).then((shopData) => {
        setShopData({
          name: shopData.name,
          email: shopData.email,
          avatar_url: shopData.avatar_url,
          location: shopData.location,
          description: shopData.description,
        });
        setId(shopData._id)
        setIsLoading(false);
        setRating(shopData.totalRating.rating)
      })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isFocused]);

  return isLoading ? (
    <Loading />
  ) : (
    <SafeAreaView style={{ flexGrow: 1 }}>
      <StatusBar />
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        style={styles.container}
        contentContainerStyle={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >

        <View style={{ flex: 1, flexDirection: "row", justifyContent: "space-between" }}>

          <Text style={styles.h1}>My Profile</Text>
          <Button containerStyle={styles.button}
            titleStyle={{ fontWeight: "bold", fontSize: 13 }}
            buttonStyle={{ backgroundColor: "#bf6240" }}
            onPress={() => {
              clearUserType()
              clearUserEmail()
              auth.signOut();
            }}
          >
            Sign Out
          </Button>

        </View>
        <View style={styles.profile}>
          <Card containerStyle={{ borderRadius: 8 }}>
            <Card.Title>{shopData.name}</Card.Title>
            <Card.Image
              source={{ uri: `${shopData.avatar_url}` }}
              height={100}
            ></Card.Image>

          </Card>
          <Card containerStyle={{ borderRadius: 8, alignItems: 'center' }}>
            <Card.Title>Customer Rating {rating}/5</Card.Title>
            <StarRatingDisplay rating={rating} />
          </Card>
          <Card containerStyle={{ borderRadius: 8 }}>
            <Card.Title>
              <Text>Shop Description</Text>
            </Card.Title>
            <Text>{shopData.description}</Text>
            <Button
              title="Update"
              onPress={() => {
                navigation.navigate("UpdateProfile", { shop: shopData });
              }}
              containerStyle={styles.button}
              titleStyle={{ fontWeight: "bold", fontSize: 13 }}
              buttonStyle={{ backgroundColor: "#bf6240" }}
            />
          </Card>
        </View>

        <BusinessStats shopData={shopData} id={id} />


      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 75
  },
  h1: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 20
  },
  profile: {
    width: "100%",
  },
  button: {
    width: "30%",
    alignSelf: "center",
    marginTop: 5,
  },
  title: {
    textAlign: "center",
    fontWeight: "700",
  },
  avatar: {
    margin: 0,
    height: 60,
    width: 60,
    resizeMode: "contain",
  },
  businessName: {
    fontWeight: "700",
  },
});
