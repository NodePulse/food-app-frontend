import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FOOD_ITEMS = [
  {
    id: '1',
    name: 'Chicken Thai Biriyani',
    category: 'Breakfast',
    price: 60,
    rating: 4.9,
    reviews: 10,
    image:
      'https://images.unsplash.com/photo-1563379091339-03b21bc4a4f8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '2',
    name: 'Chicken Bhuna',
    category: 'Breakfast',
    price: 30,
    rating: 4.9,
    reviews: 10,
    image:
      'https://images.unsplash.com/photo-1589187151003-0dd3c63b1282?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '3',
    name: 'Mazalichiken Halim',
    category: 'Breakfast',
    price: 25,
    rating: 4.9,
    reviews: 10,
    image:
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '4',
    name: 'Paneer Tikka with Veggies',
    category: 'Lunch',
    price: 45,
    rating: 4.8,
    reviews: 15,
    image:
      'https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
  {
    id: '5',
    name: 'Grilled Salmon',
    category: 'Dinner',
    price: 95,
    rating: 5.0,
    reviews: 8,
    image:
      'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
  },
];

export default function SellerMenuList({ route }: any) {
  const category = route?.name || 'All';
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [menuVisible, setMenuVisible] = useState(false);

  const filteredItems =
    category === 'All'
      ? FOOD_ITEMS
      : FOOD_ITEMS.filter(item => item.category === category);

  const handleOpenMenu = (item: any) => {
    setSelectedItem(item);
    setMenuVisible(true);
  };

  const renderItem = ({ item }: { item: any }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />
      <View style={styles.details}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => handleOpenMenu(item)}
          >
            <Ionicons name="ellipsis-horizontal" size={20} color="#181C2E" />
          </TouchableOpacity>
        </View>

        <View style={styles.categoryBadge}>
          <Text style={styles.categoryText}>{item.category}</Text>
        </View>

        <View style={styles.footer}>
          <View style={styles.ratingRow}>
            <Ionicons name="star" size={14} color={COLORS.default} />
            <Text style={styles.ratingText}>{item.rating}</Text>
            <Text style={styles.reviewText}>({item.reviews} Review)</Text>
          </View>
          <View style={styles.priceColumn}>
            <Text style={styles.price}>${item.price}</Text>
            <Text style={styles.status}>Pick UP</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.itemCount}>
        Total {filteredItems.length.toString().padStart(2, '0')} items
      </Text>
      <FlatList
        data={filteredItems}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />

      <Modal
        visible={menuVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setMenuVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setMenuVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.menuContainer}>
                <View style={styles.menuHeader}>
                  <Text style={styles.menuTitle} numberOfLines={1}>
                    {selectedItem?.name}
                  </Text>
                </View>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => setMenuVisible(false)}
                >
                  <Ionicons name="create-outline" size={22} color="#181C2E" />
                  <Text style={styles.menuItemText}>Edit Item</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.menuItem}
                  onPress={() => setMenuVisible(false)}
                >
                  <Ionicons name="eye-off-outline" size={22} color="#181C2E" />
                  <Text style={styles.menuItemText}>Hide from Menu</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.menuItem, styles.deleteItem]}
                  onPress={() => setMenuVisible(false)}
                >
                  <Ionicons name="trash-outline" size={22} color="#FF4B4B" />
                  <Text style={[styles.menuItemText, styles.deleteText]}>
                    Delete Item
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
  },
  itemCount: {
    fontSize: 14,
    color: '#A0A5BA',
    marginTop: 20,
    marginBottom: 15,
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 20,
    backgroundColor: '#ECF0F4',
  },
  details: {
    flex: 1,
    marginLeft: 15,
    justifyContent: 'center',
  },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
    color: '#181C2E',
    flex: 1,
    marginRight: 10,
  },
  categoryBadge: {
    backgroundColor: '#FFE1CE',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginTop: 6,
  },
  categoryText: {
    fontSize: 12,
    color: COLORS.default,
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#181C2E',
    marginLeft: 4,
  },
  reviewText: {
    fontSize: 12,
    color: '#A0A5BA',
    marginLeft: 6,
  },
  priceColumn: {
    alignItems: 'flex-end',
  },
  price: {
    fontSize: 18,
    fontWeight: '800',
    color: '#181C2E',
  },
  status: {
    fontSize: 12,
    color: '#A0A5BA',
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    width: '100%',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  menuHeader: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F2F5',
    paddingBottom: 15,
  },
  menuTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#181C2E',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  menuItemText: {
    fontSize: 16,
    color: '#181C2E',
    marginLeft: 15,
    fontWeight: '500',
  },
  deleteItem: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#F0F2F5',
    paddingTop: 15,
  },
  deleteText: {
    color: '#FF4B4B',
  },
});
