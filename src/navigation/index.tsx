import { useAuth } from "../../utils/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { useAccountContext } from "../contexts/AccountContext";
import BusinessStack from "./BusinessStack";
import { useEffect, useState } from "react";
import { getUserType } from "../../utils/rememberUserType";
import { View, Text } from "react-native";
import LoadingStack from "./LoadingStack";

export default function RootNavigation() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true)

  const {accountType, setAccountType} = useAccountContext()

    useEffect(() => {
      const fetchTypeFromStorage = async () => {
        try {
          const {type} = await getUserType()
          console.log(type)
          setAccountType(type)
          setIsLoading(false)
        }
        catch (err) {
          setIsLoading(false)
          console.log("Error fetching account type")
        }
      }

      fetchTypeFromStorage()
    }, [])

    if (isLoading) {
      return <LoadingStack/>
    } else if (!isLoading && user && accountType === 'Business') {
        return <BusinessStack />
      } else if (!isLoading && user && accountType === 'Customer') {
        return <UserStack />
      } else {
        return <AuthStack/>
      }
  

  

}