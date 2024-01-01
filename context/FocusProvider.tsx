import React, { createContext, useEffect, useState } from "react";
import { AppState, AppStateStatus, Platform } from "react-native";

interface FocusContextProps {
  isFocused: boolean;
}

export const FocusContext = createContext<FocusContextProps>({
  isFocused: true, // Default value when the context is used outside its Provider
});

interface FocusProviderProps {
  children: React.ReactNode;
}

export const FocusProvider: React.FC<FocusProviderProps> = ({ children }) => {
  const [isFocused, setIsFocused] = useState(true);

  const onAppStateChange = (status: AppStateStatus) => {
    if (Platform.OS !== "web") {
      setIsFocused(status === "active");
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener("change", onAppStateChange);

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <FocusContext.Provider value={{ isFocused }}>
      {children}
    </FocusContext.Provider>
  );
};
