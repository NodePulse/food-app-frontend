import React from 'react';
import SplashScreen from '../screens/splash/SplashScreen';
import OnboardingScreen from '../screens/onboarding/OnboardingScreen';
import LoginScreen from '../screens/public/LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import SignUpScreen from '../screens/public/SignUpScreen';
import ForgotPasswordScreen from '../screens/public/ForgotPasswordScreen';
import VerificationScreen from '../screens/public/VerificationScreen';
import HomeScreen from '../screens/main/customer/HomeScreen';
import { useAuth } from '../context/AuthContext';
import { ActivityIndicator, View } from 'react-native';
import LocationAccessScreen from '../screens/main/LocationAccessScreen';

import SellerHomeScreen from '../screens/main/seller/SellerDashboardScreen';
import { usePermission } from '../context/PermissionContext';
import SellerTab from './SellerTab';

export type RootStackParamList = {
  Splash: undefined;
  Onboarding: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
  Verification: { email: string };
  Home: undefined;
  SellerHome: undefined;
  LocationAccess: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();
  const {
    isLocationGranted,
    hasInteractedWithLocation,
    isLoading: isPermissionLoading,
  } = usePermission();

  const isLoading = isAuthLoading || isPermissionLoading;

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#FF7622" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isAuthenticated ? (
        <>
          {(user?.role === 'SELLER' && !isLocationGranted) ||
          (user?.role === 'CUSTOMER' && !hasInteractedWithLocation) ? (
            <Stack.Screen
              name="LocationAccess"
              component={LocationAccessScreen}
            />
          ) : (
            <>
              {user?.role === 'CUSTOMER' ? (
                <Stack.Screen name="Home" component={HomeScreen} />
              ) : (
                <Stack.Screen name="SellerHome" component={SellerTab} />
              )}
            </>
          )}
        </>
      ) : (
        <>
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignUpScreen} />
          <Stack.Screen
            name="ForgotPassword"
            component={ForgotPasswordScreen}
          />
          <Stack.Screen name="Verification" component={VerificationScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default RootStack;
