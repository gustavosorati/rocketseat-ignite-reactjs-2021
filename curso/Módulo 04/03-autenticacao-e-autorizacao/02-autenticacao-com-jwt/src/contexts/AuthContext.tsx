import { useRouter } from "next/router";
import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../services/api";
import { setCookie, parseCookies, destroyCookie } from 'nookies'


type User = {
  email: string;
  permissions: string;
  roles: string[];
}

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  signIn(credentials: SignInCredentials): Promise<void>;
  user: User;
  isAuthenticated: boolean;
}

type AuthProviderProps = {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const router = useRouter();
  const isAuthenticated = !!user;

  useEffect(() => {
    const { 'nextauth.token': token } = parseCookies();

    if(token){
      api.get('/me').then(response => {
        const { email, permissions, roles } = response.data

        setUser({email, permissions, roles});
      })
      .catch(() => {
        destroyCookie(undefined, 'nextauth.token')
        destroyCookie(undefined, 'nextauth.refreshToken')

        router.push('/')
      })
    }
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post('/sessions', {
        email,
        password
      })

      const { token, refreshToken, permissions, roles } = response.data;

      // Armazenar o token e refreshToken
      // localStorage - Como utilizamos next ele não é apenas browser, o que no lado do servidor não temos acesso
      // sessionStorage - Não ficará disponiveis em outras sessões
      // cookies - estrutura bem antiga dos browsers e pode ser acessado tanto do lado do browser como tbm no servidor

      setCookie(undefined, 'nextauth.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });
      
      setCookie(undefined, 'nextauth.refreshToken', refreshToken, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/'
      });

      setUser({
        email,
        permissions,
        roles
      })
      
      api.defaults.headers['Authorization'] = `Bearer ${token}`

      router.push('/dashboard');

      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <AuthContext.Provider value={{signIn, isAuthenticated, user }}>
      {children}  
    </AuthContext.Provider>
  )
}