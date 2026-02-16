import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStack';
import CustomOtp from '../../components/ui/CustomOtp';

export default function VerificationScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'Verification'>>();
  const { email } = route.params;

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerSection}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Verification</Text>
          <Text style={styles.subtitle}>We have sent a code to your email</Text>
          <Text style={styles.email}>{email}</Text>
        </View>
        <Image
          source={require('../../../assets/images/ellipse_1005.png')}
          style={[styles.headerDecoration, { zIndex: 10 }]}
        />
      </View>

      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputGroup}>
            <View style={styles.labelRow}>
              <Text style={styles.label}>CODE</Text>
              <TouchableHighlight>
                <Text style={styles.resendText}>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      fontWeight: 'bold',
                      color: '#32343E',
                    }}
                  >
                    Resend
                  </Text>{' '}
                  in 00:59
                </Text>
              </TouchableHighlight>
            </View>
            <CustomOtp length={4} />
          </View>

          <TouchableOpacity style={styles.loginButton} activeOpacity={0.8}>
            <Text style={styles.loginButtonText}>VERIFY</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: COLORS.darkBlue,
  },
  headerSection: {
    height: '25%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  textWrapper: {
    alignItems: 'center',
    zIndex: 2,
  },
  title: {
    fontFamily: 'Sen',
    fontSize: 30,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  subtitle: {
    fontFamily: 'Sen',
    fontSize: 16,
    color: '#D0D2D1',
    textAlign: 'center',
    width: '80%',
  },
  email: {
    fontFamily: 'Sen',
    fontSize: 16,
    color: '#D0D2D1',
    fontWeight: 'bold',
  },
  headerDecoration: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    opacity: 0.2, // Subtle effect like the mockup
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'Sen',
    fontSize: 12,
    color: '#32343E',
    fontWeight: '600',
  },
  labelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  resendText: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#32343E',
    fontWeight: '400',
  },
  input: {
    backgroundColor: '#F0F5FA',
    height: 56,
    borderRadius: 10,
    paddingHorizontal: 16,
    fontSize: 14,
    color: '#32343E',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F5FA',
    borderRadius: 10,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },

  loginButton: {
    backgroundColor: COLORS.default,
    height: 62,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    // Add shadow (iOS)
    shadowColor: COLORS.default,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    // Add elevation (Android)
    elevation: 8,
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
});
