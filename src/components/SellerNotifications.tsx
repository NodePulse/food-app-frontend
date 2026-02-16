import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { COLORS } from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const NOTIFICATIONS = [
  {
    id: '1',
    title: 'New Order Received!',
    message: 'Order #1234 from John Doe is ready for preparation.',
    time: '2 mins ago',
    type: 'order',
    unread: true,
  },
  {
    id: '2',
    title: 'Payment Successful',
    message: 'Payment for Order #1230 has been credited to your wallet.',
    time: '1 hour ago',
    type: 'payment',
    unread: true,
  },
  {
    id: '3',
    title: 'Menu Item Hidden',
    message: 'Chicken Bhuna has been hidden from the menu due to low stock.',
    time: '3 hours ago',
    type: 'update',
    unread: false,
  },
  {
    id: '4',
    title: 'Rating Received',
    message: 'Customer gave a 5-star rating for Beef Steak with Veggies.',
    time: 'Yesterday',
    type: 'rating',
    unread: false,
  },
];

const getIcon = (type: string) => {
  switch (type) {
    case 'order':
      return 'cart-outline';
    case 'payment':
      return 'wallet-outline';
    case 'update':
      return 'refresh-outline';
    case 'rating':
      return 'star-outline';
    default:
      return 'notifications-outline';
  }
};

export default function SellerNotifications() {
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={[styles.notificationCard, item.unread && styles.unreadCard]}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: item.unread ? '#FFE1CE' : '#F6F8FA' },
        ]}
      >
        <Ionicons
          name={getIcon(item.type)}
          size={24}
          color={item.unread ? COLORS.default : '#646982'}
        />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.notificationHeader}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {item.unread && <View style={styles.unreadDot} />}
        </View>
        <Text style={styles.message} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>Recent Activity</Text>
        <TouchableOpacity>
          <Text style={styles.markRead}>Mark all as read</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={NOTIFICATIONS}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginTop: 20,
    marginBottom: 15,
  },
  subtitle: {
    fontSize: 16,
    color: '#181C2E',
    fontWeight: '700',
  },
  markRead: {
    fontSize: 14,
    color: COLORS.default,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#F0F2F5',
  },
  unreadCard: {
    borderColor: '#FFE1CE',
    backgroundColor: '#FFFBF9',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 1,
    marginLeft: 15,
  },
  notificationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  notificationTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#181C2E',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: COLORS.default,
  },
  message: {
    fontSize: 13,
    color: '#646982',
    lineHeight: 18,
    marginBottom: 8,
  },
  time: {
    fontSize: 12,
    color: '#A0A5BA',
  },
});
