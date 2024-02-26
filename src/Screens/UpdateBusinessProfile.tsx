import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Button } from '@rneui/themed';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useState } from 'react'
import { updateShopData } from '../../utils/api';
import { useNavigation } from '@react-navigation/native';


const UpdateBusinessProfile = ({route}) => {
  const navigation = useNavigation()
  const [newDesc, setNewDesc] = useState('')
  const {shop} = route.params
  delete shop.name
  return (
    <SafeAreaView style={styles.form}>
      <Text>Add your business description below:</Text>
      <TextInput style={styles.input} value={newDesc} onChangeText={(text) => {setNewDesc(text)}}/>
      <Button
              title="Update"
              buttonStyle={{
                backgroundColor: 'rgba(78, 116, 289, 1)',
                borderRadius: 3,
              }}
              containerStyle={{
                width: 200,
                marginHorizontal: 50,
                marginVertical: 10,
              }}
              onPress={() => {
                console.log(shop)
                console.log(newDesc)
                updateShopData({...shop, description: newDesc })
              .then((navigation.navigate("Nav")))}}
            />
    </SafeAreaView>
  )
}

export default UpdateBusinessProfile

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#ECE1DD",
    borderRadius: 10,
    marginTop: 5,
    width: 300,
  }
}
)