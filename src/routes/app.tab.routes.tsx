import React from "react";
import { Platform } from "react-native";

//@libraries
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

//@assets
import HomeSvg from "../assets/home.svg";
import PeopleSvg from "../assets/people.svg";
import CarSvg from "../assets/car.svg";

//@screens
import { MyCars } from "../screens/MyCars";
import { Profile } from "../screens/Profile";
import { AppStackRoutes } from "./app.stack.routes";

//@styles
import theme from "../styles/theme";

export function AppTabRoutes() {
  const { Navigator, Screen } = createBottomTabNavigator();

  return (
    <Navigator
      tabBarOptions={{
        activeTintColor: theme.colors.main,
        inactiveTintColor: theme.colors.text_detail,
        showLabel: false,
        style: {
          paddingVertical: Platform.OS === "ios" ? 0 : 0,
          height: 70,
          backgroundColor: theme.colors.background_primary,
        },
      }}
    >
      <Screen
        name="Home"
        component={AppStackRoutes}
        options={{
          tabBarIcon: ({ color }) => (
            <HomeSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <PeopleSvg width={24} height={24} fill={color} />
          ),
        }}
      />
      <Screen
        name="MyCars"
        component={MyCars}
        options={{
          tabBarIcon: ({ color }) => (
            <CarSvg width={24} height={24} fill={color} />
          ),
        }}
      />
    </Navigator>
  );
}
