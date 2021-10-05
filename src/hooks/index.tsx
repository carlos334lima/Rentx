import React, { ReactNode } from "react";

//@utils
import { AuthProvider } from "./auth";

interface AppProviderProps {
  children: ReactNode;
}

export function AppProvider({ children }: AppProviderProps) {
  return <AuthProvider>{children}</AuthProvider>;
}
