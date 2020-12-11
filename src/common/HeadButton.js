import React, { PureComponent } from 'react';
import { StyleSheet,Image } from 'react-native';
import PropTypes from 'prop-types';
import { ButtonView, TextView } from '@rich/react-native-richway-component/index';
import IconOne from '../image/7.png';

const styles = StyleSheet.create({
  item: {
    height: 38,
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontSize: 11,
  },
  icon: {
    width: 18,
    height: 16,
  },
});
class HeadButton extends PureComponent {
    static propTypes = {
      name: PropTypes.string,
      onPress: PropTypes.func,
    }

    static defaultProps = {
      name: '',
      onPress: () => {},
    }

    render() {
      const { name, onPress } = this.props;
      return (
        <ButtonView style={styles.item} onPress={onPress}>
            <Image source={IconOne} style={styles.icon} />
        </ButtonView>
      );
    }
}
export default HeadButton;
