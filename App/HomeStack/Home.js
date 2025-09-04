import {

  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
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
import { SafeAreaView } from "react-native-safe-area-context";
import MyTasks from "../Components/MyTasks";

const Home = () => {
  let navigation = useNavigation();
  let { showToast } = useCustomToast();

  const [isCheckedIn, setIsCheckedIn] = useState(false);

  // Handle Check In
  const handleCheckIn = () => {
    if (isCheckedIn) {
      showToast("Already checked in!", "error");
      return;
    }
    setIsCheckedIn(true);
    showToast("Successfully checked in!", "success");
  };

  // Handle End Shift
  const handleEndShift = () => {
    if (!isCheckedIn) {
      showToast("Please check in first!", "error");
      return;
    }
    setIsCheckedIn(false);
    showToast("Shift ended!", "success");
  };

  return (
    <SafeAreaView style={[CustomStyle.SafeAreaStyle, { flex: 1, backgroundColor: Colors.background }]}>
      <KeyboardAwareScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
      >
        {/* ====== Blue Header Section ====== */}
        <View style={styles.header}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>

            <View>
              <CustomText style={styles.greetingText}>Good Morning</CustomText>

              <CustomText style={styles.userName}>John Smith</CustomText>
            </View>

            <TouchableOpacity style={styles.profileButton}>
              <Feather name="user" size={24} color={Colors.white} />
            </TouchableOpacity>
          </View>

          {/* Status Badge */}
          <View
            style={[
              styles.statusBadge,
              {
                backgroundColor: isCheckedIn ? "#D4F7D4" : "#FFD6D6",
              },
            ]}
          >
            <View
              style={[
                styles.statusDot,
                { backgroundColor: isCheckedIn ? "green" : "red" },
              ]}
            />
            <CustomText
              style={{
                color: isCheckedIn ? "green" : "red",
                fontWeight: "600",
              }}
            >
              {isCheckedIn ? "Checked In" : "Not Checked In"}
            </CustomText>
          </View>
        </View>

        {/* ====== Action Buttons Card ====== */}
        <Animatable.View animation={"fadeInUp"} duration={600} delay={300}>
          <View style={styles.buttonContainer}>
            {/* Check In */}
            <TouchableOpacity
              onPress={handleCheckIn}
              disabled={isCheckedIn}
              style={[
                styles.actionButton,
                {
                  backgroundColor: isCheckedIn ? "green" : "#1E63EE",
                },
              ]}
            >
              <Feather
                name="check-circle"
                size={20}
                color={Colors.white}
                style={{ marginRight: 8 }}
              />
              <CustomText style={styles.buttonText}>
                {isCheckedIn ? "Checked In" : "Check In"}
              </CustomText>
            </TouchableOpacity>

            {/* End Shift */}
            <TouchableOpacity
              onPress={handleEndShift}
              disabled={!isCheckedIn}
              style={[
                styles.actionButton,
                {
                  backgroundColor: isCheckedIn ? "orange" : "#ccc",
                },
              ]}
            >
              <Feather
                name="log-out"
                size={20}
                color={Colors.white}
                style={{ marginRight: 8 }}
              />
              <CustomText style={styles.buttonText}>End Shift</CustomText>
            </TouchableOpacity>
          </View>
        </Animatable.View>





        <Animatable.View animation={"fadeInUp"} duration={600} delay={600}>
          <AttendanceList />
        </Animatable.View>

        <Animatable.View animation={"fadeInUp"} duration={600} delay={600}>
          <CustomText style={styles.heading}>Assigned Projects</CustomText>
        </Animatable.View>


        <Animatable.View animation={"fadeInUp"} duration={600} delay={800}>
          <HorizontalCards />
        </Animatable.View>

        {/* Previous Jobs */}
        <View>
          <Animatable.View animation={"fadeInUp"} duration={600} delay={1000}>
            <PreviousJobs />
          </Animatable.View>
        </View>
        <Animatable.View animation={"fadeInUp"} duration={600} delay={800}>
          <MyTasks />
        </Animatable.View>


      </KeyboardAwareScrollView>
    </SafeAreaView >
  );
};

export default Home;

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1E63EE", // Blue background
    padding: moderateScale(20),
    paddingTop: moderateScale(25),
    // borderBottomLeftRadius: moderateScale(20),
    // borderBottomRightRadius: moderateScale(20),
    alignItems: "flex-start",
  },
  greetingText: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: Colors.white,
  },
  userName: {
    fontSize: moderateScale(14),
    color: "#f1f1f1",
    marginTop: moderateScale(1),
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: moderateScale(6),
    paddingHorizontal: moderateScale(15),
    borderRadius: moderateScale(20),
    marginTop: moderateScale(12),
    marginBottom: moderateScale(12),
  },
  statusDot: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    marginRight: moderateScale(8),
  },
  buttonContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    marginHorizontal: moderateScale(15),
    padding: moderateScale(20),
    marginTop: moderateScale(-15), // overlap effect

    // Shadow for iOS
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,

    // Shadow for Android
    elevation: 6,
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: moderateScale(14),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(12),
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: Colors.white,
  },
  profileButton: {
    // padding: moderateScale(8),
    tintColor: 'white'
  },
  heading: {
    fontSize: moderateScale(20),
    marginHorizontal: moderateScale(15),
    fontWeight: "bold",
    marginVertical: moderateScale(20),

    // color: Colors.white,
  }
});
