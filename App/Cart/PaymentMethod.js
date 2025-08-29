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
const PaymentMethod = () => {
  let navigation = useNavigation();
  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <CustomStatusBar />
      <View style={[styles.headerContainer]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={[styles.headerContainer, {marginBottom: moderateScale(0)}]}>
          <Entypo
            name={'chevron-left'}
            size={moderateScale(25)}
            color={Colors.white} // Star color
          />
          {/* <CustomText
            style={{
              fontSize: moderateScale(18),
              fontWeight: '500',
              paddingLeft: 10,
            }}>
            Cart
          </CustomText> */}
        </TouchableOpacity>
      </View>
      <View style={[CustomStyle.BodyStyle]}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}>
          <View style={styles.headerContainer}>
            <CustomText
              style={{
                fontSize: moderateScale(24),
                fontWeight: '500',
              }}>
              Pay with
            </CustomText>
            <View style={styles.container}>
              <CustomText
                style={{
                  fontSize: moderateScale(16),
                  fontWeight: '400',
                }}>
                Payment Currency:
              </CustomText>
              <CustomText
                style={{
                  fontSize: moderateScale(16),
                  fontWeight: '400',
                  color: '#C6924E',
                }}>
                USD
              </CustomText>
            </View>
          </View>

          <View style={styles.paymentOptionsContainer}>
            {data.map((item, index) => {
              return (
                <View style={styles.PaymentWrapper}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={item.image}
                      resizeMode="contain"
                      style={styles.imageStyle}
                    />
                    <TouchableOpacity
                      onPress={() => navigation.navigate('CardDetail')}
                      style={styles.paymentOption}>
                      <CustomText
                        style={{
                          fontSize: moderateScale(16),
                          fontWeight: '400',
                        }}>
                        {item.name}
                      </CustomText>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('CardDetail')}
                    style={styles.paymentOption}>
                    <Entypo
                      name={'chevron-right'}
                      size={moderateScale(25)}
                      color={Colors.white} // Star color
                    />
                  </TouchableOpacity>
                </View>
              );
            })}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PaymentMethod;

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
    marginBottom: moderateScale(20),
  },
  headerText: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: 'black',
  },
  currencyText: {
    fontSize: moderateScale(18),
    color: 'gray',
    marginTop: moderateScale(5),
  },
  paymentOptionsContainer: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(30),
  },
  paymentOption: {
    // backgroundColor: Colors.BtnClr || '#C6924E', // Replace with your button color
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(20),
    borderRadius: moderateScale(10),

    // width: '30%',
  },
  paymentText: {
    fontSize: moderateScale(16),
    color: 'white',
    fontWeight: 'bold',
  },
  PaymentWrapper: {flexDirection: 'row', justifyContent: 'space-between'},
  imageStyle: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(10),
  },
});
