import React, { Component } from 'react';
import {
  Platform,
  Text,
} from 'react-native';
import { expandArrowStyles as styles } from './styles';

export default class ExpandArrow extends Component<{}> {
  constructor(props){ 
    super();
    this.onPress = props.onPress;
    this.state = {arrowOpen: false, openUnicode: '&#9664;', closeUnicode: '&#9660;'};
  }

  componentDidUpdate (prevProps) { 
    const newProps = this.props;
    if (newProps.arrowOpen !== undefined && prevProps && prevProps.arrowOpen !== newProps.arrowOpen) { 
      this.setState({arrowOpen: newProps.arrowOpen});
    }
  }

  arrowPress = () => { 
    if (this.onPress) this.onPress();
    this.setState({arrowOpen: !this.state.arrowOpen});
  }

  render = () => {
    if (this.state.arrowOpen){ 
      return <Text style={styles.expandArrow} onPress={this.arrowPress}>&#9660;</Text>;
    } else {
      return <Text style={styles.expandArrow} onPress={this.arrowPress}>&#9664;</Text>;
    }
  }
}
