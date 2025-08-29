import React from "react";
import { View, Text, StyleSheet, FlatList, Image } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import Colors from "../utils/Colors";
import CustomText from "./CustomText";
import BaseUrl from "../API/BaseUrl";

const ReviewList = ({ data }) => {
  // Format the date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Render each star for the rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={i <= rating ? "star" : "star-o"}
          size={18}
          color={Colors.primary} // Gold color for stars
        />
      );
    }
    return stars;
  };

  // Render each review item
  const renderItem = ({ item }) => (
    <View style={styles.reviewCard}>
      <View style={styles.header}>
        <CustomText style={styles.userName}>{item.userName}</CustomText>
        <CustomText style={styles.email}>{item.email}</CustomText>
      </View>
      <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
      <CustomText style={styles.message}>{item.message}</CustomText>
      <CustomText style={styles.date}>{formatDate(item.createdDT)}</CustomText>
      {item.images.length > 0 && (
        <View style={styles.imageContainer}>
          {item.images.map((img, index) => (
            <Image
              key={index}
              source={{ uri: `${BaseUrl.BaseUrlImage}${img}` }}
              style={styles.reviewImage}
            />
          ))}
        </View>
      )}
    </View>
  );

  return (
    <FlatList
      data={data}
      // horizontal={true}
      keyExtractor={(item, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.listContainer}
      //   pagingEnabled={true}
    />
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
  },
  reviewCard: {
    backgroundColor: Colors.textInputClr,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginRight: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  userName: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 15,
  },
  email: {
    fontSize: 14,
    // color: "#666",
  },
  ratingContainer: {
    flexDirection: "row",
    marginVertical: 5,
  },
  message: {
    fontSize: 14,
    // color: "#333",
    marginBottom: 5,
  },
  date: {
    fontSize: 12,
    color: "#999",
  },
  imageContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 10,
  },
  reviewImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
});

export default ReviewList;
