import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Colors from '../utils/Colors';
import CustomText from './CustomText';
import {moderateScale} from 'react-native-size-matters';

const OrderItem = ({imageSource, title, price, quantity, status}) => {
  return (
    <View style={styles.orderItemContainer}>
      <Image source={imageSource} style={styles.productImage} />
      <View style={styles.productInfo}>
        <CustomText style={{fontSize: moderateScale(14), fontWeight: '600'}}>
          {title}
        </CustomText>
        <CustomText style={{fontSize: moderateScale(14), fontWeight: '600'}}>
          ${price}
        </CustomText>
        <View
          style={[styles.containerWrapper, {justifyContent: 'space-between'}]}>
          <CustomText style={{fontSize: moderateScale(12), fontWeight: '400'}}>
            x{quantity}
          </CustomText>
          <View style={styles.statusContainer}>
            <CustomText
              style={{fontSize: moderateScale(10), fontWeight: '400'}}>
              {status}
            </CustomText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  orderSummaryContainer: {
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderColor: '#444',
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  orderItemContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    // borderBottomWidth: 1,
    // borderColor: '#444',
  },
  productImage: {
    width: moderateScale(60),
    height: moderateScale(60),
    marginRight: 10,
    borderRadius: moderateScale(10),
  },
  productInfo: {
    flex: 1,
  },
  statusContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: Colors.primary,
    borderRadius: 15,
    height: moderateScale(20),
    width: moderateScale(80),
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerWrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
