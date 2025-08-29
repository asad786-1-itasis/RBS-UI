import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import Colors from "../utils/Colors";
import { moderateScale } from "react-native-size-matters";
import CustomText from "./CustomText";
import { useSelector } from "react-redux";
import moment from "moment";
import { useNavigation } from "@react-navigation/native";
import { t, setAppLanguage } from "../Languages/translations";

const TimelineScreen = () => {
  let navigation = useNavigation();
  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  const deliveryStatus = useSelector((state) => state.home.deliveryStatus);

  const deliveryData = {
    deliveryStatus: "Delivery status",
    estimatedDelivery: "20 June 2022: 05:30 PM",
    orderNumber: "NYC1054C",
    timeline: [
      {
        id: "1",
        title: t("pending"),
        status: "Pending",
      },
      {
        id: "2",
        title: t("processing"),
        status: "Processing",
      },
      {
        id: "3",
        title: t("shipped"),
        status: "Shipped",
      },
      {
        id: "4",
        title: t("delivered"),
        status: "Delivered",
      },
      {
        id: "5",
        title: t("cancelled"),
        status: "Cancelled",
      },
    ],
  };

  const handleDateFormat = (valDate) => {
    console.log("valDate>>>>>>>>>>.", valDate);
    if (valDate != null) {
      const formattedDate = moment(valDate).format("DD MMM YYYY HH:mm:ss");
      return formattedDate;
    } else {
      return "N/A";
    }
  };

  const renderTimelineItem = ({ item, index }) => {
    // Get the current delivery status
    const currentStatus = deliveryStatus[0].status;

    // Determine if the current item is the current status
    const isCurrent = item.status === currentStatus;

    // Check if the current or above statuses should be styled red
    const isCancelled = currentStatus === "Cancelled";
    const shouldStyleRed = isCancelled || item.status === "Canceled";

    return (
      <View
        style={[
          styles.timelineItem,
          { flexDirection: selectedLanguage == "AR" ? "row-reverse" : "row" },
        ]}
      >
        <View style={styles.iconContainer}>
          {item.status === "Cancelled" ? (
            <Entypo
              name={"circle-with-cross"}
              size={24}
              color={"#bb321f"} // Red color for cancelled status
            />
          ) : (
            <Icon
              name={"check-circle"}
              size={24}
              color={shouldStyleRed ? "#bb321f" : Colors.primary} // Red for cancelled or statuses above it
            />
          )}
        </View>
        {!isCurrent && (
          <View
            style={[
              styles.line,
              shouldStyleRed
                ? styles.lineCancelled
                : isCurrent && styles.lineActive, // Line red for cancelled
              {
                height: moderateScale(25),
                position: "absolute",
                bottom: moderateScale(-20),
                left: 10,
                right: 10,
              },
            ]}
          />
        )}
        <View style={styles.detailsContainer}>
          <CustomText
            style={[
              styles.title,
              shouldStyleRed
                ? styles.cancelledTitle
                : isCurrent && styles.currentTitle, // Title red for cancelled
            ]}
          >
            {item.title}
          </CustomText>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.headerContainer]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[styles.headerContainer, { marginLeft: moderateScale(-10) }]}
          >
            <Entypo
              name={"chevron-left"}
              size={moderateScale(25)}
              color={Colors.white} // Star color
            />
          </TouchableOpacity>
          <View>
            <CustomText
              style={{
                fontSize: moderateScale(18),
                fontWeight: "500",
              }}
            >
              {/* {} */}
            </CustomText>
          </View>
        </View>
      </View>
      <CustomText style={styles.deliveryStatus}>
        {t("deliveryStatus")}
      </CustomText>
      <CustomText style={styles.estimatedDelivery}>
        {t("estimatedDelivery")}
        {"\n"}
        {handleDateFormat(deliveryStatus[0].deliveryDate)}
      </CustomText>
      <View style={styles.orderContainer}>
        <CustomText style={styles.trackOrder}>{t("trackOrder")}</CustomText>
        <CustomText style={styles.orderNumber}>
          {deliveryStatus[0].trackingNumber}
        </CustomText>
      </View>
      <View style={{ backgroundColor: "#333", borderRadius: 10 }}>
        {deliveryStatus[0].status == "Cancelled" ? (
          <View style={[styles.timelineItem, { marginBottom: 0 }]}>
            <View style={styles.iconContainer}>
              <Entypo
                name={"circle-with-cross"}
                size={24}
                color={"#bb321f"} // Red color for cancelled status
              />
            </View>

            <View style={styles.detailsContainer}>
              <CustomText
                style={
                  [
                    //   styles.title, // Title red for cancelled
                  ]
                }
              >
                {t("cancelled")}
              </CustomText>
            </View>
          </View>
        ) : (
          <FlatList
            data={deliveryData.timeline.filter(
              (item) =>
                deliveryData.timeline.findIndex(
                  (t) => t.status === deliveryStatus[0].status
                ) >=
                deliveryData.timeline.findIndex((t) => t.status === item.status)
            )}
            renderItem={renderTimelineItem}
            keyExtractor={(item) => item.id}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Black background
    padding: 20,
  },
  deliveryStatus: {
    fontSize: 22,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
  },
  estimatedDelivery: {
    fontSize: 16,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  orderContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#333",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  trackOrder: {
    fontSize: 16,
    color: "white",
  },
  orderNumber: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
  timelineContainer: {
    paddingVertical: 10,
  },
  timelineItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    justifyContent: "center",
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  line: {
    width: 2,
    height: 50,
    backgroundColor: "gray",
    marginHorizontal: 10,
  },
  lineActive: {
    backgroundColor: Colors.primary,
  },
  detailsContainer: {
    flex: 1,
  },
  title: {
    paddingTop: moderateScale(5),
    fontSize: moderateScale(13),
  },
  currentTitle: {
    color: Colors.primary,
    fontWeight: "bold",
    fontSize: moderateScale(14),
  },
  time: {
    fontSize: 12,
  },
});

export default TimelineScreen;
