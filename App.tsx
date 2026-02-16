import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './src/context/AuthContext';
import { PermissionProvider } from './src/context/PermissionContext';
import RootStack from './src/navigation/RootStack';

const queryClient = new QueryClient();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <PermissionProvider>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <GestureHandlerRootView style={{ flex: 1 }}>
            <SafeAreaProvider style={{ flex: 1 }}>
              <StatusBar
                barStyle={isDarkMode ? 'light-content' : 'dark-content'}
                backgroundColor="transparent"
                translucent
                networkActivityIndicatorVisible={true}
              />
              <NavigationContainer>
                <RootStack />
              </NavigationContainer>
            </SafeAreaProvider>
          </GestureHandlerRootView>
        </QueryClientProvider>
      </AuthProvider>
    </PermissionProvider>
  );
}

export default App;
