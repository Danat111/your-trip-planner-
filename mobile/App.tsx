import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { colors } from './src/theme/tokens';
import HomeScreen from './src/screens/HomeScreen';
import TripPlannerScreen from './src/screens/TripPlannerScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="dark" />
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary[600],
          tabBarInactiveTintColor: colors.neutral[500],
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ title: 'الرئيسية' }} />
        <Tab.Screen name="TripPlanner" component={TripPlannerScreen} options={{ title: 'خطط رحلة' }} />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{ title: 'حسابي' }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
