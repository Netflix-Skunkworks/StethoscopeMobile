const MobileSecurityInfo = require('./MobileSecurityInfo');
const MobileDevice = require('./MobileDevice');
const semver = require('semver');

const TRUE = "TRUE";
const PASS = "PASS";
const FAIL = "FAIL";
const NUDGE = "NUDGE";
const UNKNOWN = "UNKNOWN";

const validateCriteria = (criteria, deviceAttribute) => {
  let result = PASS;
  if (deviceAttribute === undefined || criteria === undefined){ 
    return UNKNOWN;
  }
  if (criteria.match('\\d')){ //semver criteria
    result = semver.satisfies(semver.coerce(deviceAttribute), criteria) ? PASS : FAIL;
  } else { 
    deviceAttribute = deviceAttribute === TRUE;
    switch(criteria) {
      case "ALWAYS":
        result = deviceAttribute ? PASS : FAIL;
        break;
      case "NEVER":
        result = !deviceAttribute ? PASS : FAIL;
        break;
      case "SUGGESTED":
        result = deviceAttribute ? PASS : NUDGE;
        break;
      default:
        result = UNKNOWN;
    }
  }
  return result;
};

const chooseMostSevereStatus = (aggregateResult, currentResult) => {
  // FAIL > NUDGE > PASS
  return  (aggregateResult !== currentResult && (aggregateResult === PASS || currentResult === FAIL)) ? currentResult : aggregateResult;
};

const validateDevice = async (root, args, context) => {
  const { policy } = args
  let aggregateResult = PASS;
  let policyResult = {};

  for (let verification in policy) {
    let validationResult = await checkVerification(policy, verification);
    policyResult[verification] = validationResult;
    aggregateResult = chooseMostSevereStatus(aggregateResult, validationResult);
  }

  policyResult.status = aggregateResult; 
  return policyResult;
};

const checkVerification = async (policy, verification, root, context, args) => {
  let criteria = policy[verification];
  // pull out platform specific criteria
  if (typeof criteria === 'object'){ 
    let platform = MobileDevice.platform(root, args, context).toLowerCase();
    console.log("platrofmm ", platform);
    criteria = criteria[platform];
  }
  let deviceAttribute = await MobileSecurityInfo[verification](root, args, context);
  return validateCriteria(criteria, deviceAttribute);
};

module.exports = {
  validate: async function (root, args, context) {
    let validationDetails = await validateDevice(root, args, context);
    return validationDetails.status;
  },
  validateWithDetails: async function (root, args, context) {
    return validateDevice(root, args, context);
  },
};
