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
      axios
        .post(`https://javarewards-api.onrender.com/users/email`, {
          email: "john@example.com",
        })
        .then((res) => {
          setUserList(res.data.user);
          setCoffeCount(res.data.user[0].coffee_count);
          if (res.data.user[0].coffee_count + 1) {
          }
        });
    }
  }, [isFocused]);

  useEffect(() => {
    const fetchEmailFromStorage = async () => {
      try {
        const { email } = await getUserEmail();
        setEmail(email);
      } catch (err) {
        console.log("Error fetching account email");
      }
    };
    fetchEmailFromStorage();
  }, []);

  const updateCoffeeCount = (increment: number) => {
    setCoffeCount((PrevCoffeeCount) => PrevCoffeeCount + increment);
  };

  return (
    <ScrollView>
      <Text style={styles.title}>Profile</Text>
      {userList.length > 0 && (
        <View style={styles.profileContainer}>
          <Image
            source={{ uri: userList[0].avatar_url }}
            style={styles.profileImage}
          />
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
      )}
      <View>
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
            <Text>4 more coffees to go before a free coffee!</Text>
          </Card>
        </View>
      </View>
      <View>
        <Text style={styles.previousOrders}>Previous Orders</Text>
        {previousOrders.map((item) => (
          <DisplayPreviousOrders key={item._id} items={item} />
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
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
    marginTop: 20,
    marginBottom: 5,
    textAlign: "center",
  },
});
