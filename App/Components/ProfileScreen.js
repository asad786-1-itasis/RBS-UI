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
  import MaterialIcons from "react-native-vector-icons/MaterialIcons";
  import AntDesign from "react-native-vector-icons/AntDesign";
  import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
  import { useNavigation } from "@react-navigation/native";
  import * as Animatable from "react-native-animatable";
  import { useCustomToast } from "../utils/ToastNofticiation";
  
  const ProfileScreen = () => {
    const navigation = useNavigation();
    const { showToast } = useCustomToast();
    
    const handleSignOut = () => {
      // Add your sign out logic here
      showToast("Signed out successfully", "success");
      // navigation.navigate('LoginScreen');
    };
  
    return (
      <KeyboardAwareScrollView 
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <CustomText style={styles.avatarEmoji}>👷</CustomText>
          </View>
          
          <CustomText style={styles.name}>Mike Johnson</CustomText>
          <CustomText style={styles.designation}>Construction Worker</CustomText>
          <CustomText style={styles.id}>ID: CW-2024-001</CustomText>
        </View>
  
        {/* Profile Details Card */}
        <Animatable.View animation="fadeInUp" delay={200} style={styles.detailsCard}>
          {/* Current Site */}
          <View style={styles.detailRow}>
            <CustomText style={styles.detailLabel}>Current Site</CustomText>
            <CustomText style={styles.detailValue}>Downtown Plaza</CustomText>
          </View>
  
          {/* Department */}
          <View style={styles.detailRow}>
            <CustomText style={styles.detailLabel}>Department</CustomText>
            <CustomText style={styles.detailValue}>Foundation & Structure</CustomText>
          </View>
  
          {/* Experience */}
          <View style={styles.detailRow}>
            <CustomText style={styles.detailLabel}>Experience</CustomText>
            <CustomText style={styles.detailValue}>5 Years</CustomText>
          </View>
  
          {/* Safety Rating */}
          <View style={styles.detailRow}>
            <CustomText style={styles.detailLabel}>Safety Rating</CustomText>
            <View style={styles.safetyRating}>
              <AntDesign name="star" size={moderateScale(16)} color="#FFD700" />
              <CustomText style={styles.excellentText}>Excellent</CustomText>
            </View>
          </View>
        </Animatable.View>
  
        {/* This Week Section */}
        <Animatable.View animation="fadeInUp" delay={400} style={styles.weekSection}>
          <CustomText style={styles.weekTitle}>This Week</CustomText>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <CustomText style={styles.statNumber}>32</CustomText>
              <CustomText style={styles.statLabel}>Hours Worked</CustomText>
            </View>
            
            <View style={styles.statItem}>
              <CustomText style={[styles.statNumber, {color: Colors.success}]}>15</CustomText>
              <CustomText style={styles.statLabel}>Tasks Done</CustomText>
            </View>
          </View>
        </Animatable.View>
  
        {/* View Reports Button */}
        <Animatable.View animation="fadeInUp" delay={600}>
          <TouchableOpacity style={styles.reportsButton}>
            <MaterialIcons name="bar-chart" size={moderateScale(20)} color={Colors.primary} />
            <CustomText style={styles.reportsText}>View Reports</CustomText>
          </TouchableOpacity>
        </Animatable.View>
  
        {/* Settings Button */}
        <Animatable.View animation="fadeInUp" delay={800}>
          <TouchableOpacity style={styles.settingsButton}>
            <Feather name="settings" size={moderateScale(20)} color={Colors.primary} />
            <CustomText style={styles.settingsText}>Settings</CustomText>
          </TouchableOpacity>
        </Animatable.View>
  
        {/* Sign Out Button */}
        <Animatable.View animation="fadeInUp" delay={1000}>
          <TouchableOpacity 
            style={styles.signOutButton}
            onPress={handleSignOut}
          >
            <Feather name="log-out" size={moderateScale(20)} color={Colors.white} />
            <CustomText style={styles.signOutText}>Sign Out</CustomText>
          </TouchableOpacity>
        </Animatable.View>
      </KeyboardAwareScrollView>
    );
  };
  
  export default ProfileScreen;
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#f3f2f2',
      paddingHorizontal: moderateScale(20),
    },
    profileHeader: {
      alignItems: 'center',
      paddingVertical: moderateScale(30),
      backgroundColor: Colors.white || '#ffffff',
      marginTop: moderateScale(20),
      borderRadius: moderateScale(15),
      ...CustomStyle.shadow,
    },
    avatarContainer: {
      width: moderateScale(80),
      height: moderateScale(80),
      borderRadius: moderateScale(40),
      backgroundColor: '#F5E6D3',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: moderateScale(15),
      
    },
    avatarEmoji: {
      fontSize: moderateScale(35),
    },
    name: {
      fontSize: moderateScale(24),
      fontWeight: 'bold',
      color: Colors.textPrimary || '#333333',
      marginBottom: moderateScale(5),
    },
    designation: {
      fontSize: moderateScale(16),
      color: Colors.textSecondary || '#666666',
      marginBottom: moderateScale(5),
    },
    id: {
      fontSize: moderateScale(14),
      color: Colors.textSecondary || '#888888',
    },
    detailsCard: {
        backgroundColor: '#FFF',
        borderRadius: moderateScale(20),
        padding: moderateScale(20),
        // marginBottom: moderateScale(10),
        // borderLeftWidth: moderateScale(5),
        marginTop: moderateScale(20),
      
        // 🔥 Shadow effect (cross-platform)
     
     
        // shadowOpacity: 0.1,
        shadowRadius: 6,
        // elevation: 1,
    },
    detailRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: moderateScale(12),
    },
    detailLabel: {
      fontSize: moderateScale(16),
      color: Colors.textSecondary || '#666666',
      flex: 1,
    },
    detailValue: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      color: Colors.textPrimary || '#333333',
      flex: 1,
      textAlign: 'right',
    },
    safetyRating: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-end',
    },
    excellentText: {
      fontSize: moderateScale(16),
      fontWeight: '600',
      color: Colors.success || '#4CAF50',
      marginLeft: moderateScale(5),
    },
    weekSection: {
      backgroundColor: Colors.white || '#ffffff',
      borderRadius: moderateScale(15),
      padding: moderateScale(20),
      marginTop: moderateScale(20),
      ...CustomStyle.shadow,
    },
    weekTitle: {
      fontSize: moderateScale(20),
      fontWeight: 'bold',
      color: Colors.textPrimary || '#333333',
      marginBottom: moderateScale(20),
    },
    statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    statItem: {
      alignItems: 'center',
    },
    statNumber: {
      fontSize: moderateScale(32),
      fontWeight: 'bold',
      color: Colors.primary || '#007AFF',
      marginBottom: moderateScale(5),
    },
    statLabel: {
      fontSize: moderateScale(14),
      color: Colors.textSecondary || '#666666',
    },
    reportsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    //   backgroundColor: Colors.white || '#ffffff',
      paddingVertical: moderateScale(15),
      paddingHorizontal: moderateScale(20),
      borderRadius: moderateScale(10),
      marginTop: moderateScale(20),
      ...CustomStyle.shadow,
    },
    reportsText: {
      fontSize: moderateScale(16),
      color: Colors.primary || '#007AFF',
      marginLeft: moderateScale(10),
      fontWeight: '600',
    },
    settingsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    //   backgroundColor: Colors.white || '#ffffff',
      paddingVertical: moderateScale(15),
      paddingHorizontal: moderateScale(20),
      borderRadius: moderateScale(10),
      marginTop: moderateScale(15),
      ...CustomStyle.shadow,
    },
    settingsText: {
      fontSize: moderateScale(16),
      color: Colors.primary || '#007AFF',
      marginLeft: moderateScale(10),
      fontWeight: '600',
    },
    signOutButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: Colors.error || '#FF3B30',
      paddingVertical: moderateScale(15),
      borderRadius: moderateScale(10),
      marginTop: moderateScale(15),
      marginBottom: moderateScale(30),
      ...CustomStyle.shadow,
    },
    signOutText: {
      fontSize: moderateScale(16),
      color: Colors.white || '#ffffff',
      marginLeft: moderateScale(10),
      fontWeight: '600',
    },
  });