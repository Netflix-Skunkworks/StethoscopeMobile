import DeviceInfo from 'react-native-device-info';

module.exports = {
  deviceId: function (root, args, context) {
    return DeviceInfo.getUniqueID();
  },
  deviceName: function (root, args, context) {
    return DeviceInfo.getDeviceName();
  },   
  ipAddress: function (root, args, context) {
    return DeviceInfo.getIPAddress();
  },   
  macAddress: function (root, args, context) {
    return DeviceInfo.getMACAddress();
  },   
  platform: function (root, args, context) {
    return DeviceInfo.getSystemName();
  },   
  osVersion: function (root, args, context) {
    return DeviceInfo.getSystemVersion();
  },   
  hardwareModel: function (root, args, context) {
    return DeviceInfo.getModel();
  },    
  hardwareSerial: function (root, args, context) {
    return DeviceInfo.getSerialNumber();
  },    
  manufacturer: function (root, args, context) {
    return DeviceInfo.getManufacturer();
  },    
  brand: function (root, args, context) {
    return DeviceInfo.getBrand();
  },    
  stethoscopeVersion: function (root, args, context) {
    return DeviceInfo.getVersion();
  },    
  deviceLocale: function (root, args, context) {
    return DeviceInfo.getDeviceLocale();
  },      
  deviceCountry: function (root, args, context) {
    return DeviceInfo.getDeviceCountry();
  }    
};
