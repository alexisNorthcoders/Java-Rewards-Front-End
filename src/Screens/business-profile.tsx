import {
  Image,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from "react-native";
import { Card, Button, ThemeProvider, createTheme, Icon, Header } from "@rneui/themed";
import { StarRatingDisplay } from 'react-native-star-rating-widget';
import { ScrollView } from "react-native-gesture-handler";
import { formatDate } from "../../utils/feedapi";



import { auth } from "../config/firebase";
import { useEffect, useState } from "react";
import { getShopData } from "../../utils/api";
import { useNavigation } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { clearUserEmail, clearUserType, getUserEmail } from "../../utils/rememberUserType";
import BusinessStats from "./BusinessStats";
import Loading from "./Loading";
import { BusinessSignOutButton } from "../Components/BusinessSignOutButton";

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
  
    // <SafeAreaView style={{ flexGrow: 1 }}>
      <ScrollView style={styles.container}>
    <View style={styles.headingContainer}>
        <Text style={styles.profileTitle}>My Profile</Text>
      </View>
        <View style={styles.titleCard}>
          <Image
              source={{ uri: `${shopData.avatar_url}` }}
              style={styles.avatar}
            />
            <View style={styles.titleAndButtonContainer}>
            <Text style={styles.shopName}>{shopData.name}</Text>
            <BusinessSignOutButton/>
            </View>
          </View>

        
                <View style={styles.profile}>
          
          <Card containerStyle={styles.displayCards}>
            <Card.Title style={styles.menuTitle}>Customer Rating {rating}/5</Card.Title>
            <StarRatingDisplay rating={rating} />
          </Card>
          <Card containerStyle={{ borderRadius: 8 }}>
            <Card.Title>
              <Text style={styles.menuTitle}>Shop Description</Text>
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
          <Card containerStyle={{ borderRadius: 8 }}>
            <Card.Title style={styles.menuTitle}>
              Menu

            </Card.Title>
            {menu.map((item, i) => {
              return (
                <View key={i} style={styles.singleItem}>
                  <Image source={{uri: item.item_img}} style={styles.img} />
                  <View  style={styles.menuItem} >
                    <Text style={styles.itemText}>{item.item}</Text>
                    <Text>£{item.cost}</Text>
                  </View>
                </View>
              )
            })}
            <Button title="Add" containerStyle={styles.button}
                    titleStyle={{fontWeight: "bold", fontSize: 13}}
                    buttonStyle={{backgroundColor: "#BF6240"}}
                    onPress={() => {
                      navigation.navigate("updateMenu", { menu: menu });
                    }}
                    />
          </Card>
          <Card containerStyle={{ borderRadius: 8, paddingRight: 4 }}>
            <Card.Title style={styles.menuTitle}>Current Offer</Card.Title>
                <View style={styles.offerItem}>
                  <Image source={{uri: offers.img}} style={styles.img} />
                  <View  style={styles.offers} >
                    <Text style={styles.itemText}>{offers.description}</Text>
                    <Text>Valid until:{offers.date}</Text>
                  </View>
                </View>
              
            
            
            <Button title="Update" containerStyle={styles.button}
                    titleStyle={{fontWeight: "bold", fontSize: 13}}
                    buttonStyle={{backgroundColor: "#BF6240"}}
                    onPress={() => {
                      navigation.navigate("updateOffers", { offers: offers });
                    }}
                    />
          </Card>
        </View>

        <BusinessStats shopData={shopData} id={id} />

{/* </View> */}
      </ScrollView>
    // </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 75,
    backgroundColor: "#f5ece4"

  },
  headingContainer: {
    marginTop: 50,
  },
  profileTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  profile: {
    width: "100%",
  
  },
  titleCard: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 14,
    marginRight: 14,
    backgroundColor: "white",
    borderRadius: 8,
  },
  shopName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
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
    width: 90,
    height: 90,
    borderRadius: 50,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 15,
  },
  businessName: {
    fontWeight: "700",
  },
  menuItem: {
    flexDirection: 'column',
    columnGap: 1,
   
    
 
    
  },

  menuTitle: {
    fontSize:16,
    fontWeight: "bold"

  },
  offerItem:{
    flexDirection: 'row',
    alignItems: "center",
    paddingRight: 10
  },

  
  offers: {
    // flexDirection: 'row',
    columnGap: 10,
    justifyContent: 'space-between',
    marginRight: 10
  },
  img: {
    width: 90,
    height: 90,
    marginBottom: 20,
    marginRight: 15,
    borderRadius: 6,

  },
  singleItem: {
    flexDirection: 'row',
    alignItems: "center",

  },
  itemText: {
    fontSize: 15,
    fontWeight: "bold",
    flexWrap: "wrap"
    
    

  },
  safeArea: {
    marginBottom: 70
  },
  displayCards: { 
    borderRadius: 8, 
    alignItems: 'center' },
  // root: {
  //   flex: 1,
  //   width: "100%",
  //   justifyContent: "space-evenly",
  //   alignItems: "center",
  //   flexDirection: "column",
  //   backgroundColor: "#f5ece4"
  // }
  titleAndButtonContainer: {
    marginLeft: 20,

  }
});
