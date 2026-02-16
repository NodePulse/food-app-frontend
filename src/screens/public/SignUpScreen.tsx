import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants/colors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/RootStack';
import { useMutation } from '@tanstack/react-query';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from '../../api/api';

const signupSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

export default function SignUpScreen() {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: data => {
      Alert.alert('Success', 'Account created successfully!');
      navigation.navigate('Login');
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || 'Something went wrong';
      Alert.alert('Error', message);
    },
  });

  return (
    <SafeAreaView style={styles.mainContainer}>
      <View style={styles.headerSection}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Sign Up</Text>
          <Text style={styles.subtitle}>Please sign up to get started</Text>
        </View>
        <Image
          source={require('../../../assets/images/ellipse_1005.png')}
          style={[styles.headerDecoration, { zIndex: 10 }]}
        />
      </View>

      <View style={styles.formContainer}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'CUSTOMER',
          }}
          validationSchema={signupSchema}
          onSubmit={values => {
            mutate({ userData: values });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            touched,
          }) => (
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.roleContainer}>
                <TouchableOpacity
                  style={[
                    styles.roleChip,
                    values.role === 'CUSTOMER' && styles.activeRoleChip,
                  ]}
                  onPress={() => setFieldValue('role', 'CUSTOMER')}
                >
                  <Text
                    style={[
                      styles.roleChipText,
                      values.role === 'CUSTOMER' && styles.activeRoleChipText,
                    ]}
                  >
                    CUSTOMER
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.roleChip,
                    values.role === 'SELLER' && styles.activeRoleChip,
                  ]}
                  onPress={() => setFieldValue('role', 'SELLER')}
                >
                  <Text
                    style={[
                      styles.roleChipText,
                      values.role === 'SELLER' && styles.activeRoleChipText,
                    ]}
                  >
                    SELLER
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>NAME</Text>
                <TextInput
                  style={styles.input}
                  placeholder="john doe"
                  placeholderTextColor="#A0A5BA"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>EMAIL</Text>
                <TextInput
                  style={styles.input}
                  placeholder="example@gmail.com"
                  placeholderTextColor="#A0A5BA"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {errors.email && touched.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>PASSWORD</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="************"
                    placeholderTextColor="#A0A5BA"
                    secureTextEntry={!showPassword}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.eyeIcon}
                    onPress={() => setShowPassword(!showPassword)}
                  >
                    <Text style={{ fontSize: 18 }}>
                      {showPassword ? '👁️' : '🔒'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.password && touched.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.label}>CONFIRM PASSWORD</Text>
                <View style={styles.passwordContainer}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    placeholder="************"
                    placeholderTextColor="#A0A5BA"
                    secureTextEntry={!showConfirmPassword}
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    value={values.confirmPassword}
                  />
                  <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.eyeIcon}
                    onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    <Text style={{ fontSize: 18 }}>
                      {showConfirmPassword ? '👁️' : '🔒'}
                    </Text>
                  </TouchableOpacity>
                </View>
                {errors.confirmPassword && touched.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.loginButton}
                onPress={() => handleSubmit()}
                disabled={isPending}
              >
                {isPending ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text style={styles.loginButtonText}>SIGN UP</Text>
                )}
              </TouchableOpacity>

              <View style={styles.signupRow}>
                <Text style={styles.noAccountText}>
                  Already have an account?{' '}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Login')}
                >
                  <Text style={styles.signupText}>LOG IN</Text>
                </TouchableOpacity>
              </View>

              <Text style={styles.orText}>Or</Text>

              <View style={styles.socialRow}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.socialCircle, { backgroundColor: '#3B5998' }]}
                >
                  <Text style={styles.socialIconText}>f</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.socialCircle, { backgroundColor: '#1DA1F2' }]}
                >
                  <Text style={styles.socialIconText}>🐦</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[styles.socialCircle, { backgroundColor: '#1A1D26' }]}
                >
                  <Text style={styles.socialIconText}></Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          )}
        </Formik>
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
  roleContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  roleChip: {
    flex: 1,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F0F5FA',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F0F5FA',
  },
  activeRoleChip: {
    backgroundColor: '#FFE1CE',
    borderColor: COLORS.default,
  },
  roleChipText: {
    fontFamily: 'Sen',
    fontSize: 14,
    color: '#646982',
    fontWeight: '600',
  },
  activeRoleChipText: {
    color: COLORS.default,
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
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,
    fontFamily: 'Sen',
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
  eyeIcon: {
    paddingHorizontal: 16,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 30,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: '#D0D2D1',
    borderRadius: 4,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: COLORS.default,
    borderColor: COLORS.default,
  },
  checkMark: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
  rememberText: {
    color: '#7E8389',
    fontSize: 14,
  },
  forgotText: {
    color: COLORS.default,
    fontSize: 14,
    fontWeight: '600',
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
  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 30,
  },
  noAccountText: {
    color: '#646982',
    fontSize: 14,
  },
  signupText: {
    color: COLORS.default,
    fontSize: 14,
    fontWeight: '700',
  },
  orText: {
    textAlign: 'center',
    color: '#646982',
    fontSize: 16,
    marginBottom: 20,
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 20,
    marginBottom: 40,
  },
  socialCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialIconText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
