// AuthContext.js
import { createContext, useContext, useReducer } from 'react';

// Initial state for authentication
const initialState = {
  isAuthenticated: false,
  userId: null,
};

// Define actions for the reducer
const AuthActionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
};

// Reducer function to handle actions
const authReducer = (state, action) => {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.userId,
      };
    case AuthActionTypes.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

// Create the AuthContext
const AuthContext = createContext();

// AuthProvider component to wrap your app
export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Actions to be used by components
  const login = (userId) => {
    dispatch({ type: AuthActionTypes.LOGIN, payload: { userId } });
  };

  const logout = () => {
    dispatch({ type: AuthActionTypes.LOGOUT });
  };

  return (
    <AuthContext.Provider value={{ state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to access the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};