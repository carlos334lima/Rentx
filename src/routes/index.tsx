import React from "react";

//@libraries
import { NavigationContainer } from "@react-navigation/native";

//@utils
import { AuthRoutes } from "./auth.routes";
import { AppTabRoutes } from "./app.tab.routes";
import { useAuth } from "../hooks/auth";

export function Routes() {
  const { user } = useAuth();


  return (
    <NavigationContainer>
      {user.id ? <AppTabRoutes /> : <AuthRoutes />}
    </NavigationContainer>
  );
}
