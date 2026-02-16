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
import { loginUser } from '../../api/api';
import { useAuth } from '../../context/AuthContext';

const loginSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
  password: Yup.string().required('Password is required'),
});

export default function LoginScreen() {
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { login: authLogin } = useAuth();

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: async (data: any) => {
      // Correctly access nested data from the API response
      const loginData = data?.data;
      if (loginData?.token && loginData?.user) {
        await authLogin(loginData.user, loginData.token);
        Alert.alert('Success', data.message || 'Logged in successfully!');
      } else {
        Alert.alert('Error', 'Invalid login response from server');
      }
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
          <Text style={styles.title}>Log In</Text>
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
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={loginSchema}
          onSubmit={values => {
            mutate({ userData: values });
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <ScrollView showsVerticalScrollIndicator={false}>
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

              <View style={styles.optionsRow}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.rememberMe}
                  onPress={() => setRememberMe(!rememberMe)}
                >
                  <View style={[styles.checkbox, rememberMe && styles.checked]}>
                    {rememberMe && <Text style={styles.checkMark}>✓</Text>}
                  </View>
                  <Text style={styles.rememberText}>Remember me</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('ForgotPassword')}
                >
                  <Text style={styles.forgotText}>Forgot Password</Text>
                </TouchableOpacity>
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
                  <Text style={styles.loginButtonText}>LOG IN</Text>
                )}
              </TouchableOpacity>

              <View style={styles.signupRow}>
                <Text style={styles.noAccountText}>
                  Don't have an account?{' '}
                </Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => navigation.navigate('Signup')}
                >
                  <Text style={styles.signupText}>SIGN UP</Text>
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
