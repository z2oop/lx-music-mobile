import { useContext, useEffect, useState } from 'react'
import { ThemeContext } from './state'
import settingState from '@/store/setting/state'

// export const useSetting = () => {
//   const [setting, updateSetting] = useState(state.setting)

//   useEffect(() => {
//     const handleUpdate = () => {
//       updateSetting(state.setting)
//     }
//     global.state_event.on('configUpdated', handleUpdate)
//     return () => {
//       global.state_event.off('configUpdated', handleUpdate)
//     }
//   }, [])

//   return setting
// }

// export const useSettingValue = <T extends keyof LX.AppSetting>(key: T): LX.AppSetting[T] => {
//   const [value, update] = useState(state.setting[key])

//   useEffect(() => {
//     const handleUpdate = (keys: Array<keyof LX.AppSetting>) => {
//       if (!keys.includes(key)) return
//       update(state.setting[key])
//     }
//     global.state_event.on('configUpdated', handleUpdate)
//     return () => {
//       global.state_event.off('configUpdated', handleUpdate)
//     }
//   }, [key])

//   return value
// }

// src/store/theme/hook.ts (À©Õ¹)
export const useFontShadowSettings = () => {
  const [value, update] = useState(
    settingState.setting['theme.fontShadowSettings'] || {
      radius: 1.6,
      dx: 1.5,
      dy: 1.3,
      color: 'rgba(0, 0, 0, 0.15)',
    }
  );

  useEffect(() => {
    const handleUpdate = (keys: Array<keyof LX.AppSetting>, setting: Partial<LX.AppSetting>) => {
      if (!keys.includes('theme.fontShadowSettings')) return;
      requestAnimationFrame(() => {
        update(setting['theme.fontShadowSettings']!);
      });
    };
    global.state_event.on('configUpdated', handleUpdate);
    return () => {
      global.state_event.off('configUpdated', handleUpdate);
    };
  }, []);

  return value;
};

export const useTheme = () => useContext(ThemeContext)

export const useTextShadow = () => {
  const [value, update] = useState(settingState.setting['theme.fontShadow'])

  useEffect(() => {
    const handleUpdate = (keys: Array<keyof LX.AppSetting>, setting: Partial<LX.AppSetting>) => {
      if (!keys.includes('theme.fontShadow')) return
      requestAnimationFrame(() => {
        update(setting['theme.fontShadow']!)
      })
    }
    global.state_event.on('configUpdated', handleUpdate)
    return () => {
      global.state_event.off('configUpdated', handleUpdate)
    }
  }, [])

  return value
}
