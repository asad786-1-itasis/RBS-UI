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
import CustomText from "../Components/CustomText";

const { width } = Dimensions.get("window");

const project = {
  id: "p1",
  title: "Building A - 2nd Floor",
  dueDate: "March 18, 2024",
  completedTasks: 2,
  totalTasks: 8,
  percentage: 30,
  priority: "Medium",
};

const initialTasks = [
  {
    id: "1",
    title: "Cable Planning",
    description: "Review electrical drawings and plan cable routing paths",
    status: "Completed",
    statusColor: "#C6F6D5",
    statusTextColor: "#276749",
    priority: "Medium",
    date: "March 15, 2024",
  },
  {
    id: "2",
    title: "Conduit Installation",
    description:
      "Install protective conduits for electrical cables through walls and ceilings",
    status: "Completed",
    statusColor: "#C6F6D5",
    statusTextColor: "#276749",
    priority: "High",
    date: "March 16, 2024",
  },
  {
    id: "3",
    title: "Wire Pulling",
    description: "Pull electrical cables through conduits to designated locations",
    status: "Pending",
    statusColor: "#FED7D7",
    statusTextColor: "#9B2C2C",
    priority: "High",
    date: "March 17, 2024",
  },
];

const TaskDetails = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [modalVisible, setModalVisible] = useState(false);

  const confirmComplete = () => {
    setTasks((prev) =>
      prev.map((task) =>
        task.status !== "Completed"
          ? {
              ...task,
              status: "Completed",
              statusColor: "#C6F6D5",
              statusTextColor: "#276749",
            }
          : task
      )
    );
    setModalVisible(false);
  };

  const renderTask = ({ item }) => (
    <View style={styles.subtaskCard}>
      {/* Top Row: Title + Priority */}
      <View style={styles.subtaskHeader}>
        <CustomText style={styles.subtaskTitle}>{item.title}</CustomText>
        <View
          style={[
            styles.priorityContainer,
            { backgroundColor: item.statusColor },
          ]}
        >
          <CustomText style={{ color: item.statusTextColor, fontSize: 12 }}>
            {item.priority}
          </CustomText>
        </View>
      </View>

      {/* Description */}
      <CustomText style={styles.subtaskDesc}>{item.description}</CustomText>

      {/* Bottom Row: Icon + Date + Status */}
      <View style={styles.subtaskFooter}>
        <CustomText
          style={{ fontSize: 18, marginRight: 6 }}
        >
          {item.status === "Completed" ? "✔️" : "⏳"}
        </CustomText>
        <CustomText style={styles.subtaskDate}>{item.date}</CustomText>
        <View style={{ flex: 1 }} />
        <CustomText
          style={{ color: item.statusTextColor, fontWeight: "600" }}
        >
          {item.status}
        </CustomText>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* 🔹 Project Header */}
      <View style={styles.headerCard}>
        <View style={styles.headerTop}>
          <CustomText style={styles.projectTitle}>
            {project.title}
          </CustomText>
          <View style={styles.priorityBadge}>
            <CustomText style={styles.priorityBadgeText}>
              {project.priority}
            </CustomText>
          </View>
        </View>

        <CustomText style={styles.dueDate}>
          📅 Due: {project.dueDate}
        </CustomText>

        <CustomText style={styles.progressLabel}>
          Progress: {project.completedTasks}/{project.totalTasks} completed
        </CustomText>

        {/* Progress Bar */}
        <View style={styles.progressBarBackground}>
          <View
            style={[
              styles.progressBarFill,
              { width: `${project.percentage}%` },
            ]}
          />
        </View>
      </View>

      {/* 🔹 Subtasks Heading */}
      <CustomText style={styles.subtaskHeading}>Subtasks</CustomText>

      {/* 🔹 Subtasks List */}
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        contentContainerStyle={{
          paddingHorizontal: moderateScale(15),
          paddingBottom: 100,
        }}
      />

      {/* 🔹 Mark Complete Button */}
      <TouchableOpacity
        style={styles.completeButton}
        onPress={() => setModalVisible(true)}
      >
        <CustomText style={styles.completeButtonText}>✓ Mark Complete</CustomText>
      </TouchableOpacity>

      {/* 🔹 Modal */}
      <Modal visible={modalVisible} transparent animationType="fade">
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
                <CustomText>Cancel</CustomText>
              </Pressable>
              <Pressable
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmComplete}
              >
                <CustomText style={{ color: "#fff" }}>Yes</CustomText>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  headerCard: {
    backgroundColor: "#fff",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  projectTitle: { fontSize: 18, fontWeight: "bold", color: "#111" },
  priorityBadge: {
    backgroundColor: "#FFF9DB",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityBadgeText: { fontSize: 12, fontWeight: "600", color: "#D69E2E" },
  dueDate: { fontSize: 14, color: "#374151", marginVertical: 4 },
  progressLabel: { fontSize: 14, color: "#111", marginBottom: 6 },
  progressBarBackground: {
    height: 6,
    backgroundColor: "#E5E7EB",
    borderRadius: 3,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#0b84ff",
    borderRadius: 3,
  },
  subtaskHeading: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 12,
    marginHorizontal: 15,
  },
  subtaskCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  subtaskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6,
  },
  subtaskTitle: { fontSize: 15, fontWeight: "600", color: "#111" },
  subtaskDesc: { fontSize: 13, color: "#444", marginBottom: 8 },
  subtaskFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  subtaskDate: { fontSize: 13, color: "#6B7280" },
  priorityContainer: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
  },
  completeButton: {
    position: "absolute",
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: "#0b84ff",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  completeButtonText: { color: "#fff", fontWeight: "600", fontSize: 15 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    width: width * 0.8,
  },
  modalText: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  modalButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  cancelButton: { backgroundColor: "#E5E7EB" },
  confirmButton: { backgroundColor: "#0b84ff" },
});

export default TaskDetails;
