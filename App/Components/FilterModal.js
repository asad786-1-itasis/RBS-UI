import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
} from "react-native";
import { moderateScale } from "react-native-size-matters";
import CustomText from "./CustomText";
import { useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { setSubcategoryId } from "../Redux/HomeReducer/homeSlice";

const FilterModal = ({ visible, onClose, filters }) => {
  let navigation = useNavigation();
  let dispatch = useDispatch();

  const handleNavigationProductDetail = (val) => {
    console.log("\n\n\n\n\n\nPrduct Item>>>>>>>>", val);
    dispatch(setSubcategoryId(val));
    onClose();
    navigation.navigate("SeeAllProducts");
  };
  return (
    <SafeAreaView>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={onClose}
      >
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <CustomText
              style={{ fontSize: moderateScale(20), fontWeight: "600" }}
            >
              Select Filters
            </CustomText>
            <FlatList
              data={filters}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.filterItem}
                  onPress={() => handleNavigationProductDetail(item.id)}
                >
                  <CustomText
                    style={{ fontSize: moderateScale(15), fontWeight: "500" }}
                  >
                    {item.name}
                  </CustomText>
                  <CustomText
                    style={{
                      fontSize: moderateScale(15),
                      fontWeight: "500",
                      marginLeft: 2,
                    }}
                  >
                    {`(${item.itemCounts})`}
                  </CustomText>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent background
  },
  modalContainer: {
    flex: 0.9,
    width: "100%",
    backgroundColor: "#9E7E4C",
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    elevation: 5,
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "bold",
    color: "#fff",
    marginBottom: moderateScale(10),
  },
  filterItem: {
    padding: moderateScale(15),
    // borderBottomWidth: 1,
    // borderBottomColor: '#fff',
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  filterText: {
    color: "#fff",
    fontSize: moderateScale(16),
  },
  closeButton: {
    marginTop: moderateScale(20),
    padding: moderateScale(10),
    backgroundColor: "#fff",
    borderRadius: moderateScale(5),
    alignItems: "center",
  },
  closeButtonText: {
    color: "#9E7E4C",
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
});

export default FilterModal;
