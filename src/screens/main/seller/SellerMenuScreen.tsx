import { View, StyleSheet } from 'react-native';
import React from 'react';
import MenuTopTab from '../../../navigation/MenuTopTab';

export default function SellerMenuScreen() {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <MenuTopTab />
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
