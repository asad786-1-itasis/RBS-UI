import {
  Alert,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import CustomStyle from "../utils/CustomStyle";
import CustomText from "../Components/CustomText";
import images from "../utils/images";
import { moderateScale } from "react-native-size-matters";
import Colors from "../utils/Colors";
import Feather from "react-native-vector-icons/Feather";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useDispatch, useSelector } from "react-redux";
import CustomStatusBar from "../utils/CustomStatusBar";
import { useNavigation } from "@react-navigation/native";
import * as Animatable from "react-native-animatable";
import { useCustomToast } from "../utils/ToastNofticiation";
import Loader from "../utils/Loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t } from "../Languages/translations";
import HorizontalCards from "../Components/HorizontalCards";
import AttendanceList from "../Components/AttendanceList";
import PreviousJobs from "../Components/PreviousJobs";

const Home = () => {
  let navigation = useNavigation();
  let dispatch = useDispatch();
  let { showToast } = useCustomToast();
  
  const [loading, setLoading] = useState(false);
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [currentCheckInTime, setCurrentCheckInTime] = useState(null);
  const [currentBreakStartTime, setCurrentBreakStartTime] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [totalWorkingHours, setTotalWorkingHours] = useState("00:00:00");

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
      hour12: true 
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

    if (isOnBreak) {
      showToast("Please end break first!", "error");
      return;
    }

    const now = new Date();
    const workingHours = calculateTimeDifference(currentCheckInTime, now);
    
    setIsCheckedIn(false);
    setCurrentCheckInTime(null);
    setTotalWorkingHours(workingHours);

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
      <CustomStatusBar />
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
              <CustomText style={styles.headerTitle}>Worker</CustomText>
              <TouchableOpacity style={styles.profileButton}>
                <Feather name="user" size={24} color={Colors.black} />
              </TouchableOpacity>
            </View>
          </Animatable.View>

          {/* Clock Display */}
          <Animatable.View animation={"fadeInUp"} duration={600} delay={200}>
            <View style={styles.clockContainer}>
              <CustomText style={styles.currentTimeText}>
                {getFormattedTime(currentTime)}
              </CustomText>
              <CustomText style={styles.currentDateText}>
                {getFormattedDate(currentTime)}
              </CustomText>
              {totalWorkingHours !== "00:00:00" && isCheckedIn && (
                <CustomText style={styles.workingHoursText}>
                  Working Hours: {calculateTimeDifference(currentCheckInTime, currentTime)}
                </CustomText>
              )}
              {isOnBreak && (
                <CustomText style={styles.breakTimeText}>
                  Break Time: {calculateTimeDifference(currentBreakStartTime, currentTime)}
                </CustomText>
              )}
            </View>
          </Animatable.View>

          {/* Check In/Out and Break Buttons */}
          <Animatable.View animation={"fadeInUp"} duration={600} delay={400}>
            <View style={styles.buttonContainer}>
              <View style={styles.topButtonRow}>
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

                <TouchableOpacity
                  onPress={handleCheckOut}
                  style={[
                    styles.actionButton,
                    styles.checkOutButton,
                    (!isCheckedIn || isOnBreak) && styles.disabledButton
                  ]}
                  disabled={!isCheckedIn || isOnBreak}
                >
                  <Feather name="log-out" size={20} color={Colors.white} />
                  <CustomText style={styles.buttonText}>Check Out</CustomText>
                </TouchableOpacity>
              </View>

              <View style={styles.bottomButtonRow}>
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
          <Animatable.View animation={"fadeInUp"} duration={600} delay={1000}>
            <PreviousJobs />
          </Animatable.View>
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
    paddingVertical: moderateScale(15),
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
  clockContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(15),
    padding: moderateScale(25),
    alignItems: 'center',
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
  currentTimeText: {
    fontSize: moderateScale(36),
    fontWeight: 'bold',
    color: '#6f60bf',
    marginBottom: moderateScale(8),
    letterSpacing: 2,
  },
  currentDateText: {
    fontSize: moderateScale(16),
    color: Colors.black,
    opacity: 0.7,
    textAlign: 'center',
  },
  workingHoursText: {
    fontSize: moderateScale(14),
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: moderateScale(10),
    textAlign: 'center',
  },
  breakTimeText: {
    fontSize: moderateScale(14),
    color: '#FF9800',
    fontWeight: '600',
    marginTop: moderateScale(5),
    textAlign: 'center',
  },
  buttonContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(15),
    padding: moderateScale(20),
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
  topButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(15),
    gap: moderateScale(10),
  },
  bottomButtonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: moderateScale(10),
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: moderateScale(12),
    borderRadius: moderateScale(8),
    gap: moderateScale(8),
  },
  checkInButton: {
    backgroundColor: '#4CAF50',
  },
  checkOutButton: {
    backgroundColor: '#FF5722',
  },
  startBreakButton: {
    backgroundColor: '#FF9800',
  },
  endBreakButton: {
    backgroundColor: '#795548',
  },
  disabledButton: {
    backgroundColor: Colors.gray,
    opacity: 0.5,
  },
  buttonText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: Colors.white,
  },
});