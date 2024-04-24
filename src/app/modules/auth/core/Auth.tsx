import {
  FC,
  useState,
  useEffect,
  createContext,
  useContext,
  useRef,
  Dispatch,
  SetStateAction,
} from 'react'
import { LayoutSplashScreen } from '../../../../_metronic/layout/core'
import { AuthModel, UserModel } from './_models'
import * as authHelper from './AuthHelpers'
import { getUserByToken } from './_requests'

type AuthContextProps = {
  auth: AuthModel | undefined
  saveAuth: (auth: AuthModel | undefined) => void
  currentUser: UserModel | undefined
  setCurrentUser: Dispatch<SetStateAction<UserModel | undefined>>
  saveCurrentUser: (user: UserModel | undefined) => void
  logout: () => void,
  currentLocation: string | undefined,
  setCurrentLocation: (location: string | undefined) => void
}

const initAuthContextPropsState = {
  auth: authHelper.getAuth(),
  saveAuth: () => { },
  currentUser: undefined,
  setCurrentUser: () => { },
  saveCurrentUser: () => { },
  logout: () => { },
  currentLocation : undefined,
  setCurrentLocation: () => { }
}

const AuthContext = createContext<AuthContextProps>(initAuthContextPropsState);

// Custom hook for using AuthContext
const useAuth = () => {
  return useContext(AuthContext);
};

// AuthProvider component
const AuthProvider: FC = ({ children }) => {
  const [auth, setAuth] = useState<AuthModel | undefined>(authHelper.getAuth());
  const [currentUser, setCurrentUser] = useState<UserModel | undefined>();
  const [currentLocation, setCurrentLocation] = useState<string | undefined>();

  const saveAuth = (auth: AuthModel | undefined) => {
    setAuth(auth);
    if (auth) {
      authHelper.setAuth(auth);
    } else {
      authHelper.removeAuth();
    }
  };

  const saveCurrentUser = (user: UserModel | undefined) => {
    if (user) {
      setCurrentUser(user);
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      setCurrentUser(undefined);
      localStorage.removeItem('currentUser');
    }
  };

  const logout = () => {
    saveAuth(undefined);
    saveCurrentUser(undefined);
  };

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      saveCurrentUser(JSON.parse(currentUser));
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, saveAuth, currentUser, setCurrentUser, saveCurrentUser, logout , currentLocation, setCurrentLocation }}>
      {children}
    </AuthContext.Provider>
  );
};

// const AuthInit: FC = ({children}) => {
//   const {auth, logout, setCurrentUser} = useAuth()
//   const didRequest = useRef(false)
//   const [showSplashScreen, setShowSplashScreen] = useState(true)
//   // We should request user by authToken (IN OUR EXAMPLE IT'S API_TOKEN) before rendering the application
//   useEffect(() => {
//     const requestUser =  (apiToken: string) => {
//       try {
//         if (!didRequest.current) {
//           const {data} =  getUserByToken(apiToken) 
//           // if (data) {
//             const userObject: UserModel = {
//               name: 'sfdsf',
//               id: 123,
//               password: "hashed_password", // You should use a secure password hashing mechanism
//               email: "john.doe@example.com",
//               image: "",
//               role: 0,

//               auth: {
//                 access_token: "your_access_token",
//                 refreshToken: "your_refresh_token",
//               },

//             };

//             setCurrentUser(userObject)
//           // }
//         }
//       } catch (error) {
//         console.error(error)
//         if (!didRequest.current) {
//           logout()
//         }
//       } finally {
//         setShowSplashScreen(false)
//       }

//       return () => (didRequest.current = true)
//     }

//     if (auth && auth.access_token) {
//       requestUser(auth.access_token)
//     } else {
//       logout()
//       setShowSplashScreen(false)
//     }
//     // eslint-disable-next-line
//   }, [])

//   return showSplashScreen ? <LayoutSplashScreen /> : <>{children}</>
// }



export { AuthProvider, useAuth }
