import { Button, Colors, View, Text, Image } from "react-native-ui-lib";
import { StyleSheet, ImageBackground } from "react-native";
import { useNavigation } from "@react-navigation/native";
import background from "../Images/coffee-background.jpeg";
import { useAccountContext} from "../contexts/AccountContext";
import { StackNavigationProp } from "@react-navigation/stack";
import logo from '../Images/7AiXuD-LogoMakr.png'

type StackNavigationList = {
  Login: undefined
}

export default function IntroPage() {

  const navigation = useNavigation<StackNavigationProp<StackNavigationList>>();
  const { accountType, setAccountType } = useAccountContext();

  return (
    <View style={styles.root}>
      <ImageBackground
        source={background}
        style={styles.container}
        imageStyle={styles.image}
      >
        <Image source={logo}/>
        <View>
        <Button
          label={"Customer"}
          size={Button.sizes.large}
          style={{backgroundColor: '#bf6240', marginBottom: 40}}
          text60BO
          onPress={() => {
            navigation.navigate("Login");
            setAccountType("Customer");
          }}
        />
        <Button
          label={"Business"}
          size={Button.sizes.large}
          backgroundColor={"#bf6240"}
          text60BO
          onPress={() => {
            navigation.navigate("Login");
            setAccountType("Business");
          }}
        />
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, width: "100%" },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
  },
  image: {
    opacity: 0.2,
  },
});
