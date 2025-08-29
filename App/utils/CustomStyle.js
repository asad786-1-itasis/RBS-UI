// styles.js
import { StyleSheet } from 'react-native';
import Colors from './Colors';
import { moderateScale } from 'react-native-size-matters';

const CustomStyle = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000', // Default background color
  },
  BodyStyle: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: moderateScale(10),
  },
  SafeAreaStyle: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  FullButton: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(10),
    backgroundColor: Colors.BtnClr,
    marginTop: moderateScale(10),
  },
  input: {
    height: moderateScale(50),
    // borderColor: '#ccc',
    // borderWidth: 1,
    marginTop: 10,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: Colors.textInputClr,
    color: Colors.black,
    fontSize: moderateScale(15),
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: moderateScale(10)

  },
  InputWithIconWrapper: {
    backgroundColor: Colors.textInputClr,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: moderateScale(48),
    borderRadius: 12,
    paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(10),
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: moderateScale(10)

    // color:Colors.white
  },
  InputWithIcon: {
    color: Colors.black,
    fontSize: moderateScale(15),
    flex: 1,

  },
  heading: {
    fontSize: 24,
    color: '#2A2A2A',
    marginBottom: 20,
  },
  red: {
    fontSize: 16,
    color: 'red',

  },
});

export default CustomStyle;
