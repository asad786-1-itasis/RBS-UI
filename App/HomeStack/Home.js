import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomStyle from "../utils/CustomStyle";
import CustomText from "../Components/CustomText";
import { moderateScale } from "react-native-size-matters";
import Colors from "../utils/Colors";
import Feather from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { useCustomToast } from "../utils/ToastNofticiation";
import AttendanceList from "../Components/AttendanceList";
import HorizontalCards from "../Components/HorizontalCards";
import PreviousJobs from "../Components/PreviousJobs";

const Home = () => {
  let navigation = useNavigation();
  let { showToast } = useCustomToast();
  
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [currentCheckInTime, setCurrentCheckInTime] = useState(null);
  const [currentBreakStartTime, setCurrentBreakStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalWorkingHours, setTotalWorkingHours] = useState("00:00:00");
  const [totalBreakTime, setTotalBreakTime] = useState("00:00:00");
  const [statusText, setStatusText] = useState("Checked Out");
  const [statusColor, setStatusColor] = useState("#9e9e9e");

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Get formatted time with seconds
  const getFormattedTime = (date = new Date()) => {
    return date.toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    });
  };

  // Get formatted date
  const getFormattedDate = (date = new Date()) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Calculate time difference in HH:MM:SS format
  const calculateTimeDifference = (startTime, endTime) => {
    if (!startTime) return "00:00:00";
    const diff = endTime.getTime() - startTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  // Handle Check In
  const handleCheckIn = () => {
    if (isCheckedIn) {
      showToast("Already checked in!", "error");
      return;
    }

    const now = new Date();
    setIsCheckedIn(true);
    setCurrentCheckInTime(now);
    setStatusText("Checked In");
    setStatusColor("#4CAF50");
    
    const newRecord = {
      id: Date.now().toString(),
      type: 'checkin',
      time: getFormattedTime(now),
      date: getFormattedDate(now),
      timestamp: now,
      icon: 'log-in'
    };

    setAttendanceRecords(prev => [newRecord, ...prev]);
    showToast("Successfully checked in!", "success");
  };

  // Handle Check Out
  const handleCheckOut = () => {
    if (!isCheckedIn) {
      showToast("Please check in first!", "error");
      return;
    }

    const now = new Date();
    const workingHours = calculateTimeDifference(currentCheckInTime, now);
    
    setIsCheckedIn(false);
    setIsOnBreak(false);
    setCurrentCheckInTime(null);
    setCurrentBreakStartTime(null);
    setTotalWorkingHours(workingHours);
    setStatusText("Checked Out");
    setStatusColor("#9e9e9e");

    const newRecord = {
      id: Date.now().toString(),
      type: 'checkout',
      time: getFormattedTime(now),
      date: getFormattedDate(now),
      timestamp: now,
      icon: 'log-out',
      totalHours: workingHours
    };

    setAttendanceRecords(prev => [newRecord, ...prev]);
    showToast("Successfully checked out!", "success");
  };

  // Handle Start Break
  const handleStartBreak = () => {
    if (!isCheckedIn) {
      showToast("Please check in first!", "error");
      return;
    }

    if (isOnBreak) {
      showToast("Break already started!", "error");
      return;
    }

    const now = new Date();
    setIsOnBreak(true);
    setCurrentBreakStartTime(now);
    setStatusText("On Break");
    setStatusColor("#FF9800");

    const newRecord = {
      id: Date.now().toString(),
      type: 'breakstart',
      time: getFormattedTime(now),
      date: getFormattedDate(now),
      timestamp: now,
      icon: 'coffee'
    };

    setAttendanceRecords(prev => [newRecord, ...prev]);
    showToast("Break started!", "success");
  };

  // Handle End Break
  const handleEndBreak = () => {
    if (!isOnBreak) {
      showToast("No active break to end!", "error");
      return;
    }

    const now = new Date();
    const breakDuration = calculateTimeDifference(currentBreakStartTime, now);
    
    setIsOnBreak(false);
    setCurrentBreakStartTime(null);
    setTotalBreakTime(breakDuration);
    setStatusText("Working");
    setStatusColor("#4CAF50");

    const newRecord = {
      id: Date.now().toString(),
      type: 'breakend',
      time: getFormattedTime(now),
      date: getFormattedDate(now),
      timestamp: now,
      icon: 'coffee',
      breakDuration: breakDuration
    };

    setAttendanceRecords(prev => [newRecord, ...prev]);
    showToast("Break ended!", "success");
  };

  return (
    <SafeAreaView style={[CustomStyle.SafeAreaStyle, {}]}>
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          backgroundColor: Colors.background,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.background,
        }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        <View style={[CustomStyle.BodyStyle, {}]}>
          {/* Header */}
          <Animatable.View animation={"fadeInDown"} duration={500}>
            <View style={styles.headerContainer}>
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={styles.backButton}
              >
                <Feather name="arrow-left" size={24} color={Colors.black} />
              </TouchableOpacity>
       
              <TouchableOpacity style={styles.profileButton}>
                <Feather name="user" size={24} color={Colors.black} />
              </TouchableOpacity>
            </View>
          </Animatable.View>

          {/* Status Indicator */}
          <Animatable.View animation={"fadeInUp"} duration={600} delay={100}>
            <View style={styles.statusContainer1}>
              <CustomText style={styles.headerTitle}>Employee Time Clock</CustomText>
              <View style={styles.statusContainer}>
                <View style={[styles.statusIndicator, {backgroundColor: statusColor}]} />
                <CustomText style={styles.statusText}>{statusText}</CustomText>
              </View>
            </View>
          </Animatable.View>

          {/* Combined Container - Clock, Total Today, Buttons, and Time Breakdown */}
          <Animatable.View animation={"fadeInUp"} duration={600} delay={200}>
            <View style={styles.combinedContainer}>
              
              {/* Clock Display */}
              <View style={styles.clockSection}>
                <CustomText style={styles.currentTimeText}>
                  {getFormattedTime(currentTime)}
                </CustomText>
                <CustomText style={styles.currentDateText}>
                  {getFormattedDate(currentTime)}
                </CustomText>
              </View>

          
              {/* Total Today */}
              <View style={styles.totalSection}>
                <CustomText style={styles.totalLabel}>Total Today:  </CustomText>
                <CustomText style={styles.totalTime}>
                  {isCheckedIn 
                    ? calculateTimeDifference(currentCheckInTime, currentTime) 
                    : totalWorkingHours}
                </CustomText>
              </View>

              {/* Divider */}
              {/* <View style={styles.sectionDivider} /> */}

              {/* Action Buttons */}
              <View style={styles.buttonsSection}>
                {/* Check In/Out Row */}
                <View style={styles.buttonRow}>
                  <View style={styles.buttonSection}>
                    {/* <CustomText style={styles.sectionLabel}>Check In</CustomText> */}
                    <TouchableOpacity
                      onPress={handleCheckIn}
                      style={[
                        styles.actionButton,
                        styles.checkInButton,
                        isCheckedIn && styles.disabledButton
                      ]}
                      disabled={isCheckedIn}
                    >
                      <Feather name="log-in" size={20} color={Colors.white} />
                      <CustomText style={styles.buttonText}>Check In</CustomText>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.buttonDivider} />
                  
                  <View style={styles.buttonSection}>
                    {/* <CustomText style={styles.sectionLabel}>Check Out</CustomText> */}
                    <TouchableOpacity
                      onPress={handleCheckOut}
                      style={[
                        styles.actionButton,
                        styles.checkOutButton,
                        !isCheckedIn && styles.disabledButton
                      ]}
                      disabled={!isCheckedIn}
                    >
                      <Feather name="log-out" size={20} color={Colors.white} />
                      <CustomText style={styles.buttonText}>Check Out</CustomText>
                    </TouchableOpacity>
                  </View>
                </View>
                
                {/* Divider */}
                <View style={styles.rowDivider} />
                
                {/* Break Buttons Row */}
                <View style={styles.buttonRow}>
                  <View style={styles.buttonSection}>
                    {/* <CustomText style={styles.sectionLabel}>Start Break</CustomText> */}
                    <TouchableOpacity
                      onPress={handleStartBreak}
                      style={[
                        styles.actionButton,
                        styles.startBreakButton,
                        (!isCheckedIn || isOnBreak) && styles.disabledButton
                      ]}
                      disabled={!isCheckedIn || isOnBreak}
                    >
                      <Feather name="coffee" size={20} color={Colors.white} />
                      <CustomText style={styles.buttonText}>Start Break</CustomText>
                    </TouchableOpacity>
                  </View>
                  
                  <View style={styles.buttonDivider} />
                  
                  <View style={styles.buttonSection}>
                    {/* <CustomText style={styles.sectionLabel}>End Break</CustomText> */}
                    <TouchableOpacity
                      onPress={handleEndBreak}
                      style={[
                        styles.actionButton,
                        styles.endBreakButton,
                        !isOnBreak && styles.disabledButton
                      ]}
                      disabled={!isOnBreak}
                    >
                      <Feather name="coffee" size={20} color={Colors.white} />
                      <CustomText style={styles.buttonText}>End Break</CustomText>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>

              {/* Divider */}
              <View style={styles.sectionDivider} />

              {/* Time Breakdown */}
              <View style={styles.breakdownSection}>
                <View style={styles.breakdownRow}>
                  <View style={styles.breakdownItem}>
                    <CustomText style={styles.breakdownLabel}>Work Time</CustomText>
                    <CustomText style={styles.breakdownTime}>
                      {isCheckedIn 
                        ? calculateTimeDifference(currentCheckInTime, currentTime) 
                        : totalWorkingHours}
                    </CustomText>
                  </View>
                  
                  <View style={styles.breakdownDivider} />
                  
                  <View style={styles.breakdownItem}>
                    <CustomText style={styles.breakdownLabel}>Break Time</CustomText>
                    <CustomText style={[styles.breakdownTime, {color: '#FF9800'}]}>
                      {isOnBreak 
                        ? calculateTimeDifference(currentBreakStartTime, currentTime) 
                        : totalBreakTime}
                    </CustomText>
                  </View>
                </View>
              </View>
            </View>
          </Animatable.View>

          {/* Attendance List */}
          <Animatable.View animation={"fadeInUp"} duration={600} delay={600}>
            <AttendanceList attendanceRecords={attendanceRecords} />
          </Animatable.View>
          
          {/* Horizontal Cards */}
          <Animatable.View animation={"fadeInUp"} duration={600} delay={800}>
            <HorizontalCards />
          </Animatable.View>
          
          {/* Previous Jobs */}
          <View style={{paddingBottom:moderateScale(50)}}>
          <Animatable.View animation={"fadeInUp"} duration={600} delay={1000}>
            <PreviousJobs />
          </Animatable.View>
          </View>
        </View>

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: moderateScale(10),
    // marginBottom:moderateScale(35),
    paddingHorizontal: moderateScale(5),
  },
  backButton: {
    padding: moderateScale(8),
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: Colors.black,
  },
  profileButton: {
    padding: moderateScale(8),
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  statusIndicator: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(6),
    marginRight: moderateScale(8),
  },
  statusText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  // Combined Container Styles
  combinedContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(15),
    padding: moderateScale(2),
    marginVertical: moderateScale(10),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  clockSection: {
    alignItems: 'center',
    paddingVertical: moderateScale(2),
  },
  totalSection: {
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'center',
    paddingVertical: moderateScale(3),
  },
  buttonsSection: {
    paddingVertical: moderateScale(10),
  },
  breakdownSection: {
    paddingBottom: moderateScale(10),
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: moderateScale(2),
  },
  currentTimeText: {
    fontSize: moderateScale(36),
    fontWeight: 'bold',
    color: '#333',
    
  },
  currentDateText: {
    fontSize: moderateScale(14),
    color: '#666',
    textAlign: 'center',
  },
  totalLabel: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: 'blue',
    // marginBottom: moderateScale(8),
  },
  totalTime: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    color: 'blue',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonSection: {
    flex: 1,
    alignItems: 'center',
  },
  // sectionLabel: {
  //   fontSize: moderateScale(14),
  //   color: '#666',
  //   marginBottom: moderateScale(120),
  //   textAlign: 'center',
  // },
  buttonDivider: {
    width: 1,
    backgroundColor: '#eee',
    marginHorizontal: moderateScale(10),
  },
  rowDivider: {
    // height: 1,
    // backgroundColor: '#eee',
    marginVertical: moderateScale(10),
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(16),
    borderRadius: moderateScale(8),
    minWidth: '86%',
  },
  checkInButton: {
    backgroundColor: '#4CAF50',
  },
  checkOutButton: {
    backgroundColor: '#F44336',
  },
  startBreakButton: {
    backgroundColor: '#FF9800',
  },
  endBreakButton: {
    backgroundColor: 'blue',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    opacity: 0.7,
  },
  buttonText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: Colors.white,
    marginLeft: moderateScale(8),
  },
  breakdownRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  breakdownItem: {
    flex: 1,
    alignItems: 'center',
  },
  breakdownLabel: {
    fontSize: moderateScale(14),
    color: '#666',
  },
  breakdownTime: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#4CAF50',
  },
  breakdownDivider: {
    width: 1,
    backgroundColor: '#eee',
  },
});