import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface PopupProps {
  visible: boolean;
  onClose: () => void;
  triggerRef: React.RefObject<View | null>;
  children: React.ReactNode;
  width?: number; // Optional: Force a specific width
}

export default function Popup({
  visible,
  onClose,
  triggerRef,
  children,
  width: forcedWidth,
}: PopupProps) {
  const [coords, setCoords] = useState({ top: 0, left: 0, width: 0 });

  useEffect(() => {
    if (visible && triggerRef.current) {
      triggerRef.current.measure((x, y, width, height, pageX, pageY) => {
        setCoords({
          top: pageY + height,
          left: pageX,
          width: forcedWidth || width,
        });
      });
    }
  }, [visible, triggerRef, forcedWidth]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View
              style={[
                styles.popupContainer,
                {
                  top: coords.top,
                  left: coords.left,
                  width: coords.width,
                  maxHeight: Math.min(300, SCREEN_HEIGHT - coords.top - 20),
                },
              ]}
            >
              {children}
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  popupContainer: {
    position: 'absolute',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
    borderWidth: 1,
    borderColor: '#F0F2F5',
  },
});
