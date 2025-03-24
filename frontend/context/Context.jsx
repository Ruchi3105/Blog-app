import { createContext, useEffect, useReducer } from "react";
import Reducer from "./Reducer";

const INITIAL_STATE = {
  user: null,
  isFetching: false,
  error: false,
};

const Context = createContext(INITIAL_STATE);

const ContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/auth/me`, {
          method: "GET",
          credentials: "include",
        });
        const data = await res.json();
        if (data.user) {
          dispatch({ type: "LOGIN_SUCCESS", payload: data.user });
        }
      } catch (err) {
        dispatch({ type: "LOGIN_FAILURE" });
      }
    };
    fetchUser();
  }, []);

  return (
    <Context.Provider
      value={{
        user: state.user,
        isFetching: state.isFetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { Context, ContextProvider };
