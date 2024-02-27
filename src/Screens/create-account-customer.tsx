import {
  Alert,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ImageBackground,
  ScrollView,
} from "react-native";
import { Text } from "@rneui/themed";
import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { postNewUser } from "../../utils/api";
import { validateEmail, validateAvatarURL, validatePassword } from "../../utils/formValidation";
import background from "../Images/coffee-background.jpeg";
import { SafeAreaView } from "react-native-safe-area-context";

export default function CreateAccountCustomer() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailValid, setEmailValid] = useState(true);
  const [passwordValid, setPasswordValid] = useState(true);
  const [urlValid, setURLValid] = useState(true);
  const [allFieldsComplete, setAllFieldsComplete] = useState(true)



  interface FormErrType {
    email: string;
    password: string;
  }

  const signUp = async () => {
    setLoading(true);

    try {
      setError("");
      const res = await createUserWithEmailAndPassword(auth, email, password);
      
      const resNewUser = await postNewUser(name, Number(age), email, avatar);

      setName("");
      setAge("");
      setEmail("");
      setPassword("");
      setAvatarUrl("");

      if (res && resNewUser) {
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
    <SafeAreaView style={{flex: 1}}>

    
      <ScrollView
        automaticallyAdjustKeyboardInsets={true}
        style={styles.form}
        contentContainerStyle={{
          flex: 1
        }}
      >
        <ImageBackground
          source={background}
          style={styles.container}
          imageStyle={styles.image}
        >

        <Text h4 style={{color: "#bf6240"}}>Create An Account</Text>

        <View style={styles.errContainer}>
          {!allFieldsComplete && <Text style={styles.error}>All fields must be completed</Text>}
            {!emailValid && <Text style={styles.error}>Email is invalid</Text>}
            {!passwordValid && (
              <Text style={styles.error}>
                Password should be at least 6 characters
              </Text>
            )}
          {!urlValid && <Text style={styles.error}>URL is invalid</Text>}
        </View>

        <View>
          <TextInput
            value={name}
            style={styles.input}
            placeholder="Name"
            autoCapitalize="none"
            onChangeText={(text) => {
              setName(text);
            }}
          />
          <TextInput
            value={age}
            style={styles.input}
            placeholder="Age"
            
            keyboardType="numeric"
            autoCapitalize="none"
            onChangeText={(text) => {
              setAge(text);
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
            value={avatar}
            style={styles.input}
            placeholder="Avatar URL"
            autoCapitalize="none"
            onChangeText={(text) => {
              setAvatarUrl(text);
            }}
            onBlur={() => {validateAvatarURL(setURLValid, avatar)}}
          />
        </View>

        <View style={styles.buttonContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="0000ff" />
          ) : (
            <TouchableOpacity
              onPress={ () => {
                if(!name || !age || !email || !avatar || !password || !emailValid || !passwordValid || !urlValid) {
                    setAllFieldsComplete(false)
                } else {
                  setAllFieldsComplete(true)
                  signUp()}

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
    width: 300,
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
    margin: 1,
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
    marginTop: 2
  }
});
