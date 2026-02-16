import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Modal,
  Pressable,
} from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { COLORS } from '../../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function SellerProfileScreen() {
  const { logout } = useAuth();
  const [logoutModal, setLogoutModal] = useState(false);

  const ProfileItem = ({
    icon,
    iconColor,
    title,
    value,
    onPress,
    isLast = false,
  }: any) => (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.profileItem, isLast && { borderBottomWidth: 0 }]}
      onPress={onPress}
    >
      <View style={styles.profileItemLeft}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={22} color={iconColor} />
        </View>
        <Text style={styles.profileItemTitle}>{title}</Text>
      </View>
      <View style={styles.profileItemRight}>
        {value && <Text style={styles.profileItemValue}>{value}</Text>}
        <Ionicons name="chevron-forward" size={20} color="#A0A5BA" />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <ScrollView showsVerticalScrollIndicator={false} scrollEnabled={false}>
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <Text style={styles.headerTitle}>My Profile</Text>
          </View>

          <View style={styles.balanceContainer}>
            <Text style={styles.balanceLabel}>Available Balance</Text>
            <Text style={styles.balanceAmount}>$500.00</Text>
          </View>

          <Pressable style={styles.withdrawButton}>
            <Text style={styles.withdrawButtonText}>Withdraw</Text>
          </Pressable>
        </View>

        <View style={styles.content}>
          <View style={styles.sectionCard}>
            <ProfileItem
              icon="person-outline"
              iconColor={COLORS.default}
              title="Personal Info"
              onPress={() => {}}
            />
            <ProfileItem
              icon="settings-outline"
              iconColor="#413DFB"
              title="Settings"
              onPress={() => {}}
              isLast
            />
          </View>

          <View style={styles.sectionCard}>
            <ProfileItem
              icon="card-outline"
              iconColor={COLORS.default}
              title="Withdrawal History"
              onPress={() => {}}
            />
            <ProfileItem
              icon="receipt-outline"
              iconColor="#2790C3"
              title="Number of Orders"
              value="29K"
              onPress={() => {}}
              isLast
            />
          </View>

          <View style={styles.sectionCard}>
            <ProfileItem
              icon="grid-outline"
              iconColor="#12D6C0"
              title="User Reviews"
              onPress={() => {}}
              isLast
            />
          </View>

          <View style={styles.sectionCard}>
            <ProfileItem
              icon="log-out-outline"
              iconColor="#FF4B4B"
              title="Log Out"
              onPress={() => setLogoutModal(true)}
              isLast
            />
          </View>
        </View>
      </ScrollView>
      <Modal visible={logoutModal} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeaderIcon}>
              <Ionicons name="log-out-outline" size={32} color="#FF4B4B" />
            </View>
            <Text style={styles.modalTitle}>Logout</Text>
            <Text style={styles.modalMessage}>
              Are you sure you want to sign out from your shop?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setLogoutModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={logout}
              >
                <Text style={styles.confirmButtonText}>Yes, Logout</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: COLORS.default,
    paddingTop: StatusBar.currentHeight ? StatusBar.currentHeight + 20 : 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    alignItems: 'center',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 30,
  },
  backButton: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 15,
    fontFamily: 'Sen',
  },
  balanceContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  balanceLabel: {
    fontSize: 16,
    color: '#FFFFFF',
    opacity: 0.9,
    marginBottom: 8,
    fontFamily: 'Sen',
  },
  balanceAmount: {
    fontSize: 48,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: 'Sen',
  },
  withdrawButton: {
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
  },
  withdrawButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'Sen',
  },
  content: {
    padding: 24,
  },
  sectionCard: {
    backgroundColor: '#F6F8FB',
    borderRadius: 16,
    marginBottom: 20,
    paddingHorizontal: 15,
  },
  profileItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF1F4',
  },
  profileItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  profileItemTitle: {
    fontSize: 16,
    color: '#32343E',
    fontFamily: 'Sen',
  },
  profileItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileItemValue: {
    fontSize: 14,
    color: '#646982',
    marginRight: 10,
    fontWeight: '700',
    fontFamily: 'Sen',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 30,
    width: '85%',
    alignItems: 'center',
  },
  modalHeaderIcon: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#FFF1F1',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#32343E',
    marginBottom: 12,
    fontFamily: 'Sen',
  },
  modalMessage: {
    fontSize: 16,
    color: '#646982',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 24,
    fontFamily: 'Sen',
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    height: 52,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F6F8FB',
    marginRight: 12,
  },
  confirmButton: {
    backgroundColor: '#FF4B4B',
  },
  cancelButtonText: {
    color: '#646982',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Sen',
  },
  confirmButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
    fontFamily: 'Sen',
  },
});
