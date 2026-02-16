import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { usePermission } from '../../context/PermissionContext';

import { useAuth } from '../../context/AuthContext';

export default function LocationAccessScreen() {
  const { user } = useAuth();
  const { requestPermission, skipLocationPermission } = usePermission();

  const isSeller = user?.role === 'SELLER';

  const requestLocationPermission = async () => {
    const rationale = {
      title: 'Location Permission',
      message:
        'FoodApp needs access to your location ' +
        'so you can find the best restaurants near you.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK',
    };

    await requestPermission('location', rationale);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../../assets/images/location_access_img.jpg')}
            style={styles.image}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.title}>
          {isSeller ? 'Set your store location' : 'Find restaurants near you'}
        </Text>
        <Text style={styles.description}>
          {isSeller
            ? 'Please enable location access so we can help customers find your store and optimize your deliveries.'
            : 'Please enable location access so that we can find the best restaurants and delivery services in your area.'}
        </Text>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.accessButton}
          onPress={requestLocationPermission}
        >
          <Text style={styles.accessButtonText}>ACCESS LOCATION</Text>
        </TouchableOpacity>

        {!isSeller && (
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.skipButton}
            onPress={skipLocationPermission}
          >
            <Text style={styles.skipButtonText}>NOT NOW</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.disclaimer}>
          FOODAPP WILL ACCESS YOUR LOCATION ONLY WHILE USING THE APP
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    height: 300,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#32343E',
    textAlign: 'center',
    marginBottom: 16,
    fontFamily: 'Sen',
  },
  description: {
    fontSize: 16,
    color: '#646982',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
    paddingHorizontal: 20,
    fontFamily: 'Sen',
  },
  accessButton: {
    width: '100%',
    height: 62,
    backgroundColor: COLORS.default,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    // Shadow
    shadowColor: COLORS.default,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  accessButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 1,
  },
  skipButton: {
    height: 62,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  skipButtonText: {
    color: '#646982',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
  disclaimer: {
    fontSize: 12,
    color: '#646982',
    textAlign: 'center',
    width: '80%',
    lineHeight: 18,
    opacity: 0.7,
  },
});
