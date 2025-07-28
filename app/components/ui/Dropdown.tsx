import { Picker } from '@react-native-picker/picker';
import React from 'react';
import {
  StyleSheet,
  View
} from 'react-native';

import colors from '@/colors';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  value: string;
  options: DropdownOption[];
  onValueChange: (value: string) => void;
  placeholder?: string;
}

export default function Dropdown({
  value,
  options,
  onValueChange,
  placeholder = 'Seçiniz',
}: DropdownProps) {
  const selectedOption = options.find(option => option.value === value);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={value}
        onValueChange={onValueChange}
        style={styles.picker}
        itemStyle={styles.pickerItem}
      >
        {options.map((option) => (
          <Picker.Item
            key={option.value}
            label={option.label}
            value={option.value}
            color={colors.text}
          />
        ))}
      </Picker>
      {/* <MaterialIcons
        name="keyboard-arrow-down"
        size={20}
        color={colors.text}
        style={styles.arrow}
      /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.background,
  },
  picker: {
    height: 50,
    color: colors.textSecondary,
    paddingHorizontal: 16,
  },
  pickerItem: {
    fontSize: 14,
  },
  arrow: {
    position: 'absolute',
    right: 16,
    top: 15,
    pointerEvents: 'none',
  },
}); 