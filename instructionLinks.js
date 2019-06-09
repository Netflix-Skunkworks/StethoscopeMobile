import {
  Linking
} from 'react-native';
import AndroidOpenSettings from 'react-native-android-open-settings';

module.exports = {
  ios: {
    settings: () => { iosSettingsLink("App-Prefs:"); }
  }, 
  android: {
    general: () => { AndroidOpenSettings.generalSettings(); }
  }
};

const iosSettingsLink = (path) => { Linking.openURL(path).catch(err => console.error('An error occurred', err)); }