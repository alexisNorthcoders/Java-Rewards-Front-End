import { useAuth } from "../../utils/useAuth";
import UserStack from "./userStack";
import AuthStack from "./authStack";
import { useAccountContext } from "../contexts/AccountContext";
import BusinessStack from "./BusinessStack";

export default function RootNavigation() {
  const { user } = useAuth();

  const {accountType} = useAccountContext()

  if (user && accountType === 'Business') {
    return <BusinessStack />
  } else if (user && accountType === 'Customer') {
    return <UserStack />
  } else {
    return <AuthStack/>
  }

}