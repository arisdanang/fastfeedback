import React, { useState, useEffect, useContext, createContext } from 'react';
import {
  getAuth,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';

const authContext = createContext();

export function ProviderAuth({ children }) {
  const auth = useProviderAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export const useAuth = () => {
  return useContext(authContext);
};

function useProviderAuth() {
  const [user, setUser] = useState(null);
  console.log(user);
  const signinWithGithub = () => {
    const auth = getAuth();
    const provider = new GithubAuthProvider();

    return signInWithPopup(auth, provider).then((response) => {
      setUser(response.user);
      return response.user;
    });
  };

  const signOutVar = () => {
    const auth = new getAuth();

    return signOut(auth).then();
  };

  useEffect(() => {
    const auth = new getAuth();

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return {
    user,
    signinWithGithub,
    signOutVar
  };
}
