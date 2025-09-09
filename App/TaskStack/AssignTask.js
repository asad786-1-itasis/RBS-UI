// ... all previous imports
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import CustomText from '../Components/CustomText';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; 
import Colors from '../utils/Colors';
import CustomStyle from '../utils/CustomStyle';

const AssignTask = () => {
  const navigation = useNavigation();

  const projects = [
    {
      id: '1',
      title: 'Downtown Office Complex',
      subtitle: 'Foundation work - Block A',
      assignedBy: 'Mike Johnson',
      completedTasks: 3,
      totalTasks: 5,
      percentage: 60,
      icon: '🏢',
      status: 'Active',
      statusColor: '#FFECB3',
      borderColor: '#FFA726',
      progressColor: '#1976D2',
    },
    {
      id: '2',
      title: 'Residential Complex',
      subtitle: 'Electrical installation - Unit 12',
      assignedBy: 'Sarah Davis',
      completedTasks: 0,
      totalTasks: 4,
      percentage: 0,
      icon: '⚡',
      status: 'Pending',
      statusColor: '#E3F2FD',
      borderColor: '#42A5F5',
      progressColor: '#BDBDBD',
    },
    {
      id: '3',
      title: 'Highway Bridge Repair',
      subtitle: 'Safety inspection report',
      assignedBy: 'Tom Wilson',
      completedTasks: 5,
      totalTasks: 5,
      percentage: 100,
      icon: '📄',
      status: 'Completed',
      statusColor: '#C8E6C9',
      borderColor: '#66BB6A',
      progressColor: '#2E7D32',
    },
    {
      id: '4',
      title: 'Residential Complex',
      subtitle: 'Electrical installation - Unit 12',
      assignedBy: 'Sarah Davis',
      completedTasks: 0,
      totalTasks: 4,
      percentage: 0,
      icon: '⚡',
      status: 'Pending',
      statusColor: '#E3F2FD',
      borderColor: '#42A5F5',
      progressColor: '#BDBDBD',
    },
  ];

  const handleViewDetails = (item) => {
    navigation.navigate("TaskDetails", { task: item });
  };

  const renderProject = ({ item, index }) => (
    <Animatable.View
      animation="fadeInUp"
      duration={500}
      delay={index * 100}
      style={[styles.cardContainer, { borderLeftColor: item.borderColor }]}
    >
      {/* Top Row */}
      <View style={styles.topRow}>
        <View style={styles.iconContainer}>
          <CustomText style={styles.iconText}>{item.icon}</CustomText>
        </View>

        <View style={styles.projectInfo}>
          <CustomText style={styles.title}>{item.title}</CustomText>
          <CustomText style={styles.subtitle}>{item.subtitle}</CustomText>
          <CustomText style={styles.assignedBy}>
            Assigned by: {item.assignedBy}
          </CustomText>
        </View>

        <View style={[styles.statusBadge, { backgroundColor: item.statusColor }]}>
          <CustomText style={styles.statusText}>{item.status}</CustomText>
        </View>
      </View>

      {/* Progress Info */}
      <View style={styles.progressTextRow}>
        <CustomText style={styles.tasksCompletedText}>
          {item.completedTasks}/{item.totalTasks} tasks completed
        </CustomText>
        <CustomText style={styles.percentageText}>{item.percentage}%</CustomText>
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarContainer}>
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${item.percentage}%`, backgroundColor: item.progressColor },
            ]}
          />
        </View>
      </View>

      {/* Button */}
      <View style={styles.buttonWrapper}>
        <TouchableOpacity
          onPress={() => handleViewDetails(item)}
          style={[styles.viewButton, { backgroundColor: item.progressColor }]}
        >
          <CustomText style={styles.viewButtonText}>View Details</CustomText>
        </TouchableOpacity>
      </View>
    </Animatable.View>
  );

  return (
    <SafeAreaView
    style={[
      CustomStyle.SafeAreaStyle,
      { flex: 1, backgroundColor: Colors.background },
    ]}
  >
    <Animatable.View animation="fadeInUp" duration={600} delay={600}>
      <CustomText style={styles.heading}>Assigned Projectss</CustomText>
    </Animatable.View>
  
    <FlatList
      data={projects}
      renderItem={renderProject}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: moderateScale(15),
        paddingBottom: moderateScale(80), // 👈 yahan bottom tab ke liye space
        paddingTop: moderateScale(20),
      }}
    />
  </SafeAreaView>
  
  );
};

export default AssignTask;

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    borderLeftWidth: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconContainer: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(8),
    backgroundColor: 'rgba(0,0,0,0.05)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: moderateScale(20),
  },
  projectInfo: {
    flex: 1,
    paddingHorizontal: moderateScale(10),
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#212121',
  },
  subtitle: {
    fontSize: moderateScale(12),
    color: '#555',
    marginTop: 2,
  },
  assignedBy: {
    fontSize: moderateScale(11),
    color: '#888',
    marginTop: 2,
  },
  statusBadge: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(12),
  },
  statusText: {
    fontSize: moderateScale(10),
    fontWeight: 'bold',
    color: '#333',
  },
  progressTextRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: moderateScale(10),
  },
  tasksCompletedText: {
    fontSize: moderateScale(11),
    color: '#444',
  },
  percentageText: {
    fontSize: moderateScale(11),
    color: '#444',
    fontWeight: 'bold',
  },
  progressBarContainer: {
    marginTop: moderateScale(6),
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  buttonWrapper: {
    alignItems: 'flex-end',
    marginTop: moderateScale(10),
  },
  viewButton: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(8),
  },
  viewButtonText: {
    fontSize: moderateScale(12),
    color: '#fff',
    fontWeight: '600',
  },
  separator: {
    height: moderateScale(15),
  },
  heading: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginVertical: moderateScale(20),
    marginLeft: moderateScale(15),
  },
});
