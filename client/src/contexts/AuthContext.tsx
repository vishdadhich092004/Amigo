import { createContext, useContext } from "react";
import { useQuery } from "react-query";
import { validateToken } from "../api-clients";
import { UserType } from "../../../server/shared/types";

// type of the AuthContext
type AuthContextType = {
  user: UserType | null;
  isAuthenticated: boolean;
  refetchUser: () => void;
};

// creating an authContext which is undefined for the first time
const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("Auth Provider is absent");
  }
  return context;
};

// creatign a wrapper for main.tsx
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data, refetch } = useQuery("validate-token", validateToken, {
    retry: false,
  });

  const user = data?.user || null;
  const isAuthenticated = Boolean(user);

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, refetchUser: refetch }}
    >
      {children}
    </AuthContext.Provider>
  );
};
