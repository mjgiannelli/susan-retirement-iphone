import {StyleSheet, Text} from 'react-native';

function Header(): JSX.Element {
  return (
    <Text style={[styles.margins, {fontSize: 16, fontWeight: 'bold', textAlign: 'center'}]}>
      Susie 🌹 Retirement Countdown!
    </Text>
  );
}

const styles = StyleSheet.create({
  margins: {
    width: '90%',
    marginLeft: '5%',
    marginRight: '5%',
  }
})

export default Header;
