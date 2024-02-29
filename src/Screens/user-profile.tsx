import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity, Animated, ScrollView, Modal } from 'react-native';
import axios from 'axios';
import { useState, useEffect } from 'react';
import DisplayPreviousOrders from './display-previous-orders(child)';
import { clearUserEmail, clearUserType, getUserEmail } from '../../utils/rememberUserType';
import { auth } from '../config/firebase';
import { Card, Button } from '@rneui/themed';
import { useIsFocused } from "@react-navigation/native";
import ProgressBar from "react-native-progress/Bar";
import Loading from "./Loading";
import logo from '../Images/7AiXuD-LogoMakr.png'
import { getUserCoffee } from '../../utils/feedapi';

export default function UserProfile() {
  interface User {
    avatar_url: string;
    name: string;
    email:string;
  }

  const [isLoading, setIsLoading] = useState(true);
  const currentUserId = 1;
  const [userList, setUserList] = useState<User[]>([{email:""}]);
  const [previousOrders, setPreviousOrders] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [email, setEmail] = useState("");
  const [CoffeCount, setCoffeCount] = useState(0);
  const [showModal, setShowModal] = useState(false)


  const progress = CoffeCount % 7 === 0 ? 1 : (CoffeCount % 7) / 7;
  const handleProgressBarComplete = () => {
    console.log("bar completed")
    if (CoffeCount % 7 === 0) {
      setShowModal(true);
    }
  };

  useEffect(() => {
    getUserEmail().then((result) => {
      axios
        .post(`https://javarewards-api.onrender.com/users/email`, {
          email: result.email,
        })
        .then((res) => {
          setUserList(res.data.user);
          setCoffeCount(res.data.user[0].coffee_count);
          setIsLoading(false);
         
        });
    })
    axios
      .get(`https://javarewards-api.onrender.com/orders?user_id=9`)
      .then((res) => {
        setPreviousOrders(res.data.orders[0].orders);
      });
  }, []);
  useEffect(() => {
    if (progress === 1 && !showModal) {
      handleProgressBarComplete();
    }
  }, [progress]);

  const isFocused = useIsFocused();
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isFocused) {
        getUserCoffee(userList[0].email).then((count) => setCoffeCount(count));
      }
    }, 5000)
  
    return () => clearInterval(intervalId)
  }, [isFocused]);

  const updateCoffeeCount = () => {
    
  };



  return isLoading ? (
    <Loading />
  ) : (
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
              progress={progress}
              height={20}
              color="#d2691e"
              borderWidth={2}
              


            />
            <Text>{7 - CoffeCount % 7} more coffees to go before a free coffee!</Text>
          </Card>
        {progress === 1 ? <Button titleStyle={{ color: "white", fontSize: 16, fontWeight: "bold" }} buttonStyle={{ backgroundColor: "#bf6240", borderRadius: 8, marginTop: 5, height: 40 }} title="Click for Free Coffee" onPress={() => setShowModal(true)} /> : null}
        </View>
        <Modal
          visible={showModal}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowModal(false)}
        >
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <View style={{ backgroundColor: 'white', padding: 20, borderRadius: 10 }}>
              <Text style={{ fontSize: 30, textAlign: "justify" }}>Your next coffee is on us. Just show this message!</Text>
              <Image source={logo} style={{ height: 200, width: 200, alignSelf: "center" }} />
              <Button titleStyle={{ color: "white", fontSize: 16, fontWeight: "bold" }} buttonStyle={{ backgroundColor: "#bf6240", borderRadius: 8, marginTop: 5, height: 40 }} title="Close"
                onPress={() => setShowModal(false)}
              />

            </View>
          </View>
        </Modal>
      </View>
      <View>
        <Text style={styles.previousOrders}>Previous Orders</Text>
        {previousOrders.slice(0, 10).map((item) => (
          <DisplayPreviousOrders key={item.order_id} items={item} />
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
