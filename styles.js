import {StyleSheet} from 'react-native';

export const appStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appBanner: {
    height:150, 
    alignSelf: 'stretch', 
  },
  mobileDeviceInfoView: {
    marginLeft: 15,
    marginRight: 15,
    marginTop: 2, 
    marginBottom: 2,
  },
  mobileDeviceInfoText: {
    fontSize: 14,
    color: '#373a3c',
  },
  marginTop10: {
    marginTop: 10,
  },
  marginBottom10: {
    marginBottom: 10,
  },
  deviceInfoHeading: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  deviceInfoDetail: {
    fontSize: 14,
    margin: 0,
  },
  hardwareModel: { 
    marginTop: 75,
    fontSize: 18,
    marginLeft: 15,
    fontWeight: 'bold',
    color: '#737b73',
  },
  deviceName: {
    fontSize: 16,
    marginBottom: 20,
    marginLeft: 15,
    color: '#737b73',
  },
  reportContainer: { 
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20, 
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#373a3c',
    padding: 10,
  },
  deviceStatusButton: {
    color: '#373a3c',
    fontSize: 18,
  },
  expandArrow: {
    color: '#aaa',
    alignSelf: 'flex-end',  
    marginRight: 15,
    marginTop: -15,
  },
});

export const expandArrowStyles = StyleSheet.create({
  expandArrow: {
    color: '#aaa',
    alignSelf: 'flex-end',  
    marginRight: 15,
    marginTop: -15,
  },
});

export const practiceStatusStyles = StyleSheet.create({
  borderTop: {
    borderTopWidth: 1,
  },
  flexDirectionRow: {
    flexDirection: 'row'
  },
  deviceAttributeContainer: {
    borderColor: '#aaa', 
    borderBottomWidth: 1,
  },
  statusImage: {
    marginLeft: 15,
    width: 20, 
    height: 20,
  },
  deviceDetailHeading: {
    marginLeft: 10,
    fontSize: 16,
    color: '#737b73',
  },
  policyExplanationAndInstructionsView: {
    marginLeft: 25,
    marginBottom: 15,
  },
  deviceDetailText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 14,
    color: '#737b73',
  },
  practiceInstructions: {
    marginTop: 2, 
    marginBottom: 2, 
    fontSize: 14,
    color: '#737b73',
  }, 
  instructionsLink: {
    color: '#007AFF',
  }
});

export const instructionStyles = StyleSheet.create({
  instructionLink: {
    fontSize: 8,
  }
});

