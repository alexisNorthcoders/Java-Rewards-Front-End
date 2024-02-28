import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Animated,
  ScrollView,
} from "react-native";
import axios from "axios";
import { useState, useEffect } from "react";
import DisplayPreviousOrders from "./display-previous-orders(child)";
import {
  clearUserEmail,
  clearUserType,
  getUserEmail,
} from "../../utils/rememberUserType";
import { auth } from "../config/firebase";
import { Card, Button } from "@rneui/themed";
import { useIsFocused } from "@react-navigation/native";
import ProgressBar from "react-native-progress/Bar";
import Loading from "./Loading";
import { FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

export default function UserProfile() {
  interface User {
    avatar_url: string;
    name: string;
  }

  const [isLoading, setIsLoading] = useState(true);
  const currentUserId = 1;
  const [userList, setUserList] = useState<User[]>([]);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [CoffeCount, setCoffeCount] = useState(0);

  let newCoffeeCount = CoffeCount % 7;
  let coffeeProg = newCoffeeCount * 0.15;
  let remainingCoffees = 7 - newCoffeeCount;

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
            setIsLoading(false);
            if (res.data.user[0].coffee_count + 1) {
            }
          });
      });
    }
  }, [isFocused]);

  const updateCoffeeCount = (increment: number) => {
    setCoffeCount((PrevCoffeeCount) => PrevCoffeeCount + increment);
  };

  const sortedByDate = previousOrders.sort((a, b) => {
    let dateA = new Date(a.date)
    let dateB = new Date(b.date)
    return dateB - dateA
  });

  return isLoading ? (
    <Loading />
  ) : (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.title}>My Profile</Text>
      </View>
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
              }}
            >
              Sign Out
            </Button>
          </View>
        </View>
      )}
      <View>
        <Text style={styles.previousOrders}>
          Buy 7 coffees and your next coffee is on us
        </Text>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Card containerStyle={{ borderRadius: 8 }}>
            <View style={styles.progress}>
              <ProgressBar
                width={300}
                progress={coffeeProg}
                height={20}
                color="#d2691e"
                borderWidth={2}
              />
              <FontAwesome name="coffee" size={24} color="#bf6240" />
            </View>
            <Text style={styles.coffeeProgress}>
              {remainingCoffees} more coffees to go before a free coffee!
            </Text>
          </Card>
        </View>
      </View>
      <View>
        <Text style={styles.previousOrders}>Previous Orders</Text>
        {sortedByDate.slice(0, 10).map((item) => (
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
  headingContainer: {
    marginTop: 50,
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
    marginLeft: 14,
    marginRight: 14,
    backgroundColor: "white",
    borderRadius: 8,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 50,
    marginTop: 10,
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
  coffeeProgress: {
    marginTop: 8,
    textAlign: "center",
  },
  progress: {
    flexDirection: "row",
    gap: 5,
    alignItems: "center",
  },
});
