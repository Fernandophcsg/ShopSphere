import { createContext, useCallback, useEffect, useState } from "react";

interface User {
  name: string;
  email: string;
}


interface AuthContextData {
  user: User | null;
  isLoggedin : boolean;
  signOut: () => void;
  setIsLoggedin : (value:boolean) => void;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }:{children:React.ReactNode}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoggedin, setIsLoggedin] = useState(false)
  useEffect(() => {
    const storagedUser = localStorage.getItem('@Auth:user');
    const storagedToken = localStorage.getItem('@Auth:token');

    if (storagedUser && storagedToken) {
      setUser(JSON.parse(storagedUser));
    }
  }, []);

 

  const signOut = useCallback(() => {
    localStorage.removeItem('@Auth:user');
    localStorage.removeItem('@Auth:token');

    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoggedin, setIsLoggedin , signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;