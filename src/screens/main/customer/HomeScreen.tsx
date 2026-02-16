import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  TextInput,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../context/AuthContext';
import { COLORS } from '../../../constants/colors';
import Geolocation from '@react-native-community/geolocation';
import { usePermission } from '../../../context/PermissionContext';
import { useQuery } from '@tanstack/react-query';

const CATEGORIES = [
  { id: 1, name: 'All', icon: '🍽️' },
  { id: 2, name: 'Hot Dog', icon: '🌭' },
  { id: 3, name: 'Burger', icon: '🍔' },
  { id: 4, name: 'Pizza', icon: '🍕' },
  { id: 5, name: 'Sushi', icon: '🍣' },
];

const RESTAURANTS = [
  {
    id: 1,
    name: 'Rose Garden Restaurant',
    tags: 'Burger - Chiken - Riche - Wings',
    rating: 4.7,
    delivery: 'Free',
    time: '20 min',
    image:
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Pansi Restaurant',
    tags: 'Burger - Chiken - Riche - Wings',
    rating: 4.5,
    delivery: 'Free',
    time: '30 min',
    image:
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=800&q=80',
  },
];

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { isLocationGranted, userLocation } = usePermission();
  const [selectedCategory, setSelectedCategory] = useState(1);

  const { data: addressData, isLoading: isAddressLoading } = useQuery({
    queryKey: ['location', userLocation?.latitude, userLocation?.longitude],
    queryFn: async () => {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${userLocation?.latitude}&lon=${userLocation?.longitude}`,
        {
          headers: {
            'User-Agent': 'FoodApp/1.0',
          },
        },
      );
      return await response.json();
    },
    enabled: !!userLocation,
  });

  const getGreeting = () => {
    const hours = new Date().getHours();
    if (hours < 12) return 'Good Morning';
    if (hours < 18) return 'Good Afternoon';
    return 'Good Evening';
  };

  const renderHeader = () => (
    <View style={styles.header}>
      <TouchableOpacity style={styles.menuButton}>
        <View style={styles.menuIcon}>
          <View style={[styles.menuLine, { width: 18 }]} />
          <View style={[styles.menuLine, { width: 12 }]} />
          <View style={[styles.menuLine, { width: 18 }]} />
        </View>
      </TouchableOpacity>

      <View style={styles.deliveryContainer}>
        <Text style={styles.deliverToText}>DELIVER TO</Text>
        <TouchableOpacity style={styles.addressSelector}>
          <Text style={styles.addressText} numberOfLines={1}>
            {addressData?.address?.suburb +
              ', ' +
              (addressData?.address?.city || addressData?.address?.village) ||
              'Halal Lab office'}
          </Text>
          <View style={styles.dropdownIcon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.cartButton}>
        <View style={styles.cartIconContainer}>
          <View style={styles.cartIcon} />
          <View style={styles.cartBadge}>
            <Text style={styles.cartBadgeText}>2</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {renderHeader()}

        <View style={styles.greetingContainer}>
          <Text style={styles.greetingText}>
            Hey {user?.name.split(' ')[0] || 'Halal'},{' '}
            <Text style={styles.greetingTime}>{getGreeting()}!</Text>
          </Text>
        </View>

        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <View style={styles.searchIcon} />
            <TextInput
              placeholder="Search dishes, restaurants"
              placeholderTextColor="#676767"
              style={styles.searchInput}
            />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>All Categories</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <View style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map(category => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryItem,
                selectedCategory === category.id && styles.selectedCategoryItem,
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              <View
                style={[
                  styles.categoryIconContainer,
                  selectedCategory === category.id &&
                    styles.selectedCategoryIconContainer,
                ]}
              >
                <Text style={styles.categoryIconText}>{category.icon}</Text>
              </View>
              <Text
                style={[
                  styles.categoryName,
                  selectedCategory === category.id &&
                    styles.selectedCategoryName,
                ]}
              >
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Open Restaurants</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <View style={styles.arrowIcon} />
          </TouchableOpacity>
        </View>

        <View style={styles.restaurantList}>
          {RESTAURANTS.map(restaurant => (
            <TouchableOpacity
              key={restaurant.id}
              style={styles.restaurantCard}
              activeOpacity={0.9}
            >
              <View style={styles.restaurantImageContainer}>
                <Image
                  source={{ uri: restaurant.image }}
                  style={styles.restaurantImage}
                />
              </View>
              <View style={styles.restaurantInfo}>
                <Text style={styles.restaurantName}>{restaurant.name}</Text>
                <Text style={styles.restaurantTags}>{restaurant.tags}</Text>
                <View style={styles.restaurantStats}>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>⭐</Text>
                    <Text style={styles.statText}>{restaurant.rating}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>🚚</Text>
                    <Text style={styles.statText}>{restaurant.delivery}</Text>
                  </View>
                  <View style={styles.statItem}>
                    <Text style={styles.statIcon}>🕒</Text>
                    <Text style={styles.statText}>{restaurant.time}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.logoutButton}
          onPress={logout}
        >
          <Text style={styles.logoutText}>LOGOUT</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 10,
    marginBottom: 20,
  },
  menuButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ECF0F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuIcon: {
    height: 18,
    justifyContent: 'space-between',
  },
  menuLine: {
    height: 2,
    backgroundColor: '#181C2E',
    borderRadius: 1,
  },
  deliveryContainer: {
    alignItems: 'flex-start',
    paddingLeft: 20,
    flex: 1,
  },
  deliverToText: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.default,
    letterSpacing: 1,
  },
  addressSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  addressText: {
    fontSize: 14,
    color: '#676767',
    fontFamily: 'Sen',
  },
  dropdownIcon: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderBottomWidth: 0,
    borderTopWidth: 4,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#676767',
    marginLeft: 5,
  },
  cartButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#181C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIconContainer: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cartIcon: {
    width: 18,
    height: 18,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderBottomLeftRadius: 3,
    borderBottomRightRadius: 3,
  },
  cartBadge: {
    position: 'absolute',
    top: -5,
    right: -5,
    backgroundColor: COLORS.default,
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#181C2E',
  },
  cartBadgeText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  greetingContainer: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  greetingText: {
    fontSize: 16,
    color: '#181C2E',
    fontFamily: 'Sen',
  },
  greetingTime: {
    fontWeight: '800',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 25,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 15,
    paddingHorizontal: 15,
    height: 60,
  },
  searchIcon: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#A0A5BA',
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#181C2E',
    fontFamily: 'Sen',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#32343E',
    fontFamily: 'Sen',
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#32343E',
    fontFamily: 'Sen',
    marginRight: 5,
  },
  arrowIcon: {
    width: 6,
    height: 6,
    borderTopWidth: 1.5,
    borderRightWidth: 1.5,
    borderColor: '#32343E',
    transform: [{ rotate: '45deg' }],
  },
  categoriesContainer: {
    paddingLeft: 24,
    paddingBottom: 25,
  },
  categoryItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    paddingVertical: 5,
    paddingLeft: 5,
    paddingRight: 15,
    marginRight: 15,
    height: 55,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  selectedCategoryItem: {
    backgroundColor: '#FFD275',
  },
  categoryIconContainer: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#ECF0F4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedCategoryIconContainer: {
    backgroundColor: '#FFFFFF',
  },
  categoryIconText: {
    fontSize: 20,
  },
  categoryName: {
    marginLeft: 10,
    fontSize: 14,
    fontWeight: '700',
    color: '#32343E',
    fontFamily: 'Sen',
  },
  selectedCategoryName: {
    color: '#181C2E',
  },
  restaurantList: {
    paddingHorizontal: 24,
  },
  restaurantCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    marginBottom: 25,
    // Shadow deleted to match design or keep it subtle
  },
  restaurantImageContainer: {
    width: '100%',
    height: 180,
    borderRadius: 20,
    backgroundColor: '#A0A5BA',
    overflow: 'hidden',
  },
  restaurantImage: {
    width: '100%',
    height: '100%',
  },
  restaurantInfo: {
    paddingVertical: 15,
  },
  restaurantName: {
    fontSize: 20,
    fontWeight: '400',
    color: '#181C2E',
    fontFamily: 'Sen',
  },
  restaurantTags: {
    fontSize: 14,
    color: '#A0A5BA',
    fontFamily: 'Sen',
    marginTop: 5,
  },
  restaurantStats: {
    flexDirection: 'row',
    marginTop: 15,
    alignItems: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 20,
  },
  statIcon: {
    fontSize: 16,
    marginRight: 5,
  },
  statText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#181C2E',
    fontFamily: 'Sen',
  },
  logoutButton: {
    marginHorizontal: 24,
    marginTop: 20,
    backgroundColor: '#F6F6F6',
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#FF7622',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
