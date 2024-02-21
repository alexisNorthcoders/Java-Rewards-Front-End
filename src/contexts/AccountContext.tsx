import { createContext, PropsWithChildren, useContext, useState} from "react";

type AccountContextType = {
  accountType: string;
  setAccountType: (accountType: string) => void;
}

export const AccountContext = createContext<AccountContextType | undefined>(undefined);

export const UserProvider = ({children}: PropsWithChildren<{}>) => {
  const [accountType, setAccountType] = useState<AccountContextType["accountType"]>("");

  return (
    <AccountContext.Provider value={{accountType, setAccountType}}>
      {children}
    </AccountContext.Provider>
  )
}

export const useAccountContext = () => {
  const context = useContext(AccountContext)

  if (!context) {
    throw new Error("useUserContext must be used inside the UserProvider")
  }

  return context
}