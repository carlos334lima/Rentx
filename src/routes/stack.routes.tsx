import React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { Home } from "../screens/Home";
import { MyCars } from "../screens/MyCars";
import { CarDetails } from "../screens/CarDetails";
import { Scheduling } from "../screens/Scheduling";
import { SchedulingDetails } from "../screens/SchedulingDetails";
import { SchedulingComplete } from "../screens/SchedulingComplete";
import { Splash } from "../screens/Splash";
import SignIn from "../screens/SignIn";

export function StackRoutes() {
  const { Navigator, Screen } = createStackNavigator();

  return (
    <Navigator
      headerMode="none" //No header
      initialRouteName="SignIn"
    >
      <Screen name="Splash" component={Splash} />
      <Screen name="Home" component={Home} options={{
        gestureEnabled: false,
      }} />
      <Screen name="SignIn" component={SignIn} />
      <Screen name="MyCars" component={MyCars} />
      <Screen name="CarDetails" component={CarDetails} />
      <Screen name="Scheduling" component={Scheduling} />
      <Screen name="SchedulingDetails" component={SchedulingDetails} />
      <Screen name="SchedulingComplete" component={SchedulingComplete} />
    </Navigator>
  );
}
