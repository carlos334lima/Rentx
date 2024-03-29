import React from "react";

//@libraries
import { createStackNavigator } from "@react-navigation/stack";

//@screens
import { Home } from "../screens/Home";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { Confirmation } from "../screens/Confirmation";

export function AppStackRoutes() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator
      headerMode="none" //No header
      initialRouteName="Home"
    >
      <Screen name="Home" component={Home} />

      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="Confirmation" component={Confirmation} />
    </Navigator>
  );
}
