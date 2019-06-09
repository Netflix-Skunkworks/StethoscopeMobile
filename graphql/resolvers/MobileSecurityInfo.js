import DeviceInfo from 'react-native-device-info';
import JailMonkey from 'jail-monkey';

const boolToSecurityInfo = bool => {
  return bool ? "TRUE" : "FALSE";
};

module.exports = {
  osVersion: function (root, args, context) {
    return DeviceInfo.getSystemVersion();
  },   
  pinOrFingerprintSet: function (root, args, context) {
    return new Promise((resolve, reject) => {
      DeviceInfo.isPinOrFingerprintSet()(isPinOrFingerprintSet => {
        resolve(boolToSecurityInfo(isPinOrFingerprintSet));
      });
    });
  },    
  verifiedOs: function (root, args, context) {
    return boolToSecurityInfo(!JailMonkey.isJailBroken());
  } 
};
