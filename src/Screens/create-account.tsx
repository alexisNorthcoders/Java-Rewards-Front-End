import { Alert, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import { auth } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export default function CreateAccount() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [avator, setAvatorUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("")

    const signUp = async () => {
        setLoading(true)
    
        if(email === "" || password === "") {
          setError("Email and password are mandatory.")
          setLoading(false)
          return
        }
    
        try {
          setError("")
          const res = await createUserWithEmailAndPassword(auth, email, password)
    
          Alert.alert("You've successfully registered!")
        }
        catch (err: any) {
          console.log(err)
          Alert.alert("Sign up failed" + err.message)
        } 
        finally {
          setLoading(false)
        }
      }

    return(
        <View style={styles.form}>
            <Text>Create An Account</Text>
            <View>
                <TextInput
            value={name}
            style={styles.input}
            placeholder="Name"
            autoCapitalize="none"
            onChangeText={(text) => {
                setName(text);
            }}/>
            <TextInput
            value={email}
            style={styles.input}
            placeholder="Email"
            autoCapitalize="none"
            onChangeText={(text) => {
                setEmail(text);
            }}/>
            <TextInput
            value={password}
            style={styles.input}
            secureTextEntry={true}
            placeholder="Password"
            autoCapitalize="none"
            onChangeText={(text) => {
                setPassword(text);
            }}/>
            <TextInput
            value={avator}
            style={styles.input}
            placeholder="Avator"
            autoCapitalize="none"
            onChangeText={(text) => {
                setAvatorUrl(text);
            }}/>
            <TouchableOpacity
              onPress={signUp}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutlineText}>Register</Text>
            </TouchableOpacity>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    input: {
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: "#ECE1DD",
        borderRadius: 10,
        marginTop: 5,
        width: 300
      },
      button: {
        backgroundColor: "#bf6240",
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: "center"
      },
      buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: "#bf6240",
        borderWidth: 2,
      },
      buttonOutlineText: {
        color: "#bf6240",
        fontWeight: '700',
        fontSize: 16,
      },
})