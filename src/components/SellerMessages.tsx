import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { COLORS } from '../constants/colors';

const MESSAGES = [
  {
    id: '1',
    name: 'John Doe',
    message: 'Is the Garlic Naan available for bulk order today?',
    time: '5 mins ago',
    unread: true,
    initials: 'JD',
    color: '#FF7622',
  },
  {
    id: '2',
    name: 'Sarah Smith',
    message: 'Thank you! The food was delicious.',
    time: '20 mins ago',
    unread: false,
    initials: 'SS',
    color: '#00B047',
  },
  {
    id: '3',
    name: 'Michael Brown',
    message: 'Can I change my delivery address for order #1234?',
    time: '1 hour ago',
    unread: true,
    initials: 'MB',
    color: '#121223',
  },
  {
    id: '4',
    name: 'Emily Davis',
    message: 'Do you have any gluten-free dessert options?',
    time: '3 hours ago',
    unread: false,
    initials: 'ED',
    color: '#FFD270',
  },
];

export default function SellerMessages() {
  const renderItem = ({ item }: { item: any }) => (
    <TouchableOpacity style={styles.messageCard} activeOpacity={0.7}>
      <View style={[styles.avatar, { backgroundColor: item.color }]}>
        <Text style={styles.avatarText}>{item.initials}</Text>
        {item.unread && <View style={styles.unreadIndicator} />}
      </View>

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
        <Text
          style={[styles.message, item.unread && styles.unreadMessage]}
          numberOfLines={1}
        >
          {item.message}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={MESSAGES}
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
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
  },
  messageCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
  },
  unreadIndicator: {
    position: 'absolute',
    top: 2,
    right: 2,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: COLORS.default,
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    marginLeft: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#181C2E',
  },
  time: {
    fontSize: 12,
    color: '#A0A5BA',
  },
  message: {
    fontSize: 14,
    color: '#646982',
  },
  unreadMessage: {
    color: '#181C2E',
    fontWeight: '600',
  },
});
