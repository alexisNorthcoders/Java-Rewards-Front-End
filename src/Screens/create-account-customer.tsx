import {
  Alert,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { postNewUser } from "../../utils/api";
import { useAccountContext } from "../contexts/AccountContext";

export default function CreateAccountCustomer() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const { accountType, setAccountType } = useAccountContext();

  const signUp = async () => {
    setLoading(true);

    if (email === "" || password === "") {
      setError("Email and password are mandatory.");
      setLoading(false);
      return;
    }

    try {
      setError("");
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const resNewUser = await postNewUser(name,  Number(age), email, avatar);

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
      Alert.alert("Sign up failed" + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      automaticallyAdjustKeyboardInsets={true}
      style={styles.form}
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Create An Account</Text>
      {error && (
        <View style={styles.error}>
          <Text>{error}</Text>
        </View>
      )}
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
          value={avatar}
          style={styles.input}
          placeholder="Avatar URL"
          autoCapitalize="none"
          onChangeText={(text) => {
            setAvatarUrl(text);
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
    flex: 1,
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
