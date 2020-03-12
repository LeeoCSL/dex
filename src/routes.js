  
import {
  createSwitchNavigator,

  createAppContainer
} from "react-navigation";

import { createStackNavigator } from 'react-navigation-stack'

import Search from "./pages/search";
import Dex from "./pages/dex";
import Ability from "./pages/Ability";

const Routes = createAppContainer(
  createStackNavigator({
    Search,
    Dex,
    Ability
   
  })
);

export default Routes;