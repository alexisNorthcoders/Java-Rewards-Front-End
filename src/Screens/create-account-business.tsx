import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator
} from "react-native";
import { useState} from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { postNewShop} from "../../utils/api";
import * as Location from "expo-location";

export default function CreateAccountBusiness() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatarUrl] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const geoCode = async () => {
      const geoCodedLocation = await Location.geocodeAsync(address)
      setLat(geoCodedLocation[0].latitude)
      setLong(geoCodedLocation[0].longitude)
    }

  const signUp = async () => {
    setLoading(true);
    await geoCode()

    if (email === "" || password === "") {
      setError("Email and password are mandatory.");
      setLoading(false);
      return;
    }

    try {
      setError("");
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const resNewShop = await postNewShop(name, email, lat, long, description, avatar)

      setName("");
      setEmail("");
      setPassword("");
      setAvatarUrl("");
      setDescription("");
      setLat(0)
      setLong(0)

      if (res && resNewShop) {
        Alert.alert("You've successfully registered!");
      }
    } catch (err: any) {
      console.log(err);
      Alert.alert("Sign up failed" + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.form}>
      <Text>Create a Business Account</Text>
      {error && (
        <View style={styles.error}>
          <Text>{error}</Text>
        </View>
      )}
      <View>
        <TextInput
          value={name}
          style={styles.input}
          placeholder="Business Name"
          autoCapitalize="none"
          onChangeText={(text) => {
            setName(text);
          }}
        />

        <TextInput
          value={email}
          style={styles.input}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => {
            setEmail(text);
          }}
        />
        <TextInput
          value={password}
          style={styles.input}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => {
            setPassword(text);
          }}
        />
        <TextInput
          value={address}
          style={styles.input}
          placeholder="Postcode"
          autoCapitalize="none"
          onChangeText={(text) => {
            setAddress(text);
          }}
        />
        <TextInput
          value={avatar}
          style={styles.input}
          placeholder="Avatar URL"
          autoCapitalize="none"
          onChangeText={(text) => {
            setAvatarUrl(text);
          }}
        />
        <TextInput
          value={description}
          style={styles.input}
          placeholder="Shop Bio"
          autoCapitalize="none"
          onChangeText={(text) => {
            setDescription(text);
          }}
        />
      </View>

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color="0000ff" />
        ) : (
          <TouchableOpacity
            onPress={signUp}
            style={[styles.button, styles.buttonOutline]}
          >
            <Text style={styles.buttonOutlineText}>Register</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#ECE1DD",
    borderRadius: 10,
    marginTop: 5,
    width: 300,
  },
  buttonContainer: {
    width: "60%",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#bf6240",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#bf6240",
    borderWidth: 2,
  },
  buttonOutlineText: {
    color: "#bf6240",
    fontWeight: "700",
    fontSize: 16,
    textAlign: "center",
  },
  error: {
    marginTop: 10,
    padding: 10,
    color: "#fff",
  },
});
