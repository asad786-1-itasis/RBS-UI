import React from "react";
import {
    View,
    FlatList,
    StyleSheet,
    Dimensions,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import CustomText from "../Components/CustomText";

const { width } = Dimensions.get("window");

const activities = [
    {
        id: "1",
        title: "Steel Frame Completed",
        time: "2 minutes ago",
        bgColor: "#ECFDF5", // light green
        dotColor: "#10B981", // green
        textColor: "#065F46",
    },
    {
        id: "2",
        title: "Concrete Pour Started",
        time: "1 hour ago",
        bgColor: "#EFF6FF", // light blue
        dotColor: "#3B82F6", // blue
        textColor: "#1E40AF",
    },
    // {
    //     id: "3",
    //     title: "Inspection Scheduled",
    //     time: "Yesterday",
    //     bgColor: "#FEF3C7", // light yellow
    //     dotColor: "#F59E0B", // yellow
    //     textColor: "#92400E",
    // },
];

const RecentActivityScreen = () => {
    const renderItem = ({ item }) => (
        <View style={{}}>
            <View style={[styles.card, { backgroundColor: item.bgColor }]}>
                {/* Dot */}
                <View style={[styles.dot, { backgroundColor: item.dotColor }]} />

                {/* Text Section */}
                <View>
                    <CustomText style={[styles.title, { color: item.textColor }]}>
                        {item.title}
                    </CustomText>
                    <CustomText style={[styles.time, { color: item.dotColor }]}>
                        {item.time}
                    </CustomText>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Screen Title */}
            <View style={styles.ucard}>

            <CustomText style={styles.screenTitle}>Recent Activity</CustomText>

            {/* Activity List */}
            <FlatList
                data={activities}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={{ paddingBottom: moderateScale(10) }}
            />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F9FAFB",
        margin: moderateScale(15),

    },
    ucard: {
        backgroundColor: "white",
        padding: moderateScale(15),
        borderRadius: moderateScale(12), // corner round
   
      
        // iOS shadow
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      
        // Android shadow
        elevation: 1,
      },
    screenTitle: {
        fontSize: moderateScale(20),
        fontWeight: "bold",
        marginBottom: moderateScale(15),
        color: "#111827",
    },
    card: {
        flexDirection: "row",
        alignItems: "center",
        padding: moderateScale(12),
        borderRadius: moderateScale(10),
        marginBottom: moderateScale(10),
    },
    dot: {
        width: moderateScale(12),
        height: moderateScale(12),
        borderRadius: moderateScale(6),
        marginRight: moderateScale(12),
    },
    title: {
        fontSize: moderateScale(15),
        fontWeight: "600",
    },
    time: {
        fontSize: moderateScale(13),
        marginTop: moderateScale(2),
    },
});

export default RecentActivityScreen;
