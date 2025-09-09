import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import Colors from "../utils/Colors";
import CustomText from "./CustomText";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");

const initialTasks = [
  {
    id: "1",
    title: "Site Preparation",
    subtitle: "Downtown Office Complex",
    status: "Completed",
    statusColor: "#C6F6D5",
    statusTextColor: "#276749",
    taskTitle: "Site survey and soil testing",
    priority: "🔥 HIGH ",
    description:
      "Comprehensive site survey including topographical mapping and soil composition analysis for foundation planning.",
    progressStatus: "Completed",
    date: "Nov 20, 2025",
    progressDotColor: "#276749",
    completedTasks: 5,
    totalTasks: 5,
    percentage: 100,
    progressColor: "#276749",
  },
  {
    id: "2",
    title: "Electrical Wiring",
    subtitle: "Residential Complex",
    status: "In Progress",
    statusColor: "#FFF9DB",
    statusTextColor: "#D69E2E",

    taskTitle: "Install wiring and outlets",
    priority: "Medium",
    description:
      "Install wiring and outlets across all units as per electrical plans.",
    progressStatus: "In Progress",
    date: "Oct 15, 2025",
    progressDotColor: "#D69E2E",
    completedTasks: 7,
    totalTasks: 10,
    percentage: 70,
    progressColor: "#D69E2E",
  },
  {
    id: "3",
    title: "Foundation Work",
    subtitle: "Highway Bridge Repair",
    status: "Pending",
    statusColor: "#FED7D7",
    statusTextColor: "#9B2C2C",
    taskTitle: "Pour concrete and cure",
    priority: "Critical",
    description:
      "Pour concrete foundation and allow to cure as per structural guidelines.",
    progressStatus: "Pending",
    date: "Dec 5, 2025",
    progressDotColor: "#9B2C2C",
    completedTasks: 3,
    totalTasks: 10,
    percentage: 30,
    progressColor: "#9B2C2C",
  },
];

const MyTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);

  const openModal = (taskId) => {
    setSelectedTaskId(taskId);
    setModalVisible(true);
  };

  const confirmComplete = () => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === selectedTaskId
          ? {
            ...task,
            status: "Completed",
            statusColor: "#C6F6D5",
            statusTextColor: "#276749",
            progressStatus: "Completed",
            progressDotColor: "#276749",
            percentage: 100,
            completedTasks: task.totalTasks,
            progressColor: "#276749",
          }
          : task
      )
    );
    setModalVisible(false);
  };

  const renderItem = ({ item }) => {
    return (
      <Animatable.View
        animation="fadeInUp"
        duration={600}
        style={[styles.card, { borderLeftColor: item.statusTextColor }]}
      >
        {/* Card Header */}
        <View style={styles.header}>
          <View
            style={[styles.iconCircle, { backgroundColor: item.statusColor }]}
          >
            {item.status === "Completed" ? (
              <CustomText
                style={[styles.iconText, { color: item.statusTextColor }]}
              >
                ✔️
              </CustomText>
            ) : (
              <CustomText
                style={[styles.iconText, { color: item.statusTextColor }]}
              >
                ⏳
              </CustomText>
            )}
          </View>

          <View style={{ flex: 1, paddingLeft: moderateScale(10) }}>
            <CustomText style={styles.title}>{item.title}</CustomText>
            <CustomText style={styles.subtitle}>{item.subtitle}</CustomText>
          </View>

          <View
            style={[
              styles.statusContainer,
              { backgroundColor: item.statusColor },
            ]}
          >
            <CustomText
              style={[styles.statusText, { color: item.statusTextColor }]}
            >
              {item.status.toUpperCase()}
            </CustomText>
          </View>
        </View>

        {/* Details */}
        <View
          style={[
            styles.detailContainer,
            { backgroundColor: lightenColor(item.statusColor, 0.7) },
          ]}
        >
          


          <View style={styles.bottomRow}>


            <CustomText style={styles.date}>Due: {item.date}</CustomText>
            <View style={styles.priorityContainer}>
              <CustomText style={styles.priorityText}>{item.priority}</CustomText>
            </View>
          </View>

          {/* Progress Info */}
          <View style={styles.progressTextRow}>
            <CustomText style={styles.tasksCompletedText}>
              {item.completedTasks}/{item.totalTasks} tasks completed
            </CustomText>
            <CustomText style={styles.percentageText}>
              {item.percentage}%
            </CustomText>
          </View>

          {/* Progress Bar - FIXED: Added animation and proper styling */}
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBarBackground}>
              <Animatable.View
                animation="fadeInRight"
                duration={800}
                style={[
                  styles.progressBarFill,
                  {
                    width: `${item.percentage}%`,
                    backgroundColor: item.progressColor,
                  },
                ]}
              />
            </View>
          </View>

          <CustomText style={styles.taskTitle}>{item.taskTitle}</CustomText>



          <CustomText style={styles.description}>{item.description}</CustomText>

          {/* <View style={styles.bottomRow}>
            <View style={styles.progressStatus}>
              <View
                style={[
                  styles.progressDot,
                  { backgroundColor: item.progressDotColor },
                ]}
              />
              <CustomText
                style={[
                  styles.progressStatusText,
                  { color: item.progressDotColor },
                ]}
              >
                {item.progressStatus}
              </CustomText>
            </View>

            <CustomText style={styles.date}>{item.date}</CustomText>
          </View> */}
        </View>

        {/* Complete Button */}
        {item.status !== "Completed" && (
          <TouchableOpacity
            style={[
              styles.completeButton,
              { backgroundColor: item.statusTextColor },
            ]}
            onPress={() => openModal(item.id)}
          >
            <CustomText style={styles.completeButtonText}>Complete</CustomText>
          </TouchableOpacity>
        )}
      </Animatable.View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Task List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={{ padding: moderateScale(15), paddingTop: 10 }}
      />

      {/* Confirmation Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <CustomText style={styles.modalText}>
              Are you sure you want to complete this task?
            </CustomText>

            <View style={styles.modalButtons}>
              <Pressable
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <CustomText style={styles.cancelButtonText}>Cancel</CustomText>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmComplete}
              >
                <CustomText style={styles.confirmButtonText}>Yes</CustomText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

// Utility function to lighten color
function lightenColor(color, amount) {
  let col = color.substring(1);
  const num = parseInt(col, 16);
  let r = (num >> 16) + Math.round(255 * amount);
  let g = ((num >> 8) & 0x00ff) + Math.round(255 * amount);
  let b = (num & 0x0000ff) + Math.round(255 * amount);
  r = r > 255 ? 255 : r;
  g = g > 255 ? 255 : g;
  b = b > 255 ? 255 : b;
  return `rgb(${r},${g},${b})`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(12),
    padding: moderateScale(15),
    marginBottom: moderateScale(15),
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: moderateScale(10),
  },
  iconCircle: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  iconText: {
    fontSize: moderateScale(24),
  },
  title: {
    fontWeight: "bold",
    fontSize: moderateScale(16),
    color: "#111827",
  },
  subtitle: {
    fontSize: moderateScale(14),
    color: "#6B7280",
  },
  statusContainer: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    borderRadius: moderateScale(20),
  },
  statusText: {
    fontWeight: "600",
    fontSize: moderateScale(12),
  },
  detailContainer: {
    borderRadius: moderateScale(12),
    // padding: moderateScale(15),
  },
  taskTitle: {
    fontWeight: "bold",
    fontSize: moderateScale(15),
    marginTop: moderateScale(10),
    marginBottom: moderateScale(6),
    color: "#111827",
  },
  priorityContainer: {
    // backgroundColor: "#FED7D7",
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(8),
    alignSelf: "flex-start",
    marginBottom: moderateScale(6),
  },
  priorityText: {
    color: "#9B2C2C",
    fontWeight: "600",
  },
  description: {
    fontSize: moderateScale(14),
    color: "#374151",
    marginBottom: moderateScale(15),
  },
  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(10),
  },
  tasksCompletedText: {
    fontSize: moderateScale(11),
    color: "#444",
  },
  percentageText: {
    fontSize: moderateScale(11),
    color: "#444",
    fontWeight: "bold",
  },
  progressBarContainer: {
    marginTop: moderateScale(6),
  },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#E0E0E0",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // marginTop: moderateScale(10),
    alignItems:'center'
  },
  progressStatus: {
    flexDirection: "row",
    alignItems: "center",
  },
  progressDot: {
    width: moderateScale(10),
    height: moderateScale(10),
    borderRadius: moderateScale(5),
    marginRight: moderateScale(6),
  },
  progressStatusText: {
    fontWeight: "600",
    fontSize: moderateScale(14),
  },
  date: {
    fontSize: moderateScale(14),
    color: "#374151",
  },
  completeButton: {
    marginTop: moderateScale(12),
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(10),
    alignItems: "center",
  },
  completeButtonText: {
    fontWeight: "600",
    fontSize: moderateScale(14),
    color: "#fff",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    width: width * 0.8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 5,
  },
  modalText: {
    fontSize: moderateScale(16),
    marginBottom: moderateScale(20),
    textAlign: "center",
    fontWeight: "600",
    color: "#111827",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    borderRadius: moderateScale(8),
    paddingVertical: moderateScale(10),
    paddingHorizontal: moderateScale(20),
  },
  cancelButton: {
    backgroundColor: "#E5E7EB",
  },
  cancelButtonText: {
    color: "000",
    fontWeight: "600",
  },
  confirmButton: {
    backgroundColor: Colors.primary || "#276749",
  },
  confirmButtonText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default MyTasks;