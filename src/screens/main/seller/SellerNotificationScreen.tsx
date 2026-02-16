import { View, StyleSheet } from 'react-native';
import React from 'react';
import NotificationTopTab from '../../../navigation/NotificationTopTab';

export default function SellerNotificationScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <NotificationTopTab />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
