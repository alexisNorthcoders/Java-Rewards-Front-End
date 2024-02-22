import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";
import { useState} from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { postNewShop} from "../../utils/api";
import * as Location from "expo-location";
import { validateAvatarURL, validateEmail, validatePassword, validatePostcode } from "../../utils/formValidation";

export default function CreateAccountBusiness() {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatarUrl] = useState("");
  const [description, setDescription] = useState("");
  const [postcode, setPostcode] = useState("");
  const [lat, setLat] = useState(0)
  const [long, setLong] = useState(0)
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [urlValid, setURLValid] = useState(true);
  const [postcodeValid, setPostcodeValid] = useState(true)
 

    const geoCode = async () => {
      const geoCodedLocation = await Location.geocodeAsync(postcode)
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
    <ScrollView automaticallyAdjustKeyboardInsets={true} 
    style={styles.form}  
    contentContainerStyle={{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    }}>
      <Text>Create a Business Account</Text>
      {error && (
        <View style={styles.error}>
          <Text>{error}</Text>
        </View>
      )}

      <View>
        {!emailValid && <Text style={styles.error}>Email is invalid</Text>}
        {!passwordValid && (
          <Text style={styles.error}>
            Password should be at least 6 characters
          </Text>
        )}
        {!urlValid && <Text style={styles.error}>URL is invalid</Text>}
        {!postcodeValid && <Text style={styles.error}>Postcode is invalid</Text>}
      </View>

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
          onBlur={() => {validateEmail(setEmailValid, email)}}
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
          onBlur={() => {validatePassword(setPasswordValid, password)}}
        />
        <TextInput
          value={postcode}
          style={styles.input}
          placeholder="Postcode"
          autoCapitalize="none"
          onChangeText={(text) => {
            setPostcode(text);
          }}
          onBlur={() => {validatePostcode(setPostcodeValid, postcode)}}
        />
        <TextInput
          value={avatar}
          style={styles.input}
          placeholder="Avatar URL"
          autoCapitalize="none"
          onChangeText={(text) => {
            setAvatarUrl(text);
          }}
          onBlur={() => {validateAvatarURL(setURLValid, avatar)}}
        />
        <TextInput
          value={description}
          style={styles.input}
          placeholder="Add a brief description of your business"
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
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1
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
    color: "red",
  },
});
