import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {Children, useState} from 'react';
import CustomStyle from '../utils/CustomStyle';
import Colors from '../utils/Colors';
import {moderateScale} from 'react-native-size-matters';
import ClothesCard from '../Components/ClothesCard';
import images from '../utils/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AccordionList} from 'accordion-collapse-react-native';
import CustomText from '../Components/CustomText';
import FilterModal from '../Components/FilterModal';
import WishListProduct from '../Components/WishListProduct';
import CustomStatusBar from '../utils/CustomStatusBar';
import {useNavigation} from '@react-navigation/native';

const data = [
  {
    id: 1,
    name: 'Card or debit card',
    image: images.CardPay,
  },
  {
    id: 2,
    name: 'Pay pal',
    image: images.Paypal,
  },
  {
    id: 3,
    name: 'Apple pay',
    image: images.ApplePay,
  },
];
const CardDetail = () => {
  let navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);
  const [CVVVslue, setCVVVslue] = useState('001');
  const [CardNumber, setCardNumber] = useState('0000 0000 0000 0000');

  // Toggle checkbox state
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <CustomStatusBar />
      <TouchableOpacity
      onPress={()=>navigation.goBack()}
      
      style={[styles.headerContainer]}>
        <View
          style={[styles.headerContainer, {marginBottom: moderateScale(0)}]}>
          <Entypo
            name={'chevron-left'}
            size={moderateScale(25)}
            color={Colors.white} // Star color
          />
        </View>
        <View>
          <CustomText
            style={{
              fontSize: moderateScale(18),
              fontWeight: '500',
            }}>
            Card details
          </CustomText>
        </View>
      </TouchableOpacity>
      <View style={[CustomStyle.BodyStyle]}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}>
          {/* Card Image */}
          <Image
            source={images.Paypal} // Replace with your card image URL
            style={styles.cardImage}
            resizeMode="cover"
          />

          {/* Card Number */}
          <View style={{marginVertical: moderateScale(15)}}>
            <View style={styles.cardContainer}>
              <CustomText
                style={{
                  fontSize: moderateScale(18),

                  paddingRight: 10,
                }}>
                Card Number
              </CustomText>
              <Ionicons name="card-outline" size={20} color={Colors.white} />
            </View>

            <View style={styles.cardNumberContainer}>
              <TextInput
                value={CardNumber}
                onChangeText={setCardNumber}
                style={[styles.input, {marginLeft: 0}]}
              />
            </View>
          </View>

          {/* Expiry Date and CVV */}
          <View style={styles.detailsContainer}>
            <View style={styles.detailRow}>
              <CustomText
                style={{
                  fontSize: moderateScale(16),
                }}>
                Expiry Date
              </CustomText>
              <View style={styles.cardContainer}>
                <Ionicons
                  name="calendar-clear-outline"
                  size={20}
                  color={Colors.white}
                />
                <TextInput
                  value="12/25"
                  style={styles.input}
                  editable={false} // Non-editable input for now
                />
              </View>
            </View>

            <View style={styles.detailRow}>
              <CustomText
                style={{
                  fontSize: moderateScale(16),
                }}>
                CVV
              </CustomText>
              <View style={styles.cardContainer}>
                <Ionicons
                  name="lock-closed-outline"
                  size={20}
                  color={Colors.white}
                />
                <TextInput
                  value={CVVVslue}
                  onChangeText={setCVVVslue}
                  style={styles.input}
                  //   editable={false} // Non-editable input for now
                />
              </View>
            </View>
          </View>

          {/* Custom Checkbox */}
          <View style={styles.checkboxContainer}>
            <TouchableOpacity onPress={toggleCheckbox} style={styles.checkbox}>
              {isChecked && (
                <Ionicons name="checkmark" size={16} color="white" />
              )}
            </TouchableOpacity>
            <CustomText
              style={{
                fontSize: moderateScale(16),
                fontWeight: '500',
              }}>
              Set as your default payment method
            </CustomText>
          </View>
          <TouchableOpacity
            style={[
              CustomStyle.FullButton,
              {
                paddingHorizontal: moderateScale(15),
                paddingVertical: moderateScale(10),
                marginTop: moderateScale(20),
              },
            ]}>
            <CustomText
              style={{
                fontSize: moderateScale(18),
                // paddingVertical: moderateScale(10),
                fontWeight: '400',
              }}>
              Add
            </CustomText>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default CardDetail;

const styles = StyleSheet.create({
  footerWrapper: {
    backgroundColor: Colors.textInputClr,
    width: '100%',
    paddingHorizontal: moderateScale(10),
    borderRadius: 10,
  },

  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    // justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  container: {
    flex: 1,
    padding: moderateScale(20),
    backgroundColor: '#fff',
  },
  cardImage: {
    width: '100%',
    height: moderateScale(200),
    marginBottom: moderateScale(20),
    borderRadius: moderateScale(15),
  },

  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardNumber: {
    marginLeft: moderateScale(10),
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  detailsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(20),
  },
  detailRow: {
    flex: 1,
    marginRight: moderateScale(10),
  },
  detailHeading: {
    fontSize: moderateScale(14),
    color: 'gray',
  },
  input: {
    marginTop: moderateScale(5),
    fontSize: moderateScale(16),
    paddingBottom: moderateScale(5),
    color: Colors.white,
    marginLeft: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: moderateScale(20),
  },
  checkbox: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderWidth: 2,
    borderColor: '#C6924E',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(10),
    borderRadius: 5,
  },
  checkboxLabel: {
    fontSize: moderateScale(14),
    color: 'black',
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
