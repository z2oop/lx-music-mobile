// src/components/ShadowSelector.tsx
import { useState, useRef, useEffect } from 'react';
import { View, TextInput, Keyboard } from 'react-native';
import { useTheme } from '@/store/theme/hook';
import { createStyle } from '@/utils/tools';



interface ShadowSelectorProps {
  value: { radius: number; dx: number; dy: number; color: string };
  onChange: (value: { radius: number; dx: number; dy: number; color: string }) => void;
}

export default function ShadowSelector({ value, onChange }: ShadowSelectorProps) {
  const theme = useTheme();
  const [localValue, setLocalValue] = useState(value);
  const inputRefs = {
    radius: useRef<TextInput>(null),
    dx: useRef<TextInput>(null),
    dy: useRef<TextInput>(null),
    color: useRef<TextInput>(null),
  };

  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      onChange(localValue);
    });
    return () => keyboardHideListener.remove();
  }, [localValue]);

  const handleInputChange = (field: 'radius' | 'dx' | 'dy' | 'color', val: string) => {
    setLocalValue(prev => ({
      ...prev,
      [field]: field !== 'color' ? parseFloat(val) || 0 : val,
    }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          ref={inputRefs.radius}
          style={styles.input}
          keyboardType="numeric"
          value={localValue.radius.toString()}
          onChangeText={val => handleInputChange('radius', val)}
          placeholder="Radius"
        />
        <TextInput
          ref={inputRefs.dx}
          style={styles.input}
          keyboardType="numeric"
          value={localValue.dx.toString()}
          onChangeText={val => handleInputChange('dx', val)}
          placeholder="X Offset"
        />
        <TextInput
          ref={inputRefs.dy}
          style={styles.input}
          keyboardType="numeric"
          value={localValue.dy.toString()}
          onChangeText={val => handleInputChange('dy', val)}
          placeholder="Y Offset"
        />
        <TextInput
          ref={inputRefs.color}
          style={styles.input}
          value={localValue.color}
          onChangeText={val => handleInputChange('color', val)}
          placeholder="Color"
        />
      </View>
    </View>
  );
}

const styles = createStyle({
  container: {
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
});