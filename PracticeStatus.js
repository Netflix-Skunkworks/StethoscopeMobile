import React, { Component } from 'react';
import {
  Platform,
  Text,
  View, 
  Image, 
  TouchableHighlight, 
} from 'react-native';
import instructions from './instructions';
import { PASS, FAIL, NUDGE } from './constants';
import ExpandArrow from './ExpandArrow';
import { practiceStatusStyles as styles } from './styles';

export default class PracticeStatus extends Component<{}> {
  constructor(props){ 
    super();
    this.state = {expandDetails: false, practice: props.practice, status: props.status, platform: props.platform, practiceIndex: props.practiceIndex};
  }

  expandDetailsPress = () => { 
    this.setState({expandDetails: !this.state.expandDetails});
  }

  render() {
    let practiceInstructions = this.state.practice && instructions.practices[this.state.practice];
    if (practiceInstructions){ 
      let containerStyles = this.state.practiceIndex === 1 ? [styles.deviceAttributeContainer, styles.borderTop] : [styles.deviceAttributeContainer];
      return (
        <TouchableHighlight onPress={this.expandDetailsPress} underlayColor="white">
          <View style={containerStyles} onPress={this.expandDetailsPress}>
            <View style={{marginBottom: 15, marginTop: 15}}>
              <View style={{flexDirection: 'row'}}>
                <ComplianceIcon status={this.state.status}/>
                <Text style={styles.deviceDetailHeading}>{practiceInstructions.title}</Text>
              </View>
              <ExpandArrow onPress={this.expandDetailsPress} arrowOpen={this.state.expandDetails}/>
              <PolicyExplanationAndInstructions show={this.state.expandDetails} platform={this.state.platform} practiceInstructions={practiceInstructions} />
            </View>
          </View>
        </TouchableHighlight> 
      );
    }
    return null;
  };
}

const ComplianceIcon = ({status}) => {
  let complianceIcon = null;
  if (status === PASS){ 
    complianceIcon = <Image style={styles.statusImage} source={require('./images/check.jpg')} />;
  } else if (status === NUDGE){ 
    complianceIcon = <Image style={styles.statusImage} source={require('./images/warn.jpg')} />;
  } else if (status === FAIL){ 
    complianceIcon = <Image style={styles.statusImage} source={require('./images/critical.jpg')} />;
  }
  return complianceIcon;
};

const PolicyExplanationAndInstructions = ({show, platform, practiceInstructions}) => {
  if (!show) return null; 
  let directions = null; 
  if (platform && practiceInstructions.directions && practiceInstructions.directions[platform.toLowerCase()]){ 
    directions = practiceInstructions.directions[platform.toLowerCase()].map((instruction, i) => {
      const instructionsStyle = instruction.action ? styles.instructionsLink : null;
      return (
        <View style={styles.flexDirectionRow} key={i}>
          <View style={styles.practiceInstructions}>
            <Text onPress={instruction.action}>{i+1}. <Text style={instructionsStyle}>{instruction.text}</Text></Text>
          </View>
        </View>
      );
    });
  }
  return (
    <View style={styles.policyExplanationAndInstructionsView}>
      <View style={styles.flexDirectionRow}>
        <Text style={styles.deviceDetailText}>{practiceInstructions.description}</Text>
      </View>
      {directions}
    </View>
  );
};
