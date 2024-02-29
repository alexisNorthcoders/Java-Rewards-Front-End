import {
  Alert,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  ImageBackground,
  Button,
} from "react-native";
import { Text } from "@rneui/themed";
import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { postNewShop } from "../../utils/api";
import * as Location from "expo-location";
import {
  validateAvatarURL,
  validateEmail,
  validatePassword,
  validatePostcode,
} from "../../utils/formValidation";
import { SafeAreaView } from "react-native-safe-area-context";
import background from "../Images/coffee-background.jpeg";
import { storeUserEmail, storeUserType } from "../../utils/rememberUserType";
import { useAccountContext } from "../contexts/AccountContext";
import { Octicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

export default function CreateAccountBusiness() {
  const [name, setName] = useState("");
  const { accountType } = useAccountContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatarUrl] = useState("");
  const [description, setDescription] = useState("");
  const [postcode, setPostcode] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [urlValid, setURLValid] = useState(true);
  const [postcodeValid, setPostcodeValid] = useState(true);
  const [allFieldsComplete, setAllFieldsComplete] = useState(true);

  const geoCode = async () => {
    const geoCodedLocation = await Location.geocodeAsync(postcode);

    return {
      lat: geoCodedLocation[0].latitude,
      long: geoCodedLocation[0].longitude,
    };
  };

  const signUp = async () => {
    setLoading(true);
    const location = await geoCode();

    try {
      console.log(email);
      console.log(accountType);
      await storeUserType(accountType);
      await storeUserEmail(email);
      const resNewShop = await postNewShop(
        name,
        email,
        location.lat,
        location.long,
        description,
        avatar
      );
      const res = await createUserWithEmailAndPassword(auth, email, password);

      setName("");
      setEmail("");
      setPassword("");
      setAvatarUrl("");
      setDescription("");

      if (res && resNewShop) {
        Alert.alert("You've successfully registered!");
      }
    } catch (err: any) {
      console.log(err);
      Alert.alert("Sign up failed, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        style={styles.form}
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <ImageBackground
          source={background}
          style={styles.container}
          imageStyle={styles.image}
        >
          <Text h4 style={{ color: "#bf6240" }}>
            Create a Business Account
          </Text>

          <View style={styles.errContainer}>
            {!allFieldsComplete && (
              <Text style={styles.error}>All fields must be completed</Text>
            )}
            {!emailValid && <Text style={styles.error}>Email is invalid</Text>}
            {!passwordValid && (
              <Text style={styles.error}>
                Password should be at least 6 characters
              </Text>
            )}
            {!urlValid && <Text style={styles.error}>URL is invalid</Text>}
            {!postcodeValid && (
              <Text style={styles.error}>Postcode is invalid</Text>
            )}
          </View>

          <View>

          <View style={styles.singleInput}>
            <FontAwesome name="pencil" size={20} color="#BF6240" />
            <TextInput
              value={name}
              style={styles.input}
              placeholder="Business Name"
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={(text) => {
                setName(text);
              }}
            />
          </View>

          <View style={styles.singleInput}>
            <Octicons name="mail" size={17} color="#BF6240" />
            <TextInput
              value={email}
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={(text) => {
                setEmail(text);
              }}
              onBlur={() => {
                validateEmail(setEmailValid, email);
              }}
            />
          </View>

          <View style={styles.singleInput}>
            <FontAwesome name="key" size={17} color="#BF6240" />
            <TextInput
              value={password}
              style={styles.input}
              secureTextEntry={true}
              placeholder="Password"
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={(text) => {
                setPassword(text);
              }}
              onBlur={() => {
                validatePassword(setPasswordValid, password);
              }}
            />
          </View>
            
          <View style={styles.singleInput}>
            <Octicons name="location" size={20} color="#BF6240" />
            <TextInput
              value={postcode}
              style={styles.input}
              placeholder="Postcode"
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={(text) => {
                setPostcode(text);
              }}
              onBlur={() => {
                validatePostcode(setPostcodeValid, postcode);
              }}
            />
          </View>

          <View style={styles.singleInput}>
            <FontAwesome name="file-image-o" size={19} color="#BF6240" />
            <TextInput
              value={avatar}
              style={styles.input}
              placeholder="Avatar URL"
              placeholderTextColor="grey"
              autoCapitalize="none"
              onChangeText={(text) => {
                setAvatarUrl(text);
              }}
              onBlur={() => {
                validateAvatarURL(setURLValid, avatar);
              }}
            />
          </View>

          <View style={styles.singleInput}>
          <FontAwesome name="file-text" size={19} color="#BF6240" />
              <TextInput
                value={description}
                style={styles.input}
                placeholder="Add a business description"
                placeholderTextColor="grey"
                autoCapitalize="none"
                onChangeText={(text) => {
                  setDescription(text);
                }}
              />
          </View>
          </View>

          <View style={styles.buttonContainer}>
            {loading ? (
              <ActivityIndicator size="large" color="0000ff" />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  if (
                    !name ||
                    !postcode ||
                    !email ||
                    !avatar ||
                    !password ||
                    !emailValid ||
                    !passwordValid ||
                    !urlValid ||
                    !postcodeValid
                  ) {
                    setAllFieldsComplete(false);
                  } else {
                    setAllFieldsComplete(true);
                    signUp();
                  }
                }}
                style={[styles.button, styles.buttonOutline]}
              >
                <Text style={styles.buttonOutlineText}>Register</Text>
              </TouchableOpacity>
            )}
          </View>
        </ImageBackground>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#ECE1DD",
    borderRadius: 10,
    marginTop: 5,
    width: 270,
    borderColor: "brown",
    borderWidth: 1,
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
    marginTop: 1,
    padding: 1,
    color: "red",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  image: {
    opacity: 0.2,
  },
  errContainer: {
    marginTop: 2,
  },
  singleInput: {
    flexDirection: 'row', 
    alignItems: 'center',
    gap: 5
  }
});
