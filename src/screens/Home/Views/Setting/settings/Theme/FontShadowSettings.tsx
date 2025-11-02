import { memo } from 'react';
import { View, Text } from 'react-native';
import { useI18n } from '@/lang';
import { useSettingValue } from '@/store/setting/hook';
import { updateSetting } from '@/core/common';
import CheckBoxItem from '../../components/CheckBoxItem';
import ShadowSelector from '@/components/ShadowSelector';
import { createStyle } from '@/utils/tools';

export default memo(() => {
  const t = useI18n();
  const isFontShadow = useSettingValue('theme.fontShadow');
  // 提供正确的默认类型
  const shadowSettings = useSettingValue('theme.fontShadowSettings') || {
    radius: 1.6,
    dx: 1.5,
    dy: 1.3,
    color: 'rgba(0, 0, 0, 0.15)',
  };

  const handleShadowToggle = (enabled: boolean) => {
    updateSetting({ 'theme.fontShadow': enabled });
  };

  const handleShadowChange = (settings: typeof shadowSettings) => {
    // 确保更新的类型正确
    updateSetting({ 'theme.fontShadowSettings': settings });
  };

  return (
    <View style={styles.container}>
      <CheckBoxItem
        check={isFontShadow}
        label={t('setting_basic_theme_font_shadow')}
        onChange={handleShadowToggle}
      />
      {isFontShadow && (
        <View style={styles.shadowSettings}>
          <Text style={styles.subtitle}>{t('setting_basic_theme_font_shadow_settings')}</Text>
          <ShadowSelector
            value={shadowSettings}
            onChange={handleShadowChange}
          />
        </View>
      )}
    </View>
  );
});

const styles = createStyle({
  container: {
    marginVertical: 10,
  },
  shadowSettings: {
    marginLeft: 30,
    marginTop: 5,
  },
  subtitle: {
    marginBottom: 8,
    fontSize: 14,
  },
});