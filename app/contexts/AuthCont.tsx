"use client";

import { useRouter } from "next/navigation";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

import { authClient } from "@/lib/auth-client";

type TUser = {
  id: string;
  name: string | null;
  email: string;
  emailVerified: boolean;
  image?: string | null;
  createdAt: Date;
  updatedAt: Date;
};

interface IAuthContextProps {
  session: boolean | null;
  loading: boolean;
  user: TUser | null;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextProps>({
  session: null,
  user: null,
  loading: true,
  logout: () => {},
});

//provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<boolean | null>(null);
  const [user, setUser] = useState<TUser | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  //busca se tem user logado
  useEffect(() => {
    async function getUserSession() {
      try {
        const { data } = await await authClient.getSession();
        if (!data?.session) {
          setSession(false);
          setUser(null);
        } else {
          setSession(true);
          setUser(data?.user);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    getUserSession();
  }, []);

  async function logout() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setSession(false);
          router.replace("/");
          toast.success("Sessão encerrada. Volte sempre que quiser!");
        },
      },
    });
  }

  return (
    <AuthContext.Provider value={{ session, loading, user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

//hook
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider"');

  return context;
};
