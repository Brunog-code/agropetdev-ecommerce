import { authClient } from "@/lib/auth-client";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface IAuthContextProps {
  session: boolean | null;
  loading: boolean;
  logout: () => void;
}

const AuthContext = createContext<IAuthContextProps>({
  session: null,
  loading: true,
  logout: () => {},
});

//provider
export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  //busca se tem user logado
  useEffect(() => {
    async function getUserSession() {
      try {
        const { data } = await await authClient.getSession();
        if (!data?.session) {
          setSession(false);
        } else {
          setSession(true);
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
    <AuthContext.Provider value={{ session, loading, logout }}>
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
