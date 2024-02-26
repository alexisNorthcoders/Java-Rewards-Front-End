import React, { useEffect, useCallback, useState } from 'react';
import { SafeAreaView, StyleSheet, TextInput, Text, View, Button } from 'react-native';
import { useForm } from 'react-hook-form';
import { updateOffer } from "../../utils/feedapi"

const UpdateOffer = () => {
    const { register, handleSubmit, setValue } = useForm();
    const [isUpdated, setIsUpdated] = useState(false);

    const onSubmit = useCallback((formData) => {
        console.log(formData);
        updateOffer("mancunianbrew@example.com",formData).then((res)=> {
            setIsUpdated(true);
            console.log(res,"response")})
        

    }, []);

    const onChangeField = useCallback((name) => (text) => {
        setValue(name, text);
    }, []);

    useEffect(() => {
        register('description');
        register('img');
    }, [register]);

    return (<View style={styles.container}>
        <Text style={styles.title}>Update Offer</Text>
        <View style={{ flexDirection: "column" , alignItems:"center"}}><Text style={styles.subtitle}>Offer description: </Text><TextInput
            style={styles.input}

            placeholder="description"
            onChangeText={onChangeField('description')}
        /></View>
       <View style={{ flexDirection: "column" , alignItems:"center"}}>
       <Text style={styles.subtitle}>Image URL: </Text>
        <TextInput
            style={styles.input}
            placeholder="img url"
            onChangeText={onChangeField('img')}
        />

       </View>
      
        <Button title="Submit" onPress={handleSubmit(onSubmit)}  />
        {isUpdated && <Text style={styles.successText}>Offer updated successfully!</Text>}

    </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 20,
        width: 300,
        height:50
    },
 
    successText: {
        color: 'green',
        marginTop: 10,
        fontSize: 17,
    },
});

export default UpdateOffer;