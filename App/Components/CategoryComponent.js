import React, {useState} from 'react';
import {View, TouchableOpacity, StyleSheet, FlatList} from 'react-native';
import {moderateScale} from 'react-native-size-matters';
import CustomText from './CustomText';
import Colors from '../utils/Colors'; // Assuming you have defined Colors

const categories = [
  {id: 1, name: 'All collections'},
  {id: 2, name: 'Trousers'},
  {id: 3, name: 'Denims'},
  {id: 4, name: 'Shorts'},
  {id: 5, name: 'Jackets'},
  {id: 6, name: 'Shirts'}, // Additional category related to clothes
];

const CategoryComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryPress = item => {
    setSelectedCategory(item.id); // Set the clicked category as selected
  };

  const renderItem = ({item}) => {
    const isSelected = item.id === selectedCategory;
    return (
      <TouchableOpacity
        style={[
          styles.categoryButton,
          isSelected ? styles.selectedCategory : styles.unselectedCategory,
        ]}
        onPress={() => handleCategoryPress(item)}>
        <CustomText style={[styles.categoryText]}>{item.name}</CustomText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={categories}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        horizontal={true} // Not scrollable; will fit in the space provided
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  categoryButton: {
    marginRight: moderateScale(5),
    paddingVertical: moderateScale(8),
    paddingHorizontal: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: moderateScale(50),
    // width: '45%', // Adjusts width for proper alignment
  },
  selectedCategory: {
    backgroundColor: '#979797', // Selected category background color
  },
  unselectedCategory: {
    backgroundColor: Colors.textInputClr, // Default background color
  },
  categoryText: {
    fontSize: moderateScale(13),
    color: Colors.white, // Selected category text color
  },
  selectedCategoryText: {
    fontSize: moderateScale(13),
    color: 'white', // Selected category text color
  },
  unselectedCategoryText: {
    fontSize: moderateScale(13),
    color: Colors.black, // Default category text color
  },
});

export default CategoryComponent;
