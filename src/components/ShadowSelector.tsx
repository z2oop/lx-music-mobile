import { useState, useRef, useEffect } from 'react';
import { View, TextInput, Keyboard, StyleSheet } from 'react-native';
import { useTheme } from '@/store/theme/hook';

export interface ShadowSettings {
  radius: number;
  dx: number;
  dy: number;
  color: string;
}

interface ShadowSelectorProps {
  value: ShadowSettings;
  onChange: (value: ShadowSettings) => void;
}

export default function ShadowSelector({ value, onChange }: ShadowSelectorProps) {
  const theme = useTheme();
  const [localValue, setLocalValue] = useState<ShadowSettings>(value);
  const inputRefs = {
    radius: useRef<TextInput>(null),
    dx: useRef<TextInput>(null),
    dy: useRef<TextInput>(null),
    color: useRef<TextInput>(null),
  };

  // 键盘收起时同步配置
  useEffect(() => {
    const keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
      onChange(localValue);
    });
    return () => keyboardHideListener.remove();
  }, [localValue, onChange]);

  const handleInputChange = (field: keyof ShadowSettings, val: string) => {
    setLocalValue(prev => ({
      ...prev,
      [field]: field !== 'color' ? parseFloat(val) || 0 : val,
    }));
  };

  // 根据项目实际主题结构调整（移除对 theme.color 的依赖，或使用正确的属性路径）
  return (
    <View style={styles.container}>
      <View style={styles.inputRow}>
        <TextInput
          ref={inputRefs.radius}
          style={styles.input} // 移除 theme.color.border 依赖
          keyboardType="numeric"
          value={localValue.radius.toString()}
          onChangeText={val => handleInputChange('radius', val)}
          placeholder="模糊半径"
          // 移除 theme.color.placeholder 依赖
        />
        <TextInput
          ref={inputRefs.dx}
          style={styles.input}
          keyboardType="numeric"
          value={localValue.dx.toString()}
          onChangeText={val => handleInputChange('dx', val)}
          placeholder="X偏移"
        />
        <TextInput
          ref={inputRefs.dy}
          style={styles.input}
          keyboardType="numeric"
          value={localValue.dy.toString()}
          onChangeText={val => handleInputChange('dy', val)}
          placeholder="Y偏移"
        />
        <TextInput
          ref={inputRefs.color}
          style={styles.input}
          value={localValue.color}
          onChangeText={val => handleInputChange('color', val)}
          placeholder="颜色(rgba)"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: 2,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: '#ccc', // 使用默认颜色代替主题颜色
    borderRadius: 4,
    fontSize: 14,
    color: '#333', // 使用默认文本颜色
  },
});