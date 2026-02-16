import React, { createContext, useContext, useState, useEffect } from 'react';
import { PermissionsAndroid, Platform, Permission } from 'react-native';
import Geolocation from '@react-native-community/geolocation';

export type PermissionKey = 'location' | 'camera' | 'notifications';

interface PermissionStatus {
  isGranted: boolean;
  hasInteracted: boolean;
}

interface PermissionContextType {
  status: Record<PermissionKey, PermissionStatus>;
  userLocation: { latitude: number; longitude: number } | null;
  isLoading: boolean;
  checkPermission: (key: PermissionKey) => Promise<boolean>;
  requestPermission: (key: PermissionKey, rationale?: any) => Promise<boolean>;
  skipInteraction: (key: PermissionKey) => void;

  // Backward compatibility aliases for location
  isLocationGranted: boolean;
  hasInteractedWithLocation: boolean;
  updatePermissionStatus: (granted: boolean) => void;
  skipLocationPermission: () => void;
}

const PermissionContext = createContext<PermissionContextType | undefined>(
  undefined,
);

const ANDROID_PERMISSIONS: Record<PermissionKey, Permission | string | null> = {
  location: PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
  camera: PermissionsAndroid.PERMISSIONS.CAMERA,
  notifications:
    Platform.OS === 'android' && Platform.Version >= 33
      ? 'android.permission.POST_NOTIFICATIONS'
      : null,
};

const initialStatus: Record<PermissionKey, PermissionStatus> = {
  location: { isGranted: false, hasInteracted: false },
  camera: { isGranted: false, hasInteracted: false },
  notifications: { isGranted: false, hasInteracted: false },
};

export const PermissionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] =
    useState<Record<PermissionKey, PermissionStatus>>(initialStatus);
  const [userLocation, setUserLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initPermissions();
  }, []);

  const initPermissions = async () => {
    try {
      const keys: PermissionKey[] = ['location', 'camera', 'notifications'];
      const newStatus = { ...initialStatus };

      for (const key of keys) {
        const isGranted = await checkPermissionInternal(key);
        newStatus[key] = {
          isGranted,
          hasInteracted: isGranted, // If already granted, they've interacted
        };
      }
      setStatus(newStatus);
    } catch (error) {
      console.error('Failed to initialize permissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status.location.isGranted && !userLocation) {
      fetchUserLocation();
    }
  }, [status.location.isGranted]);

  const fetchUserLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      error => {
        console.log('Location fetch error in Provider:', error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
    );
  };

  const checkPermissionInternal = async (
    key: PermissionKey,
  ): Promise<boolean> => {
    if (Platform.OS !== 'android') return true; // Simplify for iOS
    const androidPermission = ANDROID_PERMISSIONS[key];
    if (!androidPermission) return true;

    return await PermissionsAndroid.check(androidPermission as Permission);
  };

  const checkPermission = async (key: PermissionKey): Promise<boolean> => {
    const isGranted = await checkPermissionInternal(key);
    setStatus(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        isGranted,
        hasInteracted: isGranted ? true : prev[key].hasInteracted,
      },
    }));
    return isGranted;
  };

  const requestPermission = async (
    key: PermissionKey,
    rationale?: any,
  ): Promise<boolean> => {
    if (Platform.OS !== 'android') {
      updatePermissionStatusInternal(key, true);
      return true;
    }

    const androidPermission = ANDROID_PERMISSIONS[key];
    if (!androidPermission) {
      updatePermissionStatusInternal(key, true);
      return true;
    }

    try {
      const result = await PermissionsAndroid.request(
        androidPermission as Permission,
        rationale,
      );
      const isGranted = result === PermissionsAndroid.RESULTS.GRANTED;
      updatePermissionStatusInternal(key, isGranted);
      return isGranted;
    } catch (error) {
      console.warn(`Error requesting ${key} permission:`, error);
      return false;
    }
  };

  const updatePermissionStatusInternal = (
    key: PermissionKey,
    isGranted: boolean,
  ) => {
    setStatus(prev => ({
      ...prev,
      [key]: { isGranted, hasInteracted: true },
    }));
  };

  const skipInteraction = (key: PermissionKey) => {
    setStatus(prev => ({
      ...prev,
      [key]: { ...prev[key], hasInteracted: true },
    }));
  };

  // Backward compatibility methods
  const updatePermissionStatus = (granted: boolean) =>
    updatePermissionStatusInternal('location', granted);
  const skipLocationPermission = () => skipInteraction('location');

  return (
    <PermissionContext.Provider
      value={{
        status,
        userLocation,
        isLoading,
        checkPermission,
        requestPermission,
        skipInteraction,
        // Alises
        isLocationGranted: status.location.isGranted,
        hasInteractedWithLocation: status.location.hasInteracted,
        updatePermissionStatus,
        skipLocationPermission,
      }}
    >
      {children}
    </PermissionContext.Provider>
  );
};

export const usePermission = () => {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermission must be used within a PermissionProvider');
  }
  return context;
};
