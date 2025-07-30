import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type AuthProps = {
  children: React.ReactNode;
};

type AuthState = {
  loggedIn: null | boolean;
  loading: boolean;
};

const AuthContext = createContext<AuthState>({ loggedIn: null, loading: true });

const endpointUrl = "/api/auth/user";

export const AuthProvider = ({ children }: AuthProps) => {
  const [loggedIn, setLoggedIn] = useState<AuthState["loggedIn"]>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(endpointUrl, { credentials: "include" })
      .then((res) => {
        if (res.status === 200) {
          setLoggedIn(true);
        } else if (res.status === 403) {
          setLoggedIn(false);
        } else {
          throw new Error(`AuthProvider can't fetch from ${endpointUrl}.`);
        }
      })
      .catch(() => {
        setLoggedIn(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const contextValue = useMemo(
    () => ({ loggedIn, loading }),
    [loggedIn, loading],
  );

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
