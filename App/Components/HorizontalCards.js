import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ViewBase,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../utils/Colors';
import CustomText from './CustomText';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const HorizontalCards = () => {
  // Task cards data matching the image
  const tasksData = [
    {
      id: '1',
      title: 'Foundation Work',
      timeStatus: '2h 15m remaining',
      icon: '🏗️',
      bgColor: '#E8F0FF',
      buttonColor: '#4A90E2',
      buttonText: 'View Details',
      statusType: 'remaining',
      statusColor: '#FF9800',
      bookmarkIcon: true,
    },
    {
      id: '2',
      title: 'Site Safety Check',
      timeStatus: '45m remaining',
      icon: '🦺',
      bgColor: '#E8F5E8',
      buttonColor: '#50C878',
      buttonText: 'View Details',
      statusType: 'remaining',
      statusColor: '#4CAF50',
      bookmarkIcon: false,
    },
    {
      id: '3',
      title: 'Material Delivery',
      timeStatus: 'Overdue by 30m',
      icon: '📦',
      bgColor: '#FFE8E8',
      buttonColor: '#E74C3C',
      buttonText: 'View Details',
      statusType: 'overdue',
      statusColor: '#E74C3C',
      bookmarkIcon: true,
    },
    {
      id: '4',
      title: 'Scaffolding Setup',
      timeStatus: '4h 30m remaining',
      icon: '🏗️',
      bgColor: '#FFF8E1',
      buttonColor: '#F39C12',
      buttonText: 'View Details',
      statusType: 'remaining',
      statusColor: '#2196F3',
      bookmarkIcon: false,
    },
  ];


// Component ke andar
const progressCache = useRef({}); // ✅ useRef use karo

const getProgressWidth = (itemId) => {
  if (!progressCache.current[itemId]) {
    progressCache.current[itemId] = `${Math.random() * 70 + 30}%`;
  }
  return progressCache.current[itemId];
};

  const renderTaskCard = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={500}
      delay={index * 100}
      style={styles.cardContainer}
    >
      <View style={[styles.taskCard, { backgroundColor: item.bgColor }]}>
        {/* Header with bookmark icons */}
        <View style={styles.cardHeader}>
          <TouchableOpacity style={styles.bookmarkLeft}>
            <Feather 
              name="bookmark" 
              size={16} 
              color={item.bookmarkIcon ? '#FF9800' : '#E0E0E0'} 
              fill={item.bookmarkIcon ? '#FF9800' : 'transparent'}
            />
          </TouchableOpacity>
          
          <View style={styles.iconContainer}>
            <CustomText style={styles.iconText}>{item.icon}</CustomText>
          </View>
          
          <View style={styles.bookmarkRight}>
          
          </View>
        </View>

        {/* Task Title */}
        <View style={styles.titleContainer}>
          <CustomText style={styles.taskTitle} numberOfLines={2}>
            {item.title}
          </CustomText>
        </View>

        {/* Time Status with Icon */}
        <View style={styles.timeContainer}>
          <View style={[styles.timeIconContainer, { backgroundColor: item.statusColor }]}>
            <Feather 
              name={item.statusType === 'overdue' ? 'alert-circle' : 'clock'} 
              size={12} 
              color={Colors.white} 
            />
          </View>
          <CustomText 
            style={[
              styles.timeText, 
              { 
                color: item.statusType === 'overdue' ? item.statusColor : item.statusColor 
              }
            ]}
          >
            {item.timeStatus}
          </CustomText>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { 
                  backgroundColor: item.buttonColor,
                  width: item.statusType === 'overdue' ? '100%' : getProgressWidth(item.id)
                }
              ]} 
            />
          </View>
        </View>
</View>

        {/* View Details Button */}
        <TouchableOpacity 
          style={[styles.viewButton, { backgroundColor: item.buttonColor }]}
          activeOpacity={0.8}
        >
          <CustomText style={styles.viewButtonText}>{item.buttonText}</CustomText>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasksData}
        renderItem={renderTaskCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
        decelerationRate="fast"
        snapToInterval={width * 0.65 + moderateScale(30)}
        snapToAlignment="start"
      />
    </View>
  );
};

export default HorizontalCards;

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateScale(10),
  },
  listContent: {
    paddingHorizontal: moderateScale(5),
  },
  cardContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  taskCard: {
    width: width * 0.65,
    borderRadius: moderateScale(12),
    padding: moderateScale(15),
    // height: moderateScale(250),
    justifyContent: 'space-between',
  },
  cardSeparator: {
    width: moderateScale(10),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: moderateScale(10),
  },
  bookmarkLeft: {
    // padding: moderateScale(2),
  },
  bookmarkRight: {
    // padding: moderateScale(2),
  },
  iconContainer: {
    width: moderateScale(45),
    height: moderateScale(45),
    borderRadius: moderateScale(12),
    backgroundColor: 'rgba(255,255,255,0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  iconText: {
    fontSize: moderateScale(22),
  },
  titleContainer: {
    marginBottom: moderateScale(12),
  },
  taskTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: Colors.black,
    textAlign: 'center',
    // lineHeight: moderateScale(20),
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: moderateScale(12),
  },
  timeIconContainer: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(8),
  },
  timeText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: moderateScale(10),
  },
  progressBar: {
    height: moderateScale(6),
    backgroundColor: 'rgba(0,0,0,0.1)',
    borderRadius: moderateScale(3),
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: moderateScale(3),
  },
  viewButton: {
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(12),
    alignItems: 'center',
    justifyContent: 'center',
  },
  viewButtonText: {
    fontSize: moderateScale(14),
    color: Colors.white,
    fontWeight: '600',
  },
});