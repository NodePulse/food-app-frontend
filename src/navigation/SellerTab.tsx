import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SellerDashboardScreen from '../screens/main/seller/SellerDashboardScreen';
import SellerMenuScreen from '../screens/main/seller/SellerMenuScreen';
import SellerAddNewItemScreen from '../screens/main/seller/SellerAddNewItemScreen';
import SellerNotificationScreen from '../screens/main/seller/SellerNotificationScreen';
import SellerProfileScreen from '../screens/main/seller/SellerProfileScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import OctIcon from 'react-native-vector-icons/Octicons';
import { COLORS } from '../constants/colors';

export type SellerBottomTabParamList = {
  Dashboard: undefined;
  Menu: undefined;
  AddNewItem: undefined;
  Notification: undefined;
  Profile: undefined;
};

const BottomTab = createBottomTabNavigator<SellerBottomTabParamList>();

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    style={{
      top: -30,
      justifyContent: 'center',
      alignItems: 'center',
      ...styles.shadow,
    }}
    onPress={onPress}
  >
    <View
      style={{
        width: 64,
        height: 64,
        borderRadius: 32,
        backgroundColor: '#FFFFFF',
        borderWidth: 4,
        borderColor: COLORS.default,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
);

export default function SellerTab() {
  return (
    <BottomTab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: COLORS.default,
        tabBarInactiveTintColor: '#A0A5BA',
        headerShown: true,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 0,
          height: Platform.OS === 'ios' ? 110 : 80,
        },
        headerTitleAlign: 'left',
        headerTitleStyle: {
          fontSize: 20,
          fontWeight: '400',
          color: '#181C2E',
          fontFamily: 'Sen',
          marginLeft: -10,
        },
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: Platform.OS === 'ios' ? 90 : 70,
          paddingTop: 10,
          borderTopWidth: 1,
          borderTopColor: '#F0F2F5',
          ...styles.shadow,
        },
        tabBarItemStyle: {
          height: Platform.OS === 'ios' ? 50 : 70,
          alignItems: 'center',
          justifyContent: 'center',
        },
      })}
    >
      <BottomTab.Screen
        name="Dashboard"
        component={SellerDashboardScreen}
        options={{
          title: 'Dashboard',
          headerShown: false,
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <Ionicons
              name={focused ? 'grid' : 'grid-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
      <BottomTab.Screen
        name="Menu"
        component={SellerMenuScreen}
        options={{
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <Ionicons
              name={focused ? 'restaurant' : 'restaurant-outline'}
              size={24}
              color={color}
            />
          ),
          title: 'My Food List',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: '#181C2E',
            fontFamily: 'Sen',
          },
        }}
      />
      <BottomTab.Screen
        name="AddNewItem"
        component={SellerAddNewItemScreen}
        options={{
          tabBarIcon: () => (
            <OctIcon name="plus" size={32} color={COLORS.default} />
          ),
          tabBarButton: (props: any) => <CustomTabBarButton {...props} />,
          title: 'Add New Items',
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: '#181C2E',
            fontFamily: 'Sen',
          },
        }}
      />
      <BottomTab.Screen
        name="Notification"
        component={SellerNotificationScreen}
        options={{
          title: 'Notifications',
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <Ionicons
              name={focused ? 'notifications' : 'notifications-outline'}
              size={24}
              color={color}
            />
          ),
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 20,
            color: '#181C2E',
            fontFamily: 'Sen',
          },
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={SellerProfileScreen}
        options={{
          headerShown: false,
          tabBarIcon: ({
            color,
            focused,
          }: {
            color: string;
            focused: boolean;
          }) => (
            <Ionicons
              name={focused ? 'person' : 'person-outline'}
              size={24}
              color={color}
            />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
