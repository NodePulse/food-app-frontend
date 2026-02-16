import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
  ImageSourcePropType,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { SellerBottomTabParamList } from '../../../navigation/SellerTab';

import React, { useLayoutEffect, useRef, useState, memo } from 'react';
import { COLORS } from '../../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { INGREDIENTS, IngredientType } from '../../../constants/ingredients';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Image } from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { addFoodItem } from '../../../api/api';

const CATEGORIES = [
  { label: 'Breakfast', value: 'Breakfast' },
  { label: 'Lunch', value: 'Lunch' },
  { label: 'Dinner', value: 'Dinner' },
  { label: 'Snacks', value: 'Snacks' },
  { label: 'Dessert', value: 'Dessert' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Props = BottomTabScreenProps<SellerBottomTabParamList, 'AddNewItem'>;

export default function SellerAddNewItemScreen({ navigation }: Props) {
  const [showSeeAllModal, setShowSeeAllModal] = useState(false);
  const [seeAllModalData, setSeeAllModalData] = useState<{
    data: IngredientType[];
    type: 'basic' | 'fruits' | 'vegetables';
  }>({
    data: [],
    type: 'basic',
  });
  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Item name is required'),
    price: Yup.number()
      .typeError('Price must be a number')
      .required('Price is required')
      .positive('Price must be positive'),
    category: Yup.string().required('Category is required'),
    description: Yup.string().required('Description is required'),
    image: Yup.string().required('Dish image is required'),
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (data: FormData) => addFoodItem({ foodData: data }),
    onSuccess: () => {
      Alert.alert('Success', 'Dish added successfully!');
      formik.resetForm();
    },
    onError: error => {
      Alert.alert('Error', 'Failed to add dish');
    },
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      category: '',
      description: '',
      pickUp: false,
      delivery: false,
      selectedIngredients: [] as string[],
      image: null as string | null,
    },
    validationSchema,
    onSubmit: values => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('price', values.price);
      formData.append('category', values.category);
      formData.append('description', values.description);
      formData.append('pickUp', String(values.pickUp));
      formData.append('delivery', String(values.delivery));

      // Append ingredients individually
      values.selectedIngredients.forEach((ingredientId: string) => {
        formData.append('selectedIngredients[]', ingredientId);
      });

      if (values.image) {
        const uri = values.image;
        const uriParts = uri.split('.');
        const fileType = uriParts[uriParts.length - 1];

        formData.append('image', {
          uri: Platform.OS === 'android' ? uri : uri.replace('file://', ''),
          name: `photo.${fileType}`,
          type: `image/${fileType === 'jpg' ? 'jpeg' : fileType}`,
        } as any);
      }

      mutate(formData);
    },
  });

  const { resetForm } = formik;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{ marginRight: 24 }}
          onPress={() => resetForm()}
        >
          <Text
            style={{
              color: COLORS.default,
              fontWeight: '700',
              fontSize: 14,
            }}
          >
            RESET
          </Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, resetForm]);

  const toggleIngredient = React.useCallback(
    (id: string) => {
      const current = formik.values.selectedIngredients;
      const next = current.includes(id)
        ? current.filter(i => i !== id)
        : [...current, id];
      formik.setFieldValue('selectedIngredients', next);
    },
    [formik.values.selectedIngredients, formik.setFieldValue],
  );

  const handleAddPhoto = () => {
    Alert.alert(
      'Upload Photo',
      'Choose an option to add a dish image',
      [
        {
          text: 'Camera',
          onPress: () => {
            launchCamera({ mediaType: 'photo', quality: 0.8 }, response => {
              if (response.assets && response.assets[0].uri) {
                formik.setFieldValue('image', response.assets[0].uri);
              }
            });
          },
        },
        {
          text: 'Gallery',
          onPress: () => {
            launchImageLibrary(
              { mediaType: 'photo', quality: 0.8 },
              response => {
                if (response.assets && response.assets[0].uri) {
                  formik.setFieldValue('image', response.assets[0].uri);
                }
              },
            );
          },
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true },
    );
  };

  const handleShowModal = (type: 'basic' | 'fruits' | 'vegetables') => {
    setShowSeeAllModal(true);
    setSeeAllModalData({ data: INGREDIENTS[type], type });
  };

  const handleCloseModal = () => {
    setShowSeeAllModal(false);
    setSeeAllModalData({ data: [], type: 'basic' });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* <Text style={styles.subtitle}>
          Fill in the details to add a new item to your menu.
        </Text> */}

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>ITEM NAME</Text>
            <TextInput
              style={[
                styles.input,
                formik.touched.name && formik.errors.name && styles.inputError,
              ]}
              placeholder="e.g. Garlic Naan"
              placeholderTextColor="#A0A5BA"
              value={formik.values.name}
              onChangeText={formik.handleChange('name')}
              onBlur={formik.handleBlur('name')}
            />
            {formik.touched.name && formik.errors.name && (
              <Text style={styles.errorText}>{formik.errors.name}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>UPLOAD PHOTO</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={[
                styles.imagePickerPlaceholder,
                formik.values.image && { borderStyle: 'solid' },
                formik.touched.image &&
                  formik.errors.image &&
                  styles.imagePickerError,
              ]}
              onPress={handleAddPhoto}
            >
              {formik.values.image ? (
                <View style={styles.imagePreviewContainer}>
                  <Image
                    source={{ uri: formik.values.image }}
                    style={styles.previewImage}
                  />
                  <TouchableOpacity
                    style={styles.removeImageButton}
                    onPress={() => formik.setFieldValue('image', null)}
                  >
                    <Ionicons
                      name="close-circle"
                      size={24}
                      color={COLORS.default}
                    />
                  </TouchableOpacity>
                </View>
              ) : (
                <>
                  <View style={styles.uploadIconCircle}>
                    <Ionicons
                      name="cloud-upload"
                      size={35}
                      color={COLORS.lightDefault}
                    />
                  </View>
                  <Text style={styles.uploadText}>Upload Item Image</Text>
                </>
              )}
            </TouchableOpacity>
            {formik.touched.image && formik.errors.image && (
              <Text style={styles.errorText}>{formik.errors.image}</Text>
            )}
          </View>

          <View style={[styles.row, { alignItems: 'center' }]}>
            <View style={[styles.inputGroup, { flex: 1, marginRight: 15 }]}>
              <Text style={styles.label}>PRICE (₹)</Text>
              <TextInput
                style={[
                  styles.input,
                  formik.touched.price &&
                    formik.errors.price &&
                    styles.inputError,
                ]}
                placeholder="0.00"
                placeholderTextColor="#A0A5BA"
                keyboardType="numeric"
                value={formik.values.price}
                onChangeText={formik.handleChange('price')}
                onBlur={formik.handleBlur('price')}
              />
              {formik.touched.price && formik.errors.price && (
                <Text style={styles.errorText}>{formik.errors.price}</Text>
              )}
            </View>
            <View style={styles.pickUpContainer}>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.pickUp}
                onPress={() =>
                  formik.setFieldValue('pickUp', !formik.values.pickUp)
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    formik.values.pickUp && styles.checked,
                  ]}
                >
                  {formik.values.pickUp && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
                <Text style={styles.pickUpText}>Pick Up</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                style={styles.pickUp}
                onPress={() =>
                  formik.setFieldValue('delivery', !formik.values.delivery)
                }
              >
                <View
                  style={[
                    styles.checkbox,
                    formik.values.delivery && styles.checked,
                  ]}
                >
                  {formik.values.delivery && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
                <Text style={styles.pickUpText}>Delivery</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>CATEGORY</Text>
            <View
              style={[
                styles.categoriesContainer,
                formik.touched.category &&
                  formik.errors.category &&
                  styles.errorBorder,
              ]}
            >
              {CATEGORIES.map(item => {
                const isSelected = formik.values.category === item.value;
                return (
                  <Pressable
                    key={item.value}
                    onPress={() => formik.setFieldValue('category', item.value)}
                    style={({ pressed }) => [
                      styles.categoryItem,
                      isSelected && styles.categoryItemSelected,
                      pressed && { opacity: 0.7 },
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryItemText,
                        isSelected && styles.categoryItemTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
            {formik.touched.category && formik.errors.category && (
              <Text style={styles.errorText}>{formik.errors.category}</Text>
            )}
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>INGREDIENTS</Text>
            <View
              style={[
                styles.row,
                {
                  justifyContent: 'space-between',
                  marginBottom: 15,
                  marginTop: 10,
                },
              ]}
            >
              <Text style={styles.subLabel}>Basic</Text>
              <Pressable
                style={styles.row}
                onPress={() => handleShowModal('basic')}
              >
                <Text style={[styles.subLabel, { color: COLORS.gray }]}>
                  See All
                </Text>
                <Ionicons name="chevron-down" size={18} color={COLORS.gray} />
              </Pressable>
            </View>

            <View style={styles.ingredientsGrid}>
              {INGREDIENTS.basic.slice(0, 5).map(item => (
                <IngredientItem
                  key={item.id}
                  item={item}
                  isSelected={formik.values.selectedIngredients.includes(
                    item.id,
                  )}
                  onToggle={toggleIngredient}
                />
              ))}
            </View>

            <View
              style={[
                styles.row,
                {
                  justifyContent: 'space-between',
                  marginBottom: 15,
                  marginTop: 10,
                },
              ]}
            >
              <Text style={styles.subLabel}>Fruits</Text>
              <Pressable
                style={styles.row}
                onPress={() => handleShowModal('fruits')}
              >
                <Text style={[styles.subLabel, { color: COLORS.gray }]}>
                  See All
                </Text>
                <Ionicons name="chevron-down" size={18} color={COLORS.gray} />
              </Pressable>
            </View>

            <View style={styles.ingredientsGrid}>
              {INGREDIENTS.fruits.slice(0, 5).map(item => (
                <IngredientItem
                  key={item.id}
                  item={item}
                  isSelected={formik.values.selectedIngredients.includes(
                    item.id,
                  )}
                  onToggle={toggleIngredient}
                />
              ))}
            </View>

            <View
              style={[
                styles.row,
                {
                  justifyContent: 'space-between',
                  marginBottom: 15,
                  marginTop: 10,
                },
              ]}
            >
              <Text style={styles.subLabel}>Vegetables</Text>
              <Pressable
                style={styles.row}
                onPress={() => handleShowModal('vegetables')}
              >
                <Text style={[styles.subLabel, { color: COLORS.gray }]}>
                  See All
                </Text>
                <Ionicons name="chevron-down" size={18} color={COLORS.gray} />
              </Pressable>
            </View>

            <View style={styles.ingredientsGrid}>
              {INGREDIENTS.vegetables.slice(0, 5).map(item => (
                <IngredientItem
                  key={item.id}
                  item={item}
                  isSelected={formik.values.selectedIngredients.includes(
                    item.id,
                  )}
                  onToggle={toggleIngredient}
                />
              ))}
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>DETAILS</Text>
            <TextInput
              style={[
                styles.input,
                styles.textArea,
                formik.touched.description &&
                  formik.errors.description &&
                  styles.inputError,
              ]}
              placeholder="Write something about the dish..."
              placeholderTextColor="#A0A5BA"
              multiline
              numberOfLines={4}
              value={formik.values.description}
              onChangeText={formik.handleChange('description')}
              onBlur={formik.handleBlur('description')}
              textAlignVertical="top"
            />
            {formik.touched.description && formik.errors.description && (
              <Text style={styles.errorText}>{formik.errors.description}</Text>
            )}
          </View>

          <Pressable
            style={({ pressed }) => [
              styles.submitButton,
              (pressed || isPending) && styles.submitButtonDisabled,
            ]}
            onPress={() => formik.handleSubmit()}
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>ADD ITEM</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
      <Modal
        visible={showSeeAllModal}
        animationType="fade"
        transparent
        onRequestClose={handleCloseModal}
      >
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text style={styles.modalTitle}>
                    Select {seeAllModalData.type} Ingredients
                  </Text>
                  <Pressable
                    onPress={handleCloseModal}
                    style={styles.modalCloseButtonIcon}
                  >
                    <Ionicons name="close" size={24} color={COLORS.black} />
                  </Pressable>
                </View>

                <ScrollView
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={styles.modalScrollContent}
                >
                  <View style={styles.modalIngredientsGrid}>
                    {seeAllModalData.data.map((item: IngredientType) => (
                      <IngredientItem
                        key={item.id}
                        item={item}
                        isSelected={formik.values.selectedIngredients.includes(
                          item.id,
                        )}
                        onToggle={toggleIngredient}
                        containerStyle={styles.modalIngredientItem}
                      />
                    ))}
                  </View>
                </ScrollView>

                <Pressable
                  style={({ pressed }) => [
                    styles.modalDoneButton,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={handleCloseModal}
                >
                  <Text style={styles.modalDoneButtonText}>DONE</Text>
                </Pressable>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  );
}

const renderIngredientContent = (item: IngredientType, isSelected: boolean) => {
  if (!item.icon) {
    return (
      <Ionicons
        name={'restaurant-outline'}
        size={24}
        color={isSelected ? COLORS.lightDefault : '#646982'}
      />
    );
  }

  const Icon = item.icon;
  const SvgComponent =
    typeof Icon === 'function'
      ? Icon
      : Icon && typeof (Icon as any).default === 'function'
      ? (Icon as any).default
      : null;

  if (SvgComponent) {
    return (
      <View style={styles.svgWrapper}>
        <SvgComponent
          width={24}
          height={24}
          fill={isSelected ? COLORS.lightDefault : COLORS.black}
          stroke={isSelected ? COLORS.lightDefault : COLORS.black}
        />
      </View>
    );
  }

  return (
    <Image
      source={Icon as ImageSourcePropType}
      style={styles.ingredientIcon}
      resizeMode="contain"
    />
  );
};

const IngredientItem = memo(
  ({
    item,
    isSelected,
    onToggle,
    containerStyle,
  }: {
    item: IngredientType;
    isSelected: boolean;
    onToggle: (id: string) => void;
    containerStyle?: any;
  }) => (
    <View style={[styles.ingredientItem, containerStyle]}>
      <Pressable
        onPress={() => onToggle(item.id)}
        style={({ pressed }) => [
          styles.ingredientIconContainer,
          isSelected && styles.ingredientIconContainerSelected,
          pressed && { opacity: 0.7 },
        ]}
      >
        {renderIngredientContent(item, isSelected)}
      </Pressable>
      <Text
        style={[
          styles.ingredientText,
          isSelected && styles.ingredientTextSelected,
        ]}
        numberOfLines={1}
      >
        {item.name}
      </Text>
    </View>
  ),
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 100, // Extra space for floating tab bar
  },
  subtitle: {
    fontSize: 15,
    color: '#646982',
    marginTop: 8,
    lineHeight: 22,
  },
  form: {
    marginTop: 30,
  },
  imagePickerPlaceholder: {
    width: '100%',
    height: 160,
    backgroundColor: COLORS.lightDefaultComplement,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: COLORS.lightDefault,
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  uploadIconCircle: {
    width: 65,
    height: 65,
    borderRadius: 33,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.lightDefault,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
  },
  imagePreviewContainer: {
    width: '100%',
    height: '100%',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  uploadText: {
    marginTop: 10,
    fontSize: 14,
    color: '#646982',
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#181C2E',
    fontWeight: '500',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  subLabel: {
    fontSize: 14,
    color: '#181C2E',
    fontWeight: '400',
    textTransform: 'capitalize',
  },
  input: {
    backgroundColor: '#F6F8FA',
    height: 60,
    borderRadius: 12,
    paddingHorizontal: 20,
    fontSize: 16,
    color: '#181C2E',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    zIndex: 10, // Ensure dropdown is above price input
  },
  pickUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  pickUp: {
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
  pickUpText: {
    color: '#7E8389',
    fontSize: 14,
  },
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingVertical: 10,
    gap: 10,
  },
  categoryItem: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: '#F6F8FA',
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },

  categoryItemSelected: {
    backgroundColor: COLORS.default,
    borderColor: COLORS.default,
    elevation: 4,
    shadowColor: COLORS.default,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  categoryItemText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#646982',
  },
  categoryItemTextSelected: {
    color: '#FFFFFF',
  },
  ingredientsGrid: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    gap: 12,
  },
  ingredientItem: {
    width: 60,
    alignItems: 'center',
  },
  ingredientIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F6F8FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  ingredientIcon: {
    width: 24,
    height: 24,
  },
  svgWrapper: {
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ingredientIconContainerSelected: {
    backgroundColor: COLORS.lightDefaultComplement,
    borderWidth: 2,
    borderColor: COLORS.lightDefault,
  },
  ingredientText: {
    fontSize: 12,
    color: '#646982',
    fontFamily: 'Sen',
    textAlign: 'center',
  },
  ingredientTextSelected: {
    color: COLORS.black,
    fontWeight: '700',
  },
  textArea: {
    height: 120,
    paddingTop: 15,
  },
  submitButton: {
    backgroundColor: COLORS.default,
    height: 62,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: COLORS.default,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 1,
  },
  submitButtonDisabled: {
    backgroundColor: '#A0A5BA',
    shadowOpacity: 0,
    elevation: 0,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 24,
    width: '100%',
    maxHeight: '80%',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: COLORS.black,
  },
  modalCloseButtonIcon: {
    padding: 4,
  },
  modalScrollContent: {
    paddingBottom: 20,
  },
  modalIngredientsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    gap: 12,
  },
  modalIngredientItem: {
    width: (SCREEN_WIDTH - 88 - 36) / 4, // 4 columns: (Available Width - (Gap * 3)) / 4
    alignItems: 'center',
    marginBottom: 15,
  },
  modalDoneButton: {
    backgroundColor: COLORS.default,
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  modalDoneButtonText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
    letterSpacing: 1,
  },
  errorText: {
    color: '#FF4B4B',
    fontSize: 12,
    marginTop: 5,
    marginLeft: 5,
  },
  inputError: {
    borderColor: '#FF4B4B',
  },
  imagePickerError: {
    borderColor: '#FF4B4B',
    borderStyle: 'solid',
  },
  errorBorder: {
    borderColor: '#FF4B4B',
    borderWidth: 1,
    borderRadius: 12,
  },
});
