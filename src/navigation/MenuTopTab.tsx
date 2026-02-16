import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Dimensions } from 'react-native';
import SellerMenuList from '../components/SellerMenuList';
import { COLORS } from '../constants/colors';

const TopTab = createMaterialTopTabNavigator();
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function MenuTopTab() {
  const numTabs = 4;
  const tabWidth = SCREEN_WIDTH / numTabs;

  return (
    <TopTab.Navigator
      screenOptions={detail => {
        const labelWidth = detail.route.name.length * 8 + 10; // Dynamic width based on text
        return {
          tabBarActiveTintColor: COLORS.default,
          tabBarInactiveTintColor: '#646982',
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.default,
            height: 3,
            borderRadius: 10,
            width: labelWidth,
            marginLeft: (tabWidth - labelWidth) / 2,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '700',
            textTransform: 'none',
          },
          tabBarStyle: {
            elevation: 0,
            shadowOpacity: 0,
            borderBottomWidth: 1,
            borderBottomColor: '#F0F2F5',
          },
        };
      }}
    >
      <TopTab.Screen name="All" component={SellerMenuList} />
      <TopTab.Screen name="Breakfast" component={SellerMenuList} />
      <TopTab.Screen name="Lunch" component={SellerMenuList} />
      <TopTab.Screen name="Dinner" component={SellerMenuList} />
    </TopTab.Navigator>
  );
}
