import instructionLinks from './instructionLinks.js';

module.exports = {
  organization: 'netflix',
  practices: {
    osVersion : {
      title: 'Up-to-date', 
      description: 'One of the most important things you can do to secure your device is to keep your operating system and software up to date. New vulnerabilities and weaknesses are found every day, so frequent updates are essential to ensuring your device include the latest fixes and preventative measures. Enabling automatic updating helps ensure your machine is up-to-date without having to manually install updates.', 
      directions: {
        ios: [ 
                { text: 'Open Settings > General > Software Update', action: instructionLinks.ios.settings },
                { text: 'Install any outstanding updates' },
              ], 
        android: [ 
                   { text: 'Open Settings > System > System update > Check for update', action: instructionLinks.android.general },
                   { text: 'Install any outstanding updates' },
                 ],
      }
    }, 
    pinOrFingerprintSet : {
      title: 'Pin or fingerprint set', 
      description: 'Screen a pin or fingerprint set prevents unauthorized third-parties from accessing your device when unattended.', 
      directions: {
        ios: [
               { text: 'Open Settings > Face Id / Touch Id & Passcode', action: instructionLinks.ios.settings },
               { text: 'Turn on User Face Id for iPhone Unlock' },
             ], 
        android: [ 
                   { text: 'Open Settings > Security & Location > Screen lock', action: instructionLinks.android.general },
                   { text: 'Choose the Fingerprint, Pattern, PIN or Password option' },
                 ],
      }
    }, 
    verifiedOs : {
      title: 'Verified OS', 
      description: 'Modifying the basic operating system (known as "jailbreaking" or "rooting") of a device increases the risk of infection or compromise by exposing additional security vulnerabilities.', 
    }
  }
};
