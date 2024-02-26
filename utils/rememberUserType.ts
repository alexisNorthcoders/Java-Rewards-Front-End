import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserType = async (accountType: string) => {
  try {
    await AsyncStorage.setItem('type', JSON.stringify(accountType))
    console.log('User type stored on log-in')
  } catch (err) {
    console.log('Error storing user type', err)
  }
}

export const storeUserEmail = async (email: string) => {
  try {
    await AsyncStorage.setItem('email', JSON.stringify(email))
    console.log('User email stored on log-in')
  }
  catch (err) {
    console.log('Error storing user email')
  }
}
  

export const getUserType = async () => {
  try {
    const type = JSON.parse(await AsyncStorage.getItem('type'))
    console.log('Getting account type')
    return type !== null ? {type} : {type: ''}
  } 
  catch (err) {
    console.log('Error getting account type')
    return null
  }
}

export const clearUserType = async () => {
  try {
    await AsyncStorage.removeItem('type')
    console.log('Account type cleared from storage')
  } 
  catch (err) {
    console.log('Error clearing account type from storage')
  }
}

export const getUserEmail = async () => {
  try {
    const email = JSON.parse(await AsyncStorage.getItem('email'))
    return email !== null ? {email} : {email: ''}
  } 
  catch (err) {
    console.log('Error getting account email')
    return null
  }
}

export const clearUserEmail = async () => {
  try {
    await AsyncStorage.removeItem('email')
    console.log('Account email cleared from storage')
  } 
  catch (err) {
    console.log('Error clearing account email from storage')
  }
}