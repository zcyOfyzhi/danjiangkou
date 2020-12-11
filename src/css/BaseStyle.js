
import {
  Platform,
} from 'react-native';

const BaseColor = '#EAF1FF';
const themeColor = '#3385FF';
const BaseStyle = {
  titleColor: '#333',
  themeColor,
  button: {
    borderColor: themeColor,
    borderWidth: 0.8,
    borderRadius: 5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  buttonPrimary: {
    borderRadius: 5,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    backgroundColor: themeColor,
  },
  headerTitleStyle: {
    alignSelf: 'center',
    flex: 1,
    textAlign: 'center',
    color: '#fff',
    fontSize: 14,
  },
  headerStyle: {
    backgroundColor: themeColor,
    height: Platform.OS === 'android' ? 65 : 40,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
  },
  headerTintColor: '#fff',
  backgroundColor: BaseColor,
  border: {
    borderColor: '#f5f5f5',
    borderBottomWidth: 1,
  },
  borderTop: {
    borderColor: '#f5f5f5',
    borderTopWidth: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  containerShadow: {
    flex: 1,
    backgroundColor: BaseColor,
  },
  select: {
    width: 200,
    borderColor: '#f8f6f9',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textItemColor: '#9c9a9d',
  valueItemColor: '#656165',
  borderView: {
    height: 10,
    backgroundColor: BaseColor,
    width: '100%',
  },
  tableText: {
    fontSize: 11,
    color: '#333',
  },
};
export default BaseStyle;
