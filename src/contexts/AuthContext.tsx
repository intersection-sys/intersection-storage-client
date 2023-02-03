import { destroyCookie, parseCookies, setCookie } from 'nookies';
import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { authenticate, validateToken } from '../services/api';
import { getUser } from '../services/api/Users'

interface AuthContextProps {
  logout: () => void;
  isAuthLoading: boolean;
  session: Session | null;
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  userPostUpdate: (newUserData?: Partial<User>) => Promise<void>;
  updateUser: (updatedUser: Partial<User>) => void;
}

interface AuthContextProviderProps {
  children: ReactNode;
}

interface Session {
  id: string;
  name: string;
  username: string;
  email: string;
  accessToken: string;
}



export const AuthContext = createContext({} as AuthContextProps);

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  useEffect(() => {
    (async function cookieAuthValidate() {
      const { 'intersection@accessToken': token } = parseCookies();
      console.log(token)

      if (token) {
        try {
          const auth = await validateToken(token);
          setSession({ ...auth, accessToken: token });

          const user = await getUser(auth.id, token);
          console.log(user, 'user f');

          setUser(user);
          // setIsAuthLoading(false);
        } catch (error) {
          setSession(null);
        }
      }
      setIsAuthLoading(false);
    })();
  }, []);

  async function userPostUpdate(newUserData?: Partial<User>) {
    if (!session || isAuthLoading || !user) return;
    setIsAuthLoading(true)

    if (!newUserData) {
      const user = await getUser(session.id, session.accessToken);
      setUser(user);
    } else {
      const newUser: User = { ...user, ...newUserData };
      setUser(newUser);
    }
    setIsAuthLoading(false);
  }

  function updateUser(updatedUser: Partial<User>) {
    if(!user) return;
    
    const newUser: User = {
      ...user,
      ...updatedUser
    };
    setUser(newUser);
  }

  async function login(username: string, password: string) {
    try {
      const { token, user: { id } } = await authenticate(username, password);
      const user = await getUser(id, token);
      setUser(user);

      if (!token) {
        setSession(null);
        destroyCookie(null, 'intersection@accessToken');
        throw new Error('Unauthorized!');
      }

      setSession({ ...user, accessToken: token })
      setCookie(null, 'intersection@accessToken', token, {
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: '/',
      })
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  function logout() {
    setSession(null);
    destroyCookie(null, 'intersection@accessToken');
  }

  return (
    <AuthContext.Provider value={{
      login,
      logout,
      userPostUpdate,
      updateUser,
      session,
      user,
      isAuthLoading,
    }}>
      {children}
    </AuthContext.Provider>
  );
}
