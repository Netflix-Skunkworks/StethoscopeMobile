export const typeDefs = `
interface Device {
  # machine information
  deviceId: String
  # name of device
  deviceName: String # system_info
  # standard, less-friendly name of platform
  platform: String
  # operating system version
  osVersion: String
  # device model
  hardwareModel: String
  # device serial number
  hardwareSerial: String
  # version of the stethoscope application
  stethoscopeVersion: String
  security: SecurityInfo
  policyResult: PolicyStatus
}

type MobileDevice implements Device{
  # machine information
  deviceId: String
  # name of device
  deviceName: String # system_info
  # standard, less-friendly name of platform
  platform: String
  # operating system version
  osVersion: String
  # device model
  hardwareModel: String
  # device serial number
  hardwareSerial: String
  # version of the stethoscope application
  stethoscopeVersion: String
  # current IP address
  ipAddress: String
  # mac address
  macAddress: String
  # manufacturer of device
  manufacturer: String
  # brand of device
  brand: String
  # Locale of device location 
  deviceLocale: String
  # Country of device location 
  deviceCountry: String
  security: MobileSecurityInfo
  policyResult: PolicyStatus
}

interface SecurityInfo {
  # operating system version
  osVersion: String
}

type MobileSecurityInfo implements SecurityInfo {
  # operating system version
  osVersion: String
  # If pin or fingner print is set 
  pinOrFingerprintSet: SecurityState 
  # Is operating system verified (not jailbroken)
  verifiedOs: SecurityState
}

# a platform string requirement defines a target string value for specific platforms
input PlatformStringRequirement {
  darwin: Semver
  win32: Semver
  linux: Semver
  ios: Semver
  android: Semver
  all: Semver
}

# A MobileDevicePolicy is a description of the desired state of a set of pre-selected device features
input MobileDevicePolicy {
  # current operation system version, use [semver](https://www.nodesource.com/blog/semver-a-primer/) strings to define requirement
  osVersion: PlatformStringRequirement
  # Whether or not pin or fingerprint is set 
  pinOrFingerprintSet: RequirementOption 
  # Is operating system verified (not jailbroken)
  verifiedOs: RequirementOption
}

# valid values for a given policy requirement
enum RequirementOption {
  ALWAYS
  SUGGESTED
  IF_SUPPORTED
  NEVER
}

enum PolicyStatus {
  PASS
  FAIL
  NUDGE
  UNSUPPORTED
  UNKNOWN
}

enum SecurityState {
  TRUE
  FALSE
}

type Policy {
  validate(policy:MobileDevicePolicy): PolicyStatus!
  validateWithDetails(policy:MobileDevicePolicy): MobilePolicyResult!
}

interface PolicyResult {
  status: PolicyStatus
  osVersion: PolicyStatus
}

type MobilePolicyResult implements PolicyResult { 
  status: PolicyStatus
  osVersion: PolicyStatus
  pinOrFingerprintSet: PolicyStatus
  verifiedOs: PolicyStatus
}

type Query {
  status: String
  mobileDevice: MobileDevice
  policy: Policy
}

# Semver string e.g. "<=5.0.0"
scalar Semver
`;
