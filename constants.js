const validDeviceReportUrls = [ 
                                'http://localhost:8080/', 
                                'http://127.0.0.1:8080/',
                                'http://10.0.2.2:8080/' 
                              ];

const isValidDeviceReportUrl = url => validDeviceReportUrls.reduce((acc, currentUrl) => { return acc || url.startsWith(currentUrl); }, false);

// policy result
const PASS = 'PASS';
const FAIL = 'FAIL';
const WARN = 'WARN';
const UNKNOWN = 'UNKNOWN';

// policy requirements
const ALWAYS = 'ALWAYS';
const SUGGESTED = 'SUGGESTED';
const NEVER = 'NEVER';
const IF_SUPPORTED = 'IF_SUPPORTED';

// device/property state
const ON = 'ON';
const OFF = 'OFF';
const UNSUPPORTED = 'UNSUPPORTED';

const POLICY_RANK = {FAIL: 1, WARN: 2, NUDGE: 3, PASS: 4};

const policySort = (p1, p2) => {
  return POLICY_RANK[p1.status] - POLICY_RANK[p2.status];
};

const defaultQuery = `
query ValidateMobileDevice($policy: MobileDevicePolicy!) {
  mobileDevice { 
    deviceId
    deviceName
    platform, 
    osVersion, 
    hardwareModel, 
    hardwareSerial, 
    manufacturer, 
    brand, 
    stethoscopeVersion, 
    deviceLocale, 
    deviceCountry, 
    security {
      osVersion
      pinOrFingerprintSet
      verifiedOs
    }
  }
  policy { 
    validateWithDetails(policy: $policy) {
      status
      osVersion
      pinOrFingerprintSet
      verifiedOs
    }
  }
}
`;

const defaultPolicy = {
  "policy": {
    "osVersion": {
      "ios": ">=11.0", 
      "android": ">=8.0.0"
    }, 
    "pinOrFingerprintSet": "ALWAYS", 
    "verifiedOs": "ALWAYS"
  }
};

module.exports = {
  isValidDeviceReportUrl,
  PASS, FAIL, WARN, UNKNOWN,
  ALWAYS, SUGGESTED, NEVER, IF_SUPPORTED,
  ON, OFF, UNSUPPORTED, 
  POLICY_RANK, policySort,
  defaultQuery, defaultPolicy
};
