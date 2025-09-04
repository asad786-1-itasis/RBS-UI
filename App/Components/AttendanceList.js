import React from 'react';
import { View, StyleSheet,Text } from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import CustomText from './CustomText'; // Apna custom text component
import * as Animatable from 'react-native-animatable';

const data = [
  {
    count: 5,
    label: 'Assigned Tasks',
    color: '#007BFF', // Blue
  },
  {
    count: 2,
    label: 'Completed',
    color: '#28a745', // Green
  },
  {
    count: 3,
    label: 'In Progress',
    color: '#fd7e14', // Orange
  },
];

const TaskOverview = () => {
  return (
    <View style={styles.wrapper}>
      <CustomText style={styles.heading}>Today's Overview</CustomText>

      <View style={styles.container}>
        {data.map((item, index) => (
          <Animatable.View
            animation="fadeInUp"
            delay={index * 200}
            style={styles.card}
            key={index}
          >
            <CustomText style={[styles.count, { color: item.color }]}>
              {item.count}
            </CustomText>
            <CustomText style={styles.label}>
              {item.label}
            </CustomText>
          </Animatable.View>
        ))}
      </View>
    </View>
  );
};

export default TaskOverview;

const styles = StyleSheet.create({
  wrapper: {
    // paddingHorizontal: moderateScale(10),
    marginTop: moderateScale(20),
    paddingHorizontal: moderateScale(15),
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: moderateScale(15),
    marginTop: moderateScale(20),
  },
  card: {
    flex: 1,
    marginHorizontal: moderateScale(6),
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    alignItems: 'center',
    paddingVertical: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 3, // Android shadow
  },
  count: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
  },
  label: {
    fontSize: moderateScale(12),
    color: '#555',
    textAlign: 'center',
    marginTop: moderateScale(5),
  },
  heading:{
     fontSize: moderateScale(20),
        fontWeight: "bold",
        // color: Colors.white,
  }
});
