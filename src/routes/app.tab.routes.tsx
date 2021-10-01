import React from "react";

//@libraries
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//@screens
import { Home } from "../screens/Home";
import { MyCars } from "../screens/MyCars";
import { AppStackRoutes } from "./app.stack.routes";

export function AppTabRoutes() {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <Navigator>
      <Screen name="Home" component={AppStackRoutes} />
      <Screen name="Profile" component={Home} />
      <Screen name="MyCars" component={MyCars} />
    </Navigator>
  );
}
