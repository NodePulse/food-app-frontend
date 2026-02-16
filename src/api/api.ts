import apiClient from './apiClient';
import { ENDPOINTS } from './endpoints';

export const registerUser = async ({
  userData,
}: {
  userData: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    role?: string;
  };
}) => {
  try {
    const response = await apiClient.post(ENDPOINTS.SIGNUP, userData);
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const loginUser = async ({
  userData,
}: {
  userData: {
    email: string;
    password: string;
  };
}) => {
  try {
    const response = await apiClient.post(ENDPOINTS.LOGIN, userData);
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    const response = await apiClient.post(ENDPOINTS.LOGOUT);
    return response.data;
  } catch (error) {
    console.error('Error logging out user:', error);
    throw error;
  }
};

export const addFoodItem = async ({ foodData }: { foodData: FormData }) => {
  try {
    const response = await apiClient.post(ENDPOINTS.ADD_FOOD_ITEM, foodData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding food item:', error);
    throw error;
  }
};
