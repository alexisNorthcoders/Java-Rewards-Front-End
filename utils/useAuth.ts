import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from '../src/config/firebase'
import { useEffect, useState } from "react";

export function useAuth() {
  const [user, setUser] = useState<User> ()

  useEffect(() => {
    const unsubscribeFromAuthChanged = onAuthStateChanged(auth, (user) => {
      if(user) {
        setUser(user)
      } else {
        setUser(undefined)
      }
    });
    return unsubscribeFromAuthChanged;

  },[])

  return {user}
}