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

const PaymentSuccess = () => {
  return (
    <SafeAreaView style={CustomStyle.SafeAreaStyle}>
      <CustomStatusBar />
      <View style={[styles.headerContainer]}>
        <View
          style={[styles.headerContainer, {marginBottom: moderateScale(0)}]}>
          <Entypo
            name={'chevron-left'}
            size={moderateScale(25)}
            color={Colors.white} // Star color
          />
        </View>
        <View>
          {/* <CustomText
            style={{
              fontSize: moderateScale(18),
              fontWeight: '500',
            }}>
            Card details
          </CustomText> */}
        </View>
      </View>
      <View style={[CustomStyle.BodyStyle]}>
        <KeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1}}
          contentContainerStyle={{flexGrow: 1}}>
          {/* Card Image */}
          <Image
            source={images.PaymentSucces} // Replace with your card image URL
            style={styles.cardImage}
            resizeMode="contain"
          />

          {/* Card Number */}
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <CustomText
              style={{
                fontSize: moderateScale(24),
                fontWeight: '600',
                marginVertical: moderateScale(10),
              }}>
              Payment success!
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(15),
                marginVertical: moderateScale(2),
              }}>
              Payment is completed!
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(15),
              }}>
              your order number is #1089324
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
                fontWeight: '500',
              }}>
              Order deliver status
            </CustomText>
          </TouchableOpacity>
          <TouchableOpacity style={{alignItems: 'center'}}>
            <CustomText
              style={{
                fontSize: moderateScale(20),
                marginVertical: moderateScale(10),
              }}>
              Home page
            </CustomText>
          </TouchableOpacity>
        </KeyboardAwareScrollView>
      </View>
    </SafeAreaView>
  );
};

export default PaymentSuccess;

const styles = StyleSheet.create({
  footerWrapper: {
    backgroundColor: Colors.textInputClr,
    width: '100%',
    paddingHorizontal: moderateScale(10),
    borderRadius: 10,
  },
  cardImage: {
    width: '100%',
    height: moderateScale(200),
    marginBottom: moderateScale(20),
    borderRadius: moderateScale(15),
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

  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
});
