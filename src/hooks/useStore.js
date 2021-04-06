import { createContext, useContext, useReducer } from 'react';

export default function makeStore(userReducer, initialState, key) {
  const dispatchContext = createContext();
  const storeContext = createContext();

  try {
    initialState = JSON.parse(localStorage.getItem(key)) || initialState;
  } catch {}

  const reducer = (state, action) => {
    const newState = userReducer(state, action);
    localStorage.setItem(key, JSON.stringify(newState));
    return newState;
  };

  const StoreProvider = ({ children }) => {
    const [store, dispatch] = useReducer(reducer, initialState);

    return (
      <dispatchContext.Provider value={dispatch}>
        <storeContext.Provider value={store}>{children}</storeContext.Provider>
      </dispatchContext.Provider>
    );
  };

  const useDispatch = () => {
    const myContext = useContext(dispatchContext);
    if (myContext === undefined) {
      throw new Error('useDispatch must be used within a StoreProvider');
    }
    return myContext;
  };

  const useStore = () => {
    const myContext = useContext(storeContext);
    if (myContext === undefined) {
      throw new Error('useStore must be used within a StoreProvider');
    }
    return myContext;
  };
  return [StoreProvider, useDispatch, useStore];
}
