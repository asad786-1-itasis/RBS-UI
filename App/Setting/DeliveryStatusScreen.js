import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons'; // You can use any icon library or custom images
import Octicons from 'react-native-vector-icons/Octicons'; // You can use any icon library or custom images
import Colors from '../utils/Colors';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import CustomText from '../Components/CustomText';
import {moderateScale} from 'react-native-size-matters';
import CustomStatusBar from '../utils/CustomStatusBar';
import Entypo from 'react-native-vector-icons/Entypo';
const DeliveryStatusScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <CustomStatusBar />
      <KeyboardAwareScrollView
        style={{flex: 1}}
        contentContainerStyle={{flexGrow: 1}}>
        {/* Back button and Header */}
        <View style={styles.header}>
          <Entypo
            name={'chevron-left'}
            size={moderateScale(25)}
            color={Colors.white} // Star color
          />
          <CustomText
            style={{
              fontSize: moderateScale(24),
              fontWeight: '700',
              marginLeft: 10,
            }}>
            Delivery status
          </CustomText>
        </View>

        {/* Estimated Delivery Date */}
        <View style={styles.estimatedDeliveryContainer}>
          <CustomText
            style={{
              fontSize: moderateScale(14),
              fontWeight: '500',
              marginLeft: 10,
            }}>
            Estimate delivery
          </CustomText>
          <CustomText
            style={{
              fontSize: moderateScale(18),
              fontWeight: '600',
              marginLeft: 10,
            }}>
            20 June 2022: 05:30 PM
          </CustomText>
        </View>

        {/* Order tracking section */}
        <View style={styles.trackOrderContainer}>
          <View style={styles.trackHeader}>
            <CustomText
              style={{
                fontSize: moderateScale(14),
                fontWeight: '600',
                marginLeft: 10,
              }}>
              Track order
            </CustomText>
            <CustomText
              style={{
                fontSize: moderateScale(14),
                fontWeight: '600',
                marginLeft: 10,
              }}>
              NYC1054C
            </CustomText>
          </View>

          {/* Status Items */}
          <View style={styles.trackStepsContainer}>
            {trackData.map((item, index) => (
              <View style={styles.stepItem} key={index}>
                <View style={styles.iconContainer}>
                  {index != 3 && (
                    <View
                      style={{
                        height: moderateScale(30),
                        backgroundColor: Colors.white,
                        width: 1,
                        position: 'absolute',
                        top: moderateScale(28),
                        right: moderateScale(11),
                      }}></View>
                  )}
                  <Icon
                    name={
                      item.completed ? 'check-circle' : 'radio-button-unchecked'
                    }
                    size={24}
                    color={item.completed ? Colors.primary : Colors.inactive}
                  />
                </View>
                <View style={styles.stepTextContainer}>
                  <Text
                    style={[
                      styles.stepTitle,
                      item.highlighted && styles.highlightedText,
                    ]}>
                    <CustomText
                      style={{
                        fontSize: moderateScale(14),
                        fontWeight: '600',
                        marginLeft: 10,
                      }}>
                      {item.title}
                    </CustomText>
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                    }}>
                    <Octicons name={'clock'} size={14} color={Colors.white} />
                    <CustomText
                      style={{
                        fontSize: moderateScale(10),
                        fontWeight: '500',
                        marginLeft: 5,
                      }}>
                      {item.time}
                    </CustomText>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const trackData = [
  {
    title: 'Pick-up request accepted',
    time: '9:10 AM, 19 June 2022',
    completed: true,
  },
  {
    title: 'Product picked & started journey',
    time: '12:40 PM, 19 June 2022',
    completed: true,
  },
  {
    title: 'Dispatch in local warehouse',
    time: '1:10 AM, 20 June 2022',
    completed: true,
    highlighted: true,
  },
  {
    title: 'Parcel delivered!',
    time: '5:30 AM, 20 June 2022',
    completed: true,
  },
];

// const Colorss = {
//   white: '#FFFFFF',
//   primary: '#FFD700',
//   black: '#000000',
//   gray: '#888888',
//   success: '#FFD700', // Custom color for success
//   inactive: '#CCCCCC',
// };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  scrollContainer: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    marginLeft: 8,
  },
  estimatedDeliveryContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  estimatedText: {
    color: Colors.gray,
    fontSize: 16,
  },
  estimatedDate: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 4,
  },
  trackOrderContainer: {
    backgroundColor: '#333',
    borderRadius: 12,
    padding: 16,
    marginTop: 24,
  },
  trackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  trackTitle: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  trackOrderNumber: {
    color: Colors.gray,
    fontSize: 16,
  },
  trackStepsContainer: {
    marginTop: 16,
  },
  stepItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  stepTextContainer: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    color: Colors.white,
  },
  stepTime: {
    fontSize: 14,
    color: Colors.gray,
    marginTop: 4,
  },
  highlightedText: {
    color: Colors.primary,
  },
});

export default DeliveryStatusScreen;
