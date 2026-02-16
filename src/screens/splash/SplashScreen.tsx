import { View, StyleSheet, Image, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStack';
import { StackNavigationProp } from '@react-navigation/stack';
import version from '../../../version.json';

const SplashScreen = () => {
  const [showEllipses, setShowEllipses] = useState(false);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  useEffect(() => {
    // Show logo only for 2 seconds, then show ellipses
    const ellipseTimer = setTimeout(() => {
      setShowEllipses(true);
    }, 2000);

    // After another 2 seconds, move to onboarding
    const finishTimer = setTimeout(() => {
      navigation.replace('Onboarding');
    }, 4000);

    return () => {
      clearTimeout(ellipseTimer);
      clearTimeout(finishTimer);
    };
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.debugText}>App Loading...</Text>
      <View style={styles.logoContainer}>
        <Image
          source={require('../../../assets/images/app_logo.png')}
          style={styles.logo}
        />
      </View>
      {showEllipses && (
        <View style={StyleSheet.absoluteFill} pointerEvents="none">
          <Image
            source={require('../../../assets/images/ellipse_1005.png')}
            style={styles.ellipse1}
          />
          <Image
            source={require('../../../assets/images/ellipse_1006.png')}
            style={styles.ellipse2}
          />
        </View>
      )}
      <Text style={styles.versionText}>Version {version.versionName}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  debugText: {
    position: 'absolute',
    top: 50,
    color: '#FF7622',
    fontSize: 18,
    fontWeight: 'bold',
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 1, // Ensure logo is above ellipses
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  ellipse1: {
    width: 250,
    height: 250,
    position: 'absolute',
    resizeMode: 'contain',
    left: -50,
    top: -50,
  },
  ellipse2: {
    width: 300,
    height: 300,
    position: 'absolute',
    resizeMode: 'contain',
    right: -50,
    bottom: -50,
  },
  versionText: {
    position: 'absolute',
    bottom: 50,
    color: '#2a2928ff',
    fontSize: 18,
    fontWeight: '500',
  },
});

export default SplashScreen;
