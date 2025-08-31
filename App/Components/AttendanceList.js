import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../utils/Colors';
import CustomText from './CustomText';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';

const AttendanceList = ({ attendanceRecords }) => {
  const getActionText = (type) => {
    switch (type) {
      case 'checkin':
        return 'Checked In';
      case 'checkout':
        return 'Checked Out';
      case 'breakstart':
        return 'Break Started';
      case 'breakend':
        return 'Break Ended';
      default:
        return '';
    }
  };

  const getActionColor = (type) => {
    switch (type) {
      case 'checkin':
        return '#4CAF50';
      case 'checkout':
        return '#FF5722';
      case 'breakstart':
        return '#FF9800';
      case 'breakend':
        return 'blue';
      default:
        return Colors.gray;
    }
  };

  const getIconName = (type) => {
    switch (type) {
      case 'checkin':
        return 'log-in';
      case 'checkout':
        return 'log-out';
      case 'breakstart':
      case 'breakend':
        return 'coffee';
      default:
        return 'circle';
    }
  };

  const renderAttendanceItem = ({ item, index }) => (
    <Animatable.View
      animation="slideInRight"
      duration={500}
      delay={index * 100}
    >
      <View style={styles.attendanceItem}>
        <View style={styles.leftSection}>
          <View style={[styles.iconContainer, { backgroundColor: getActionColor(item.type) }]}>
            <Feather
              name={getIconName(item.type)}
              size={18}
              color={Colors.white}
            />
          </View>

          <View style={styles.contentSection}>
            <CustomText style={styles.actionText}>
              {getActionText(item.type)}
            </CustomText>
            <CustomText style={styles.timeText}>
              {item.time}
            </CustomText>
            {item.breakDuration && (
              <CustomText style={styles.durationText}>
                Duration: {item.breakDuration}
              </CustomText>
            )}
            {item.totalHours && (
              <CustomText style={styles.totalHoursText}>
                Total Hours: {item.totalHours}
              </CustomText>
            )}
          </View>
        </View>

        <View style={styles.rightSection}>
          <CustomText style={styles.dateText}>
            {new Date(item.timestamp).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric'
            })}
          </CustomText>
        </View>
      </View>
    </Animatable.View>
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Feather name="clock" size={48} color={Colors.gray} />
      <CustomText style={styles.emptyText}>No activity yet</CustomText>
      <CustomText style={styles.emptySubText}>
        Start by checking in to track your attendance
      </CustomText>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <CustomText style={styles.headerTitle}>Today's Activity</CustomText>
        <TouchableOpacity style={styles.viewAllButton}>
          <CustomText style={styles.viewAllText}>4 Task</CustomText>
          {/* <Feather name="arrow-right" size={16} color="#6f60bf" /> */}
        </TouchableOpacity>
      </View>

      <View style={styles.listContainer}>
        <FlatList
          data={attendanceRecords}
          renderItem={renderAttendanceItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={true}
          ListEmptyComponent={renderEmptyComponent}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          // style={{ height: moderateScale(280) }}
          nestedScrollEnabled={true}   // 👈 ye add karo
        />
      </View>
    </View>
  );
};

export default AttendanceList;

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateScale(10),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(15),
    paddingHorizontal: moderateScale(5),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: Colors.black,
  },
  viewAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
  },
  viewAllText: {
    fontSize: moderateScale(14),
    color: '#6f60bf',
    fontWeight: '600',
  },
  listContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(15),
    padding: moderateScale(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  listContent: {
    flexGrow: 1,
  },
  attendanceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(15),
    paddingHorizontal: moderateScale(5),
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: moderateScale(15),
  },
  contentSection: {
    flex: 1,
  },
  actionText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.black,
    marginBottom: moderateScale(4),
  },
  timeText: {
    fontSize: moderateScale(14),
    color: Colors.gray,
    marginBottom: moderateScale(2),
  },
  durationText: {
    fontSize: moderateScale(12),
    color: '#FF9800',
    fontWeight: '500',
  },
  totalHoursText: {
    fontSize: moderateScale(12),
    color: '#4CAF50',
    fontWeight: '500',
  },
  rightSection: {
    alignItems: 'flex-end',
  },
  dateText: {
    fontSize: moderateScale(12),
    color: Colors.gray,
    fontWeight: '500',
  },
  separator: {
    height: 1,
    backgroundColor: Colors.background,
    marginHorizontal: moderateScale(10),
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(40),
  },
  emptyText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    color: Colors.black,
    marginTop: moderateScale(15),
    marginBottom: moderateScale(5),
  },
  emptySubText: {
    fontSize: moderateScale(12),
    color: Colors.gray,
    textAlign: 'center',
    paddingHorizontal: moderateScale(20),
  },
});