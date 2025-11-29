import { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import axios from "axios";

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const auth = getAuth();

  const [firebaseUser, setFirebaseUser] = useState(null);
  const [idToken, setIdToken] = useState(null);
  const [mongoUser, setMongoUser] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);

  const provider = new GoogleAuthProvider();

  // GOOGLE LOGIN FUNCTION (fixing your GLogin.jsx error)
  const signInWithGoogle = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const user = res.user;

      const token = await user.getIdToken();

      await axios.post(
        "http://localhost:5000/api/auth/sync-google-user",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return user;
    } catch (err) {
      console.error("Google login failed:", err);
      throw err;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setFirebaseUser(null);
        setIdToken(null);
        setMongoUser(null);
        setAuthLoading(false);
        return;
      }

      setFirebaseUser(user);

      const token = await user.getIdToken();
      setIdToken(token);

      try {
        const res = await axios.post(
          "http://localhost:5000/api/auth/sync-google-user",
          {},
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setMongoUser(res.data.user);
      } catch (err) {
        console.error("Sync error:", err.response?.data || err.message);
      }

      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        firebaseUser,
        idToken,
        mongoUser,
        authLoading,
        signInWithGoogle
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
