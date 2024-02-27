import {
  Image,
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
  const [menu, setMenu] = useState()
  const [offers, setOffers] = useState()

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
        setMenu(shopData.menu)
        setOffers(shopData.offers)
        setIsLoading(false);
        setRating(shopData.totalRating.average_rating)
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
          <Card containerStyle={{ borderRadius: 8, alignItems: 'center' }}>
            <Card.Title>Menu</Card.Title>
            {menu.map((item, i) => {
              return (
                <View key={i} style={styles.singleItem}>
                  <Image source={{uri: item.item_img}} style={styles.img} />
                  <View  style={styles.menuItem} >
                    <Text>{item.item}</Text>
                    <Text>£{item.cost}</Text>
                  </View>
                </View>
              )
            })}
            <Button title="Add Item" containerStyle={styles.button}
                    titleStyle={{fontWeight: "bold", fontSize: 13}}
                    buttonStyle={{backgroundColor: "#BF6240"}}
                    onPress={() => {
                      navigation.navigate("updateMenu", { menu: menu });
                    }}
                    />
          </Card>
          <Card containerStyle={{ borderRadius: 8, alignItems: 'center' }}>
            <Card.Title>Offers</Card.Title>
                <View style={styles.singleItem}>
                  <Image source={{uri: offers.img}} style={styles.img} />
                  <View  style={styles.offers} >
                    <Text>{offers.description}</Text>
                    <Text>{offers.date}</Text>
                  </View>
                </View>
              
            
            
            <Button title="Add Offer" containerStyle={styles.button}
                    titleStyle={{fontWeight: "bold", fontSize: 13}}
                    buttonStyle={{backgroundColor: "#BF6240"}}
                    onPress={() => {
                      navigation.navigate("updateOffers", { offers: offers });
                    }}
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
  menuItem: {
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'space-between'
  },
  offers: {
    flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'space-between'
  },
  img: {
    width: 100,
    height: 100
  },
  singleItem: {
    flexDirection: 'row'
  }
});
