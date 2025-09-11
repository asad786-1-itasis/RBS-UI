import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import CustomText from "../Components/CustomText";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";

const { width } = Dimensions.get("window");

const initialTasks = [
  {
    id: "1",
    title: "Quality Check",
    description: "Inspect concrete surface for defects and measure thickness",
    status: "Completed",
    statusColor: "#C6F6D5",
    statusTextColor: "#276749",
    priority: "High",
    date: "March 16, 2024",

  },
  {
    id: "2",
    title: "Final Curing Setup",
    description: "Apply curing compounds and set up protective coverings",
    status: "Pending",
    statusColor: "#FED7D7",
    statusTextColor: "#9B2C2C",
    priority: "Medium",
    date: "March 16, 2024",
  },
  {
    id: "3",
    title: "Area Cleanup",
    description: "Clean tools, remove excess materials and secure work area",
    status: "Pending",
    statusColor: "#FED7D7",
    statusTextColor: "#9B2C2C",
    priority: "Low",
    date: "March 16, 2024",
  },
];

const TaskDetails = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { task } = route.params; // 👈 parent screen se project data aayega

  const [tasks, setTasks] = useState(initialTasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  const handleMarkComplete = (task) => {
    setSelectedTask(task);
    setModalVisible(true);
  };

  const confirmComplete = () => {
    if (selectedTask) {
      setTasks((prev) =>
        prev.map((t) =>
          t.id === selectedTask.id
            ? {
              ...t,
              status: "Completed",
              statusColor: "#C6F6D5",
              statusTextColor: "#276749",
            }
            : t
        )
      );
    }
    setModalVisible(false);
    setSelectedTask(null);
  };

  const renderTask = ({ item }) => (
    <View style={styles.subtaskCard}>
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

      <CustomText style={styles.subtaskDesc}>{item.description}</CustomText>

      <View style={styles.subtaskFooter}>
        <CustomText style={{ fontSize: 18, marginRight: 6 }}>
          {item.status === "Completed" ? "✔️" : "⏳"}
        </CustomText>
        <CustomText style={styles.subtaskDate}>{item.date}</CustomText>
        <View style={{ flex: 1 }} />
        <CustomText style={{ color: item.statusTextColor, fontWeight: "600" }}>
          {item.status}
        </CustomText>
      </View>

      {/* ✅ Mark Complete sirf tab dikhega jab progress < 100 ho aur status Pending ho */}
      {task.percentage < 100 && item.status === "Pending" && (
        <TouchableOpacity
          style={styles.completeButton}
          onPress={() => handleMarkComplete(item)}
        >
          <CustomText style={styles.completeButtonText}>
            ✓ Mark Complete
          </CustomText>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>

        <View style={styles.backRow}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="#111" />
          </TouchableOpacity>
          {/* <CustomText style={styles.projectTitle}>{task.title}</CustomText> */}
          {/* <View style={{ width: 24 }} /> */}
        </View>
        {/* 🔹 Project Header */}
        <View style={styles.headerCard}>


          <CustomText style={styles.dueDate}>
            📋 Assigned by: {task.assignedBy}
          </CustomText>

          {/* 🔹 New Row: Due Date + Status */}
          <View style={styles.dueRow}>
            <CustomText style={styles.dueText}>📅 March 16, 2024</CustomText>
            <View
              style={[
                styles.statusText,
                {
                  backgroundColor: task.statusColor || "#FED7D7",
                  color: task.statusTextColor || "#9B2C2C",
                },
              ]}
            >
              <CustomText
                style={{
                  fontSize: moderateScale(12),
                  color: task.statusTextColor || "#9B2C2C",
                  fontWeight: "600",
                }}
              >
                {task.status}
              </CustomText>
            </View>
          </View>

          {/* 🔹 Progress Info Row */}
          <View style={styles.progressTextRow}>
            <CustomText style={styles.tasksCompletedText}>
              {task.completedTasks}/{task.totalTasks} tasks completed
            </CustomText>
            <CustomText style={styles.percentageText}>
              {task.percentage}%
            </CustomText>
          </View>

          {/* 🔹 Progress Bar */}
          <View style={styles.progressBarBackground}>
            <View
              style={[
                styles.progressBarFill,
                { width: `${task.percentage}%`, backgroundColor: task.progressColor },
              ]}
            />
          </View>
        </View>

        <CustomText style={styles.subtaskHeading}>Subtasks</CustomText>

        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          renderItem={renderTask}
          scrollEnabled={false}
          contentContainerStyle={{
            paddingHorizontal: moderateScale(15),
          }}
        />
        <TouchableOpacity
          style={styles.chatButton}
          onPress={() => alert("Chat with Admin clicked")}
        >
          <CustomText style={styles.chatButtonText}>💬 Chat with Admin</CustomText>
        </TouchableOpacity>
      </ScrollView>

      {/* 🔹 Bottom Chat Button */}


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

export default TaskDetails;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  backRow:{padding: moderateScale(16),},
  // Header
  headerCard: {
    backgroundColor: "#fff",
    padding: moderateScale(16),
    borderRadius: moderateScale(12), // Make it card-like
    marginHorizontal: moderateScale(16),
    marginTop: moderateScale(16),
    marginBottom: moderateScale(10),


    // shadowRadius: 4,
    // elevation: 2,
  },

  projectTitle: {
    fontSize: moderateScale(20), // Bigger font
    fontWeight: "bold",
    color: "#111",
  },

  dueDate: {
    fontSize: moderateScale(14),
    color: "#374151",
    marginVertical: 4,
  },

  dueRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(6),
  },

  dueText: {
    fontSize: moderateScale(14),
    color: "#444",
  },

  statusText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
    backgroundColor: "#FED7D7", // Light red for 'High'
    color: "#9B2C2C",           // Dark red text
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: moderateScale(8),
    overflow: "hidden",
  },

  progressTextRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: moderateScale(10),
    marginBottom: moderateScale(8),
  },

  tasksCompletedText: {
    fontSize: moderateScale(14),
    color: "#444",
  },

  percentageText: {
    fontSize: moderateScale(18),
    fontWeight: "bold",
    color: "#0b84ff",
  },

  progressBarBackground: {
    height: moderateScale(12), // Increased height
    backgroundColor: "#E5E7EB",
    borderRadius: 6,
    overflow: "hidden",
  },

  progressBarFill: {
    height: "100%",
    borderRadius: 6,
  },

  // Subtask
  subtaskHeading: {
    fontSize: moderateScale(16),
    fontWeight: "bold",
    marginVertical: moderateScale(12),
    marginHorizontal: moderateScale(15),
  },
  subtaskCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: moderateScale(12),
    marginBottom: moderateScale(12),
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  subtaskHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(6),
  },
  subtaskTitle: { fontSize: moderateScale(15), fontWeight: "600", color: "#111" },
  subtaskDesc: { fontSize: moderateScale(13), color: "#444", marginBottom: 8 },
  subtaskFooter: { flexDirection: "row", alignItems: "center" },
  subtaskDate: { fontSize: moderateScale(13), color: "#6B7280" },
  priorityContainer: {
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(3),
    borderRadius: 8,
  },

  // Mark Complete Button
  completeButton: {
    marginTop: moderateScale(10),
    backgroundColor: "#0b84ff",
    paddingVertical: moderateScale(10),
    borderRadius: 8,
    alignItems: "center",
  },
  completeButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: moderateScale(14),
  },

  // Chat button bottom
  chatButton: {
    // position: "absolute",
    // bottom: 0,
    // left: 0,
    // right: 0,
    borderRadius: 13,
    backgroundColor: "orange",
    paddingVertical: moderateScale(14),
    alignItems: "center",
    marginHorizontal: moderateScale(16),

  },
  chatButtonText: {

    color: "#fff",
    fontWeight: "600",
    fontSize: moderateScale(15),
  },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    padding: moderateScale(20),
    borderRadius: 10,
    width: width * 0.8,
  },
  modalText: {
    fontSize: moderateScale(16),
    textAlign: "center",
    marginBottom: moderateScale(15),
  },
  modalButtons: { flexDirection: "row", justifyContent: "space-around" },
  modalButton: {
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(20),
    borderRadius: 8,
  },
  cancelButton: { backgroundColor: "#E5E7EB" },
  confirmButton: { backgroundColor: "#0b84ff" },
});
