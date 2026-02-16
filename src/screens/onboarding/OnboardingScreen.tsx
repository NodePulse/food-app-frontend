import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  FlatList,
} from 'react-native';
import React, { useState, useRef } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStack';
import { COLORS } from '../../constants/colors';
import { StackNavigationProp } from '@react-navigation/stack';

const { width, height } = Dimensions.get('window');

const onboardingData = [
  {
    id: 1,
    title: 'All Your Favorites in One Place',
    description:
      'Discover restaurants and dishes you love. Browse, choose, and order your favorite meals anytime.',
    image: require('../../../assets/images/onboarding_1.png'),
    bgColor: '#FFF5EF',
  },
  {
    id: 2,
    title: 'Order from Your Favorite Chefs',
    description:
      'Enjoy delicious meals prepared by top chefs and local kitchens, all delivered fresh to your door.',
    image: require('../../../assets/images/onboarding_2.png'),
    bgColor: '#F0F5FF',
  },
  {
    id: 3,
    title: 'Exciting Free Delivery Offers',
    description:
      'Save more on every order with exclusive deals, discounts, and free delivery offers.',
    image: require('../../../assets/images/onboarding_3.png'),
    bgColor: '#FFF0F0',
  },
  {
    id: 4,
    title: 'Fast & Reliable Delivery',
    description:
      'Get your food delivered hot and fresh in no time with our quick and reliable delivery service.',
    image: require('../../../assets/images/onboarding_4.png'),
    bgColor: '#F3FFF7',
  },
];

const OnboardingScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const flatListRef = useRef<FlatList>(null);
  const scrollX = useRef(new Animated.Value(0)).current;

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      flatListRef.current?.scrollToIndex({
        index: currentIndex + 1,
        animated: true,
      });
    } else {
      navigation.navigate('Login');
    }
  };

  const handleSkip = () => {
    navigation.navigate('Login');
  };

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    if (viewableItems.length > 0) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderDots = () => {
    return (
      <View style={styles.dotContainer}>
        {onboardingData.map((_, index) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [10, 24, 10],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1, 1],
            extrapolate: 'clamp',
          });

          const backgroundColor = scrollX.interpolate({
            inputRange,
            outputRange: [COLORS.whiteDot, COLORS.default, COLORS.whiteDot],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index}
              style={[
                styles.dot,
                { width: dotWidth, opacity, backgroundColor },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Decorative background elements */}
        <View style={styles.bgDecorContainer}>
          <Image
            source={require('../../../assets/images/ellipse_1005.png')}
            style={styles.bgEllipseTop}
            resizeMode="contain"
          />
          <Image
            source={require('../../../assets/images/ellipse_1006.png')}
            style={styles.bgEllipseBottom}
            resizeMode="contain"
          />
        </View>

        <View style={styles.content}>
          <Animated.FlatList
            ref={flatListRef}
            data={onboardingData}
            keyExtractor={item => item.id.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            onScroll={Animated.event(
              [{ nativeEvent: { contentOffset: { x: scrollX } } }],
              { useNativeDriver: false },
            )}
            scrollEventThrottle={16}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            getItemLayout={(_, index) => ({
              length: width,
              offset: width * index,
              index,
            })}
            renderItem={({ item }) => (
              <View style={styles.slide}>
                <View style={styles.imageWrapper}>
                  <View
                    style={[styles.circleBg, { backgroundColor: item.bgColor }]}
                  />
                  <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="contain"
                  />
                </View>
                <View style={styles.textContainer}>
                  <Text style={styles.textTitle}>{item.title}</Text>
                  <Text style={styles.textDescription}>{item.description}</Text>
                </View>
              </View>
            )}
          />

          {renderDots()}
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.85}
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
            activeOpacity={0.7}
            style={[
              styles.skipButton,
              currentIndex === onboardingData.length - 1 && { opacity: 0 },
            ]}
            onPress={handleSkip}
            disabled={currentIndex === onboardingData.length - 1}
          >
            <Text style={styles.skipButtonText}>Skip</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  bgDecorContainer: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
    zIndex: -1,
  },
  bgEllipseTop: {
    position: 'absolute',
    top: -height * 0.1,
    left: -width * 0.2,
    width: width,
    height: width,
    opacity: 0.1,
    tintColor: COLORS.default,
  },
  bgEllipseBottom: {
    position: 'absolute',
    bottom: -height * 0.15,
    right: -width * 0.25,
    width: width * 1.2,
    height: width * 1.2,
    opacity: 0.08,
    tintColor: COLORS.default,
  },
  content: {
    flex: 1,
  },
  slide: {
    width: width,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    width: width * 0.8,
    height: width * 0.8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50,
  },
  circleBg: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderRadius: width * 0.4,
    opacity: 0.6,
  },
  image: {
    width: width * 0.85,
    height: width * 0.85,
    zIndex: 1,
    borderRadius: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  textTitle: {
    fontFamily: 'Sen',
    fontSize: 28,
    fontWeight: '900',
    color: '#1E232C',
    textAlign: 'center',
    marginBottom: 16,
    lineHeight: 36,
  },
  textDescription: {
    fontFamily: 'Sen',
    fontSize: 16,
    lineHeight: 26,
    color: '#646982',
    textAlign: 'center',
    paddingHorizontal: 15,
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    height: 10,
    borderRadius: 5,
    marginHorizontal: 4,
    backgroundColor: '#000000',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  nextButton: {
    backgroundColor: COLORS.default,
    width: '100%',
    height: 64,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    // Premium Shadow
    shadowColor: COLORS.default,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 8,
  },
  nextButtonText: {
    fontFamily: 'Sen',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1.5,
  },
  skipButton: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  skipButtonText: {
    fontFamily: 'Sen',
    color: '#646982',
    fontSize: 15,
    fontWeight: '600',
  },
});

export default OnboardingScreen;
