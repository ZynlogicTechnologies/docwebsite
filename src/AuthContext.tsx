import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface User {
  id: number;
  username: string;
  email: string;
  phone_number: string;
  role: string;
  // Add other fields if needed
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  setUser: (user: User) => void;
  login: (user: User) => void;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user from cookie-based session on app load
  const fetchUser = async () => {
    try {
      const res = await fetch(
        "https://landing.docapp.co.in/api/auth/get-user-data",
        {
          credentials: "include",
        }
      );

      if (res.ok) {
        const data = await res.json();
        setUser(data.userData);
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
    } catch (error) {
      console.error("Fetch user failed:", error);
      setUser(null);
      setIsLoggedIn(false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const login = (user: User) => {
    setUser(user);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
    // clear cookie
    document.cookie = "token=; Max-Age=0; path=/;";
    window.location.href = "/auth";
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, user, setUser, login, logout, loading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return context;
};
