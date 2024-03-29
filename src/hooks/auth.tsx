import { AxiosError } from "axios";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

//@utils
import { api } from "../services/api";
import { database } from "../database";
import { User as ModelUser } from "../database/models/user";

interface User {
  id: string;
  user_id: string;
  email: string;
  name: string;
  driver_license: string;
  avatar: string;
  token: string;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  updateUser: (user: User) => Promise<void>;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useState<User>({} as User);

  useEffect(() => {
    async function loadData() {
      const userCollection = database.get("users");
      const response = await userCollection.query().fetch();

      if (response.length > 0) {
        const userData = response[0]._raw as unknown as User;
        api.defaults.headers.authorization = `Bearer ${userData.token}`;

        setData(userData);
      }
    }

    loadData();
  }, []);

  async function signIn({ email, password }: SignInCredentials) {
    try {
      const response = await api.post("/sessions", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        api.defaults.headers.authorization = `Bearer ${token}`;

        const userCollection = database.get<ModelUser>("users");
        await database.action(async () => {
          /* create new User - database */
          await userCollection.create((newUser) => {
            newUser.user_id = user.id;
            newUser.name = user.name;
            newUser.email = user.email;
            newUser.driver_license = user.driver_license;
            newUser.avatar = user.avatar;
          });
        });

        setData({ ...user, token });
      }
    } catch (error: AxiosError | any) {
      throw new Error(error);
    }
  }

  async function signOut() {
    try {
      const userCollection = database.get("users");
      await database.action(async () => {
        const userSelect = await userCollection.find(data.id);
        await userSelect.destroyPermanently();
      });
      setData({} as User);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateUser(user: User) {
    try {
      const userCollection = database.get<ModelUser>("users");

      await database.action(async () => {
        const userSelected = await userCollection.find(user.id);
        await userSelected.update((userData) => {
          userData.name = user.name;
          userData.avatar = user.avatar;
          userData.driver_license = user.driver_license;
        });
      });

      setData(user);
    } catch (error: any) {
      throw new Error(error);
    }
  }

  return (
    <AuthContext.Provider value={{ user: data, signIn, signOut, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

//hook
function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
