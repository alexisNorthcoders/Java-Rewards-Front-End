import { Alert, TextInput, StyleSheet } from 'react-native'
import { Button, Card } from '@rneui/themed';
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
      <Card containerStyle={styles.card}>
        <Card.Title style={styles.title}>Add your new business description</Card.Title>
        <Card.Divider color='#fff'/>
        <TextInput 
        placeholder="e.g. Serving speciality coffees and teas"
        style={styles.input} 
        value={newDesc} 
        onChangeText={(text) => {setNewDesc(text)}}
        multiline={true}
        />
        <Button
                title="Update"
                raised={true}
                titleStyle={{color: "#bf6420"}}
                buttonStyle={{
                  backgroundColor: '#fff',
                  borderRadius: 3,
                }}
                containerStyle={{
                  width: 150,
                  marginHorizontal: 80,
                  marginVertical: 20,
                }}
                onPress={() => {
                  if(!newDesc) {
                    Alert.alert('All fields must be completed')
                  } else {
                    updateShopData({...shop, description: newDesc })
                  .then((navigation.navigate("Nav"))

                  )
                  .catch((err) => {
                    console.log(err)
                    Alert.alert('Something went wrong. Please try again.')
                  })}}
                  

                  }
              />

      </Card>
    </SafeAreaView>
  )
}

export default UpdateBusinessProfile

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#f5ece4"
  },
  container: {
    justifyContent: 'space-between'
  },
  input: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginTop: 5,
    marginBottom: 10,
    width: 300,
    borderColor: "brown",
    borderWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center'
  },
  card: {
    borderRadius: 8,
    backgroundColor: "#bf6240"
  }
}
)