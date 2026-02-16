import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../../../context/AuthContext';
import { COLORS } from '../../../constants/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { usePermission } from '../../../context/PermissionContext';
import { useQuery } from '@tanstack/react-query';
import { SellerBottomTabParamList } from '../../../navigation/SellerTab';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CommonModal from '../../../components/ui/CommonModal';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

export default function SellerDashboardScreen() {
  const { user, logout } = useAuth();
  const [address, setAddress] = useState<string>('');
  const [showMapModal, setShowMapModal] = useState(false);
  const navigation = useNavigation<NavigationProp<SellerBottomTabParamList>>();
  const { userLocation } = usePermission();

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
      const result = await response.json();
      setAddress(
        result.address.suburb +
          ', ' +
          (result.address.village || result.address.city),
      );
      return result;
    },
    enabled: !!userLocation,
  });

  const renderHeader = () => (
    <View style={styles.header}>
      <View style={styles.headerLeft}>
        <TouchableOpacity style={styles.menuButton}>
          <View style={styles.menuIcon}>
            <View style={[styles.menuLine, { width: 18 }]} />
            <View style={[styles.menuLine, { width: 12 }]} />
            <View style={[styles.menuLine, { width: 18 }]} />
          </View>
        </TouchableOpacity>

        <View style={styles.titleContainer}>
          <Text style={styles.sellerPortalText}>LOCATION</Text>
          <View style={styles.dashboardText}>
            <Text style={styles.dashboardText}>{address}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowMapModal(true)}
            >
              <Fontisto name="caret-down" size={16} color="#181C2E" />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.profileButton}>
        <View style={styles.profileIconContainer}>
          <Text style={{ fontSize: 20 }}>👤</Text>
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

        <CommonModal
          visible={showMapModal}
          onClose={() => setShowMapModal(false)}
          title="Your Location"
          noPadding
        >
          <View style={styles.mapContainer}>
            <MapView
              provider={PROVIDER_GOOGLE}
              style={styles.map}
              showsUserLocation={true}
              showsMyLocationButton={false}
              showsCompass={true}
              initialRegion={{
                latitude: userLocation?.latitude || 0,
                longitude: userLocation?.longitude || 0,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
              }}
              toolbarEnabled={true}
              zoomControlEnabled={true}
              loadingEnabled={true}
            >
              <Marker
                coordinate={{
                  latitude: userLocation?.latitude || 0,
                  longitude: userLocation?.longitude || 0,
                }}
              >
                {/* <View style={styles.customMarker}>
                  <View style={styles.markerPulse} />
                  <View style={styles.markerDot} />
                </View> */}
              </Marker>
            </MapView>

            <View style={styles.mapFooter}>
              <View style={styles.addressInfo}>
                <Ionicons name="location" size={20} color={COLORS.default} />
                <Text style={styles.fullAddressText} numberOfLines={2}>
                  {address}
                </Text>
              </View>
              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => setShowMapModal(false)}
              >
                <Text style={styles.confirmButtonText}>CONFIRM LOCATION</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CommonModal>

        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>
            Welcome,{' '}
            <Text style={styles.sellerName}>{user?.name || 'Seller'}</Text>
          </Text>
          <Text style={styles.statsSubtitle}>
            Here's what's happening with your store today.
          </Text>
        </View>

        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>Active Orders</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>$450.00</Text>
            <Text style={styles.statLabel}>Today's Revenue</Text>
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Orders</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.orderList}>
          <View style={styles.orderItem}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderId}>#ORD-7829</Text>
              <Text style={styles.orderCustomer}>John Doe - 2 items</Text>
            </View>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>PENDING</Text>
            </View>
          </View>
          <View style={styles.orderItem}>
            <View style={styles.orderInfo}>
              <Text style={styles.orderId}>#ORD-7830</Text>
              <Text style={styles.orderCustomer}>Sarah Smith - 1 item</Text>
            </View>
            <View style={styles.statusBadgeGreen}>
              <Text style={styles.statusTextWhite}>PREPARING</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.addItemButton}
          onPress={() => navigation.navigate('AddNewItem')}
        >
          <Text style={styles.addItemButtonText}>+ ADD NEW DISH</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
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
    paddingBottom: 120, // Space for the floating tab bar
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 15,
    marginBottom: 25,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
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
  titleContainer: {
    alignItems: 'flex-start',
  },
  sellerPortalText: {
    fontSize: 12,
    fontWeight: '800',
    color: COLORS.default,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  dashboardText: {
    fontSize: 14,
    color: '#181C2E',
    marginTop: 2,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 5,
  },
  profileButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#181C2E',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconContainer: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapContainer: {
    width: '100%',
    height: 500,
  },
  map: {
    flex: 1,
  },
  customMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: COLORS.default,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  markerPulse: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.default,
    opacity: 0.2,
  },
  mapFooter: {
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  addressInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  fullAddressText: {
    fontSize: 14,
    color: '#32343E',
    fontFamily: 'Sen',
    flex: 1,
  },
  confirmButton: {
    backgroundColor: COLORS.default,
    height: 55,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
    letterSpacing: 1,
  },
  welcomeContainer: {
    paddingHorizontal: 24,
    marginBottom: 25,
  },
  welcomeText: {
    fontSize: 24,
    color: '#181C2E',
    fontWeight: '400',
  },
  sellerName: {
    fontWeight: '800',
    color: '#181C2E',
  },
  statsSubtitle: {
    fontSize: 14,
    color: '#646982',
    marginTop: 6,
    lineHeight: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    paddingHorizontal: 24,
    gap: 15,
    marginBottom: 30,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 25,
    shadowColor: '#181C2E',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.08,
    shadowRadius: 15,
    elevation: 4,
    borderWidth: 1,
    borderColor: '#F0F2F5',
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: '#181C2E',
  },
  statLabel: {
    fontSize: 13,
    color: '#646982',
    marginTop: 8,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#181C2E',
  },
  seeAllText: {
    fontSize: 14,
    color: COLORS.default,
    fontWeight: '700',
  },
  orderList: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F6F8FA',
  },
  orderInfo: {
    flex: 1,
  },
  orderId: {
    fontSize: 15,
    fontWeight: '700',
    color: '#181C2E',
  },
  orderCustomer: {
    fontSize: 13,
    color: '#646982',
    marginTop: 4,
  },
  statusBadge: {
    backgroundColor: '#FFE1CE',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  statusBadgeGreen: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 11,
    fontWeight: '800',
    color: COLORS.default,
  },
  statusTextWhite: {
    fontSize: 11,
    fontWeight: '800',
    color: '#10B981',
  },
  addItemButton: {
    marginHorizontal: 24,
    backgroundColor: '#181C2E',
    height: 62,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#181C2E',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  addItemButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: 1.2,
  },
  logoutButton: {
    marginHorizontal: 24,
    backgroundColor: '#F8F9FA',
    paddingVertical: 18,
    borderRadius: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  logoutText: {
    color: '#FF4B4B',
    fontWeight: '800',
    fontSize: 15,
  },
});
