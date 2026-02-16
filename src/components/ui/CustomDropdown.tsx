import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../../constants/colors';
import Popup from './Popup';

interface Option {
  label: string;
  value: string;
}

interface CustomDropdownProps {
  label?: string;
  placeholder?: string;
  options: Option[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  error?: string;
}

export default function CustomDropdown({
  label,
  placeholder = 'Select an option',
  options,
  selectedValue,
  onValueChange,
  error,
}: CustomDropdownProps) {
  const [visible, setVisible] = useState(false);
  const [search, setSearch] = useState('');

  const triggerRef = useRef<View>(null);

  const selectedOption = options.find(opt => opt.value === selectedValue);

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSelect = (value: string) => {
    onValueChange(value);
    setVisible(false);
    setSearch('');
  };

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}

      <TouchableOpacity
        ref={triggerRef}
        style={[styles.trigger, error ? styles.triggerError : null]}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <Text
          style={[
            styles.triggerText,
            !selectedOption && styles.placeholderText,
          ]}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </Text>
        <Ionicons
          name={visible ? 'chevron-up' : 'chevron-down'}
          size={20}
          color="#646982"
        />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Popup
        visible={visible}
        onClose={() => setVisible(false)}
        triggerRef={triggerRef}
      >
        {options.length > 5 && (
          <View style={styles.searchContainer}>
            <Ionicons name="search" size={18} color="#A0A5BA" />
            <TextInput
              style={styles.searchInput}
              placeholder="Search..."
              value={search}
              onChangeText={setSearch}
              placeholderTextColor="#A0A5BA"
            />
          </View>
        )}

        <FlatList
          data={filteredOptions}
          keyExtractor={item => item.value}
          style={{ flexGrow: 0 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.optionItem,
                item.value === selectedValue && styles.selectedOptionItem,
              ]}
              onPress={() => handleSelect(item.value)}
            >
              <Text
                style={[
                  styles.optionText,
                  item.value === selectedValue && styles.selectedOptionText,
                ]}
              >
                {item.label}
              </Text>
              {item.value === selectedValue && (
                <Ionicons name="checkmark" size={18} color={COLORS.default} />
              )}
            </TouchableOpacity>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>No options found</Text>
            </View>
          }
        />
      </Popup>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
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
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F8FA',
    paddingHorizontal: 16,
    paddingVertical: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  triggerError: {
    borderColor: '#FF4B4B',
  },
  triggerText: {
    fontSize: 16,
    color: '#181C2E',
  },
  placeholderText: {
    color: '#A0A5BA',
  },
  errorText: {
    color: '#FF4B4B',
    fontSize: 12,
    marginTop: 5,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F8FA',
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
    height: 40,
  },
  searchInput: {
    flex: 1,
    height: 40,
    color: '#181C2E',
    fontSize: 14,
    marginLeft: 6,
    padding: 0,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  selectedOptionItem: {
    backgroundColor: '#FFF5F0',
  },
  optionText: {
    fontSize: 15,
    color: '#646982',
  },
  selectedOptionText: {
    color: COLORS.default,
    fontWeight: '700',
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#A0A5BA',
    fontSize: 13,
  },
});
