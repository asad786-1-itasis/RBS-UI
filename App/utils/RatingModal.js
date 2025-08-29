import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from "react-native";
import CustomText from "../Components/CustomText";
import Colors from "./Colors";
import { moderateScale } from "react-native-size-matters";
import CustomStyle from "./CustomStyle";
import Entypo from "react-native-vector-icons/Entypo";
import { useSelector } from "react-redux";
import Endpoints from "../API/Endpoints";
import { POSTAPICALLFORMDATA } from "../API/ApiCalling";
import { useCustomToast } from "./ToastNofticiation";
import Loader from "./Loader";
import { t, setAppLanguage } from "../Languages/translations";

const StarRating = ({ rating, setRating, maxStars = 5 }) => {
  const stars = Array.from({ length: maxStars }, (_, index) => (
    <TouchableOpacity key={index} onPress={() => setRating(index + 1)}>
      <Text style={styles.star}>
        {index < rating ? "★" : "☆"} {/* Filled or empty star */}
      </Text>
    </TouchableOpacity>
  ));

  return <View style={styles.container}>{stars}</View>;
};

const RatingModal = ({ visible, onClose, id }) => {
  let { showToast } = useCustomToast();

  const selectedLanguage = useSelector((state) => state.home.selectedLanguage);

  useEffect(() => {
    if (selectedLanguage == "AR") {
      setAppLanguage("ar");
    } else {
      setAppLanguage("en");
    }
  }, [selectedLanguage]);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const loginData = useSelector((state) => state.auth.loginData);

  const handleSubmit = () => {
    // Handle the submission logic here
    // console.log("Rating:", rating);
    // console.log("Comment:", comment);

    // Resetting fields after submission
    // setRating(0);
    // setComment("");
    handleSubmitReview();
  };

  const validateFields = () => {
    if (!rating) {
      showToast("Please enter rating");
      return false;
    }
    return true;
  };

  const handleSubmitReview = async () => {
    if (validateFields()) {
      try {
        setLoading(true);
        let formData = new FormData();
        formData.append("VariantId", id);
        formData.append("UserId", loginData?.id);
        formData.append("Rating", rating);
        formData.append("Message", comment);
        console.log("formData Login >>>>>>>>", formData);
        POSTAPICALLFORMDATA(Endpoints.EndpointsAddReview, formData, false).then(
          (result) => {
            console.log("Response handleSubmitReview >>>>>>>>>>>>", result);
            if (result?.success == true) {
              onClose(); // Close the modal after submission
              showToast("Review added");
              setLoading(false);
            } else {
              onClose(); // Close the modal after submission
              showToast(result?.message);
              setLoading(false);
            }
            setLoading(false);
          }
        );
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View
          style={[styles.modalContainer, { position: "relative" }]}
          onTouchEnd={(e) => e.stopPropagation()}
        >
          <CustomText style={styles.header}>{t("rateProduct")}</CustomText>
          <TouchableOpacity
            onPress={onClose}
            style={[
              CustomStyle.FullButton,
              {
                width: moderateScale(32),
                height: moderateScale(30),
                borderRadius: 100,
                position: "absolute",
                top: moderateScale(-50),
                right: 2,
              },
            ]}
          >
            <Entypo name={"cross"} size={25} color={"white"} />
          </TouchableOpacity>
          <StarRating rating={rating} setRating={setRating} />
          <TextInput
            style={[
              CustomStyle.input,
              {
                backgroundColor: Colors.black,
                height: moderateScale(100),
                color: Colors.white,
                padding: 10,
                width: "100%",
                textAlign: selectedLanguage == "AR" ? "right" : "left",
              },
            ]}
            placeholder={t("leaveComment")}
            placeholderTextColor={Colors.white}
            value={comment}
            onChangeText={setComment}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          <TouchableOpacity
            onPress={handleSubmit}
            style={[
              CustomStyle.FullButton,
              { width: "50%", paddingVertical: 10, marginTop: 20 },
            ]}
          >
            {loading ? (
              <Loader size={25} color={Colors.white} />
            ) : (
              <CustomText
                style={{ fontSize: moderateScale(16), fontWeight: "600" }}
              >
                {t("submit")}
              </CustomText>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  star: {
    fontSize: 30,
    color: Colors.primary, // Gold color for filled stars
    margin: 2,
    marginBottom: moderateScale(10),
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: Colors.textInputClr,
    borderRadius: 10,
    padding: 20,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default RatingModal;
