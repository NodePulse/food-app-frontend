import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStack';

export default function ForgotPasswordScreen() {
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerSection}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subtitle}>
            Please sign in to your existing account
          </Text>
        </View>
        <Image
          source={require('../../../assets/images/ellipse_1005.png')}
          style={[styles.headerDecoration, { zIndex: 10 }]}
        />
      </View>

      <View style={styles.formContainer}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>EMAIL</Text>
            <TextInput
              style={styles.input}
              placeholder="example@gmail.com"
              placeholderTextColor="#A0A5BA"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.loginButton}
            onPress={() =>
              navigation.navigate('Verification', {
                email: 'example@gmail.com',
              })
            }
          >
            <Text style={styles.loginButtonText}>SEND CODE</Text>
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
    marginBottom: 8,
    fontWeight: '600',
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
