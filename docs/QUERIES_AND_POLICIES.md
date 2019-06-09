# Queries 

The Stethoscope Mobile app uses GraphQL to execute requests for device information. The availible data is defined in the [Schema](../graphql/schema.js).
The default query that the app will execute is defined in [constants.js](../constants.js) as:
```graphql
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
```
The query takes a policy argument.

# Policies

Policies are a declarative way to describe your organization's security recommendations for Mobile devices. The default policy is  defined in [constants.js](../constants.js) as:
```graphql
  "policy": {
    "osVersion": {
      "ios": ">=11.0", 
      "android": ">=8.0.0"
    }, 
    "pinOrFingerprintSet": "ALWAYS", 
    "verifiedOs": "ALWAYS"
  }
```

## Specifying Requirements

The specifics are explained in more detail below, but generally there are two main ways to express a requirement:

  * [Semver](https://semver.org/) string (or platform-specific semver strings)
  * `RequirementOption`

### Semver Strings

[Semver](https://semver.org/) (Semantic Versioning) is a common versioning practice that uses MAJOR.MINOR.PATCH format (e.g. 10.13.2). Semver supports comparisons and logical operators, and the policy allows any valid semver for comparison.

**platform-specific semver**

Some requirements (software versions, os verisons) are dependent on the platform. For these cases we have special GraphQL schemas defined:

```graphql
# a platform string requirement defines a target string value for specific platforms
input PlatformStringRequirement {
  ios: Semver
  android: Semver
  all: Semver
}
```

### RequirementOption

The `RequirementOption` enum contains the following `ALWAYS`, `SUGGESTED`, `NEVER`, `IF_SUPPORTED` [schema](../graphql/schema.js#L86-92)

 If the requirement is `ALWAYS`, the user will only pass this practice if their setting is enabled

 If the requirement is `SUGGESTED`, the user will pass whether or not the setting is enabled, but will receive a nudge (yellow) suggesting they enable it.

 If the requirement is `NEVER`, the user will only pass if the setting is disabled.

 If the requirement is `IF_SUPPORTED`, the user will only pass if their platform supports the practice (and reliable querying of the practice)

## Understanding Responses

Scans return a JSON object with an overall status and individual practice status. Valid return values for a scan/practice are: `PASS`, `NUDGE`, and `FAIL`.

**Example Response**

```json
{
  "data": {
    "mobileDevice": {
      "deviceId": "AAA-999-9999-9999-AAAAAAAA",
      "deviceName": "iPhone X",
      "platform": "iOS",
      "osVersion": "12.2",
      "hardwareModel": "iPhone X",
      "hardwareSerial": null,
      "manufacturer": "Apple",
      "brand": "Apple",
      "stethoscopeVersion": "1.0",
      "deviceLocale": "en",
      "deviceCountry": "US",
      "security": {
        "osVersion": "12.2",
        "pinOrFingerprintSet": "TRUE",
        "verifiedOs": "FALSE"
      }
    },
    "policy": {
      "validateWithDetails": {
        "status": "PASS",
        "osVersion": "PASS",
        "pinOrFingerprintSet": "PASS",
        "verifiedOs": "PASS"
      }
    }
  }
}
```
