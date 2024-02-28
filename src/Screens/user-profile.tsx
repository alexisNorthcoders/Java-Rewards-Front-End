import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Animated, ScrollView} from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DisplayPreviousOrders from './display-previous-orders(child)';
import { clearUserEmail, clearUserType, getUserEmail } from '../../utils/rememberUserType';
import { auth } from '../config/firebase';
import { Card, Button } from '@rneui/themed';
import { useIsFocused } from "@react-navigation/native";
import ProgressBar from "react-native-progress/Bar";

export default function UserProfile() {
  interface User {
    avatar_url: string;
    name: string;
  }

  const currentUserId = 1;
  const [userList, setUserList] = useState<User[]>([]);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [CoffeCount, setCoffeCount] = useState(0);

  let newCoffeeCount = CoffeCount % 7;
  let coffeeProg = newCoffeeCount * 0.15;
  let remainingCoffees = 7 - newCoffeeCount

  useEffect(() => {
    axios
      .get(`https://javarewards-api.onrender.com/orders?user_id=9`)
      .then((res) => {
        setPreviousOrders(res.data.orders[0].orders);
      });
  }, []);


  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
     
      getUserEmail().then((result) => {
        axios
        .post(`https://javarewards-api.onrender.com/users/email`, {
          email: result.email,
        })
        .then((res) => {
          setUserList(res.data.user);
          setCoffeCount(res.data.user[0].coffee_count);
          if (res.data.user[0].coffee_count + 1) {
          }
        });
      })
        
    }
  }, [isFocused]);

  const updateCoffeeCount = (increment: number) => {
    setCoffeCount((PrevCoffeeCount) => PrevCoffeeCount + increment);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {userList.length > 0 && (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: userList[0].avatar_url }}
            style={styles.profileImage}
          />
          <View style={styles.profileName}>
          <Text style={styles.userName}>{userList[0].name}</Text>
          <Button
            containerStyle={styles.button}
            title="log out"
            titleStyle={{ fontWeight: "bold", fontSize: 13 }}
            buttonStyle={{ backgroundColor: "#bf6240" }}
            onPress={() => {
              clearUserType();
              clearUserEmail();
              auth.signOut();
            }}>
            Sign Out
          </Button>
          </View>
        </View>
      )}
      <View>
        <Text style={styles.previousOrders} >Loyality Progress bar</Text>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <Card containerStyle={{ borderRadius: 8 }}>
            <ProgressBar
              width={300}
              progress={coffeeProg}
              height={20}
              color="#d2691e"
              borderWidth={2}
            />
            <Text>{remainingCoffees} more coffees to go before a free coffee!</Text>
          </Card>
        </View>
      </View>
      <View>
        <Text style={styles.previousOrders}>Previous Orders</Text>
        {previousOrders.slice(0, 10).map((item) => (
            <DisplayPreviousOrders key={item._id} items={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5ece4",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  profileContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
    marginLeft: 15,
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  previousOrders: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 25,
    textAlign: "center",
  },
  profileName: {
    marginLeft: 20,
  },
});
