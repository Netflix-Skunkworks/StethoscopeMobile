import React, { Component } from 'react';
import {
  Platform,
  Text,
  View, 
  ScrollView, 
  Linking, 
  TouchableHighlight,
  Alert
} from 'react-native';
import SystemQuery from './graphql/SystemQuery';
import { isValidDeviceReportUrl, PASS, NUDGE, FAIL, defaultQuery, defaultPolicy, policySort } from './constants';
import { appStyles as styles } from './styles';
import ExpandArrow from './ExpandArrow';
import PracticeStatus from './PracticeStatus';
import { decode as atob, encode as btoa } from 'base-64';

type Props = {};
export default class App extends Component<Props> {
  constructor(){ 
    super();
    this.state = {mobileDevice: {}, policyResult: {}, practices: [], returnPath: '', query: defaultQuery, policy: defaultPolicy, showDeviceInfo: false};
  }

  componentDidMount() {
    Linking.addEventListener('url', this.handleOpenURL);
    Linking.getInitialURL().then((url) => {
      if (url) {
        this.handleOpenURL({url});
      }
    })

    this.runDeviceScan();
  }

  componentWillUnmount() { 
      Linking.removeEventListener('url', this.handleOpenURL);
  }

  toggleDeviceInfo = () => { 
    this.setState({showDeviceInfo: !this.state.showDeviceInfo});
  }

  handleOpenURL = (event) => {
    if (event.url){ 
      try {
        const appParameters = JSON.parse(atob(event.url.replace("stethoscope://","")));
        if (isValidDeviceReportUrl(appParameters.r)) {
          this.setState({returnPath: appParameters.r});
        }
        if (appParameters.q && appParameters.p){ 
          this.setState({query: appParameters.q, policy: JSON.parse(appParameters.p)});
        }
      } catch (e) {
        console.error("Failed to parse parameters.");
      }
    }
  }

  onAuthLinkBackPress = () => {
    if (this.state.deviceStatus !== PASS){ 
      Alert.alert(
        'Security warning!',
        'The device you are using does not match our recommended security settings.',
        [
          {text: "Let's fix it!", onPress: () => {} },
          {text: "Remind me next time", onPress: () => { this.openReturnUrl(); }},
        ],
        { cancelable: true }
      );
    } else {
      this.openReturnUrl();
    }
  }

  openReturnUrl = () => { 
    const deviceInfo = {
      policy: this.state.policyResult,
      device: this.state.mobileDevice,
      returnUrl: this.state.returnPath, 
      reportTime: new Date()
    };
    const returnUrl = this.state.returnPath + "#deviceInfo=" + btoa(JSON.stringify(deviceInfo));
    Linking.openURL(returnUrl).catch(err => console.error('An error occurred opening return URL', err));
  }

  runDeviceScan = () => {
    const systemQuery = new SystemQuery();
    systemQuery.execute(this.state.query, this.state.policy)
    .then((result) => {
      console.log("Result ", JSON.stringify(result, null, 2));
      this.setState({mobileDevice: result.data.mobileDevice});
      this.setState({policyResult: result.data.policy});
      let practiceList = Object.keys(result.data.policy.validateWithDetails).map((practice) => {
        return {practice, status: result.data.policy.validateWithDetails[practice]};
      });
      practiceList.sort(policySort);
      this.setState({deviceStatus: result.data.policy.validateWithDetails.status});
      this.setState({practices: practiceList});
    })
    .catch((e)=>{console.error("QUERY ERROR", e);});
  }

  render () {
    let appBannerColor = '#DFE8DB';
    if (this.state.deviceStatus === NUDGE){
      appBannerColor = '#fbf3df';
    } else if (this.state.deviceStatus === FAIL){ 
      appBannerColor = '#f2dede';
    }
    return (
      <View style={styles.container}>
        <View style={[styles.appBanner, {backgroundColor: appBannerColor}]}>
          <Text style={styles.hardwareModel} onPress={this.toggleDeviceInfo}>{this.state.mobileDevice.hardwareModel}</Text>
          <ExpandArrow onPress={this.toggleDeviceInfo} arrowOpen={this.state.showDeviceInfo}/>
          <Text style={styles.deviceName} onPress={this.toggleDeviceInfo}>{this.state.mobileDevice.deviceName}</Text>
        </View>
        <ScrollView>
          <ReturnButton show={this.state.returnPath} onPress={this.onAuthLinkBackPress} />
          <MobileDeviceInfo show={this.state.showDeviceInfo} mobileDevice={this.state.mobileDevice}/>
          <PracticeStatusList mobileDevice={this.state.mobileDevice} practices={this.state.practices} />
        </ScrollView>
      </View>
    );
  }
}

const ReturnButton = ({ show, onPress }) => {
  return show ? 
  <TouchableHighlight onPress={onPress}><View style={styles.reportContainer}><Text style={styles.deviceStatusButton}>Report device status</Text></View></TouchableHighlight> : 
  null;
}

const MobileDeviceInfo = ({ show, mobileDevice }) => {
  return show ? 
    Object.keys(mobileDevice).map((key, i) => {
      if (typeof mobileDevice[key] === 'string'){ 
        const upperKey = key.charAt(0).toUpperCase() + key.slice(1);
        const firstItemStyle = i == 0 ? styles.marginTop10 : null;
        const lastItemStyle = i == Object.keys(mobileDevice).length - 2 ? styles.marginBottom10 : null;
        return (
          <View style={styles.mobileDeviceInfoView} key={i}>
            <Text style={[(firstItemStyle || lastItemStyle), styles.mobileDeviceInfoText]}>
              <Text style={styles.deviceInfoHeading}>{upperKey.match(/[A-Z][a-z]+/g).join(" ")}: </Text>
              <Text style={styles.deviceInfoDetail}>{mobileDevice[key]}</Text>
            </Text>
          </View>
        );
      }
    }) : 
    null;
};

const PracticeStatusList = ({ mobileDevice, practices }) => {
  let practiceStatusList = [];
  if (mobileDevice && practices.length > 0) {
    practiceStatusList = practices.map((practice, i) => {
      return <PracticeStatus practice={practice.practice} status={practice.status} platform={mobileDevice.platform} key={i} practiceIndex={i} />;
    });
  }
  return practiceStatusList;
}
