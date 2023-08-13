import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from './Screens/HomeScreen';
import Business from './Screens/Business';
import Entertainment from './Screens/Entertainment';
import Health from './Screens/Health';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Tab = createBottomTabNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} options={{
          headerShown: false,
          tabBarIcon: (props) => (<MaterialCommunityIcons type='feather' name='home' size={25} color={props.color} />),
        }} />
        <Tab.Screen name="Business" component={Business} options={{
          headerShown: false,
          tabBarIcon: (props) => (<MaterialCommunityIcons type='feather' name='currency-usd' size={25} color={props.color} />),
        }} />
        <Tab.Screen name="Entertainment" component={Entertainment} options={{
          headerShown: false,
          tabBarIcon: (props) => (<MaterialCommunityIcons type='feather' name='camera-party-mode' size={25} color={props.color} />),
        }} />
        <Tab.Screen name="Health" component={Health} options={{
          headerShown: false,
          tabBarIcon: (props) => (<MaterialCommunityIcons type='feather' name='heart' size={25} color={props.color} />),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}