# Stethoscope Mobile App Device Information Collection

The Stethoscope Mobile app allows predefined sites to request information about a device via the app link. 
Allowed sites are defined in [constants.js](constants.js#1-5). 

Requesting Device Information
-----------------------------
To request information about the device the app can be opened with an app link that includes a base 64 encoded request for information.  
The base app link is defined as `stethoscope://`
The request for information can be constructed as follows: 
```
var appParameters = {
    r: window.location.href, 
    q: 'query ValidateMobileDevice($policy: MobileDevicePolicy!) { mobileDevice { deviceId deviceName platform, osVersion, hardwareModel, hardwareSerial, manufacturer, brand, stethoscopeVersion, deviceLocale, deviceCountry, security { osVersion pinOrFingerprintSet verifiedOs } } policy { validateWithDetails(policy: $policy) { status osVersion pinOrFingerprintSet verifiedOs } } }', 
    p: '{"policy":{"osVersion":{"ios":">=11.0", "android":">=8.0.0"},"pinOrFingerprintSet":"ALWAYS","verifiedOs":"ALWAYS"}}'
};
var scopeAppLink = "stethoscope://"+btoa(JSON.stringify(appParameters));
```

In the encoded JSON sent with the app link the following three parameters must be included: 
* r: Return url where the app will re-open with the device query response. Generally this will be the location of the current window. 
* q: Query, this is a GraphQL query that contains the information about the device that you would like to receive back. 
* p: Policy, this is a JSON defined policy that describes the desired state of a device.


