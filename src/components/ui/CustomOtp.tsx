import { View, TextInput, StyleSheet } from 'react-native';
import React, { useRef, useState } from 'react';

interface CustomOtpProps {
  length?: number;
  onCodeFilled?: (code: string) => void;
}

export default function CustomOtp({
  length = 4,
  onCodeFilled,
}: CustomOtpProps) {
  const [otp, setOtp] = useState<string[]>(new Array(length).fill(''));
  const [activeInput, setActiveInput] = useState(0);
  const inputs = useRef<TextInput[]>([]);

  const handleChangeText = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Filter to get digits only
    if (text.length > 0 && index < length - 1) {
      inputs.current[index + 1].focus();
    }

    if (newOtp.every(digit => digit !== '') && onCodeFilled) {
      onCodeFilled(newOtp.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={ref => {
            if (ref) inputs.current[index] = ref;
          }}
          style={[
            styles.input,
            activeInput === index && styles.activeInput,
            digit !== '' && styles.filledInput,
          ]}
          value={digit}
          onChangeText={text => handleChangeText(text, index)}
          onKeyPress={e => handleKeyPress(e, index)}
          onFocus={() => setActiveInput(index)}
          keyboardType="number-pad"
          maxLength={1}
          placeholder="0"
          placeholderTextColor="#A0A5BA"
          textAlign="center"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: 10,
  },
  input: {
    width: 62,
    height: 62,
    backgroundColor: '#F0F5FA',
    borderRadius: 12,
    fontSize: 22,
    fontWeight: '700',
    color: '#32343E',
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  activeInput: {
    borderColor: '#FF7622',
    backgroundColor: '#FFFFFF',
    // Shadow for active state
    shadowColor: '#FF7622',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  filledInput: {
    color: '#32343E',
  },
});
