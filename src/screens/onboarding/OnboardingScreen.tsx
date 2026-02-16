import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStack';
import { COLORS } from '../../constants/colors';
import { StackNavigationProp } from '@react-navigation/stack';
import DeviceInfo from 'react-native-device-info';
const version = DeviceInfo.getVersion();
const buildNumber = DeviceInfo.getBuildNumber();

const onboardingData = [
  {
    id: 1,
    title: 'All your favorites',
    description:
      'Get all your loved foods in one once place, you just place the order we do the rest',
  },
  {
    id: 2,
    title: 'Order from choosen chef',
    description:
      'Get all your loved foods in one once place, you just place the order we do the rest',
  },
  {
    id: 3,
    title: 'Free delivery offers',
    description:
      'Get all your loved foods in one once place, you just place the order we do the rest',
  },
  {
    id: 4,
    title: 'Fastest Delivery',
    description:
      'Get all your loved foods in one once place, you just place the order we do the rest',
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  console.log(version, buildNumber);

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      navigation.navigate('Login');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const currentItem = onboardingData[currentIndex];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.imageContainer}>
          {/* Placeholder for the illustration */}
          <View style={styles.imagePlaceholder} />
        </View>

        <View style={styles.textContainer}>
          <Text style={styles.textTitle}>{currentItem.title}</Text>
          <Text style={styles.textDescription}>{currentItem.description}</Text>
        </View>

        <View style={styles.dotContainer}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === onboardingData.length - 1
              ? 'GET STARTED'
              : 'NEXT'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={[
            styles.skipButton,
            currentIndex === onboardingData.length - 1 && { display: 'none' },
          ]}
          onPress={handleSkip}
        >
          <Text style={styles.skipButtonText}>Skip</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 60,
  },
  imagePlaceholder: {
    width: 280,
    height: 380,
    backgroundColor: '#9DAABD',
    borderRadius: 30,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  textTitle: {
    fontFamily: 'Sen',
    fontSize: 24,
    fontWeight: '800',
    color: '#1E232C',
    textAlign: 'center',
    marginBottom: 16,
  },
  textDescription: {
    fontFamily: 'Sen',
    fontSize: 16,
    lineHeight: 24,
    color: '#646982',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.whiteDot,
    marginHorizontal: 6,
  },
  activeDot: {
    backgroundColor: COLORS.default,
  },
  footer: {
    paddingBottom: 40,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  nextButton: {
    backgroundColor: COLORS.default,
    width: '100%',
    height: 62,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  nextButtonText: {
    fontFamily: 'Sen',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  skipButton: {
    paddingVertical: 10,
  },
  skipButtonText: {
    fontFamily: 'Sen',
    color: '#646982',
    fontSize: 16,
    fontWeight: '400',
  },
});

export default OnboardingScreen;
