import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import Colors from '../utils/Colors';
import CustomText from './CustomText';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import DropDownPicker from 'react-native-dropdown-picker';

const { width } = Dimensions.get('window');

const PreviousJobs = () => {
  // Filter toggle state
  const [showFilters, setShowFilters] = useState(false);

  // Filter states
  const [openDateRange, setOpenDateRange] = useState(false);
  const [dateRangeValue, setDateRangeValue] = useState('last7days');
  const [dateRangeItems, setDateRangeItems] = useState([
    { label: 'Last 7 days', value: 'last7days' },
    { label: 'Last 14 days', value: 'last14days' },
    { label: 'Last 30 days', value: 'last30days' },
    { label: 'Last 3 months', value: 'last3months' },
    { label: 'Last 6 months', value: 'last6months' },
    { label: 'Last year', value: 'lastyear' },
  ]);

  const [openLocation, setOpenLocation] = useState(false);
  const [locationValue, setLocationValue] = useState('manchester_a');
  const [locationItems, setLocationItems] = useState([
    { label: 'Manchester Site A', value: 'manchester_a' },
    { label: 'Manchester Site B', value: 'manchester_b' },
    { label: 'Birmingham Project', value: 'birmingham' },
    { label: 'Leeds Commercial', value: 'leeds' },
    { label: 'London Office', value: 'london' },
    { label: 'Liverpool Site', value: 'liverpool' },
  ]);

  // Dummy job data
  const jobsData = [
    {
      id: '1',
      title: 'Residential Foundation',
      location: 'Manchester Site A',
      completedDate: 'Dec 15, 2023',
      status: 'Completed',
      bgColor: '#4A90E2',
      icon: '🏗️',
    },
    {
      id: '2',
      title: 'Framing Work',
      location: 'Birmingham Project',
      completedDate: 'Dec 12, 2023',
      status: 'Completed',
      bgColor: '#50C878',
      icon: '🔨',
    },
    {
      id: '3',
      title: 'Brickwork & Masonry',
      location: 'Leeds Commercial',
      completedDate: 'Dec 10, 2023',
      status: 'Completed',
      bgColor: '#9B59B6',
      icon: '🧱',
    },
    {
      id: '4',
      title: 'Electrical Installation',
      location: 'Manchester Site A',
      completedDate: 'Dec 8, 2023',
      status: 'Completed',
      bgColor: '#F39C12',
      icon: '⚡',
    },
    {
      id: '5',
      title: 'Plumbing Work',
      location: 'Birmingham Project',
      completedDate: 'Dec 5, 2023',
      status: 'Completed',
      bgColor: '#1ABC9C',
      icon: '🔧',
    },
    {
      id: '6',
      title: 'Interior Finishing',
      location: 'Leeds Commercial',
      completedDate: 'Dec 3, 2023',
      status: 'Completed',
      bgColor: '#E74C3C',
      icon: '🎨',
    },
  ];

  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleClearFilters = () => {
    setDateRangeValue('last7days');
    setLocationValue('manchester_a');
  };

  const handleApplyFilters = () => {
    // Apply filter logic here
    console.log('Filters applied:', { dateRangeValue, locationValue });
    setShowFilters(false); // Hide filters after applying
  };

  const renderJobCard = ({ item, index }) => (
    <Animatable.View
      animation="slideInUp"
      duration={600}
      delay={index * 100}
    >
      <TouchableOpacity
        style={[styles.jobCard, { backgroundColor: item.bgColor }]}
        activeOpacity={0.8}
      >
        {/* Top Section with Icon */}
        <View style={styles.cardHeader}>
          <View style={styles.iconContainer}>
            <CustomText style={styles.iconText}>{item.icon}</CustomText>
          </View>
        </View>
        
        {/* Title */}
        <CustomText style={styles.jobTitle} numberOfLines={2}>
          {item.title}
        </CustomText>
        
        {/* Location */}
        <View style={styles.infoRow}>
          <Feather name="map-pin" size={12} color="rgba(255,255,255,0.8)" />
          <CustomText style={styles.infoText} numberOfLines={1}>
            {item.location}
          </CustomText>
        </View>
        
        {/* Completed Date */}
        <View style={styles.infoRow}>
          <Feather name="calendar" size={12} color="rgba(255,255,255,0.8)" />
          <CustomText style={styles.infoText} numberOfLines={1}>
            Completed: {item.completedDate}
          </CustomText>
        </View>
        
        {/* Status Badge */}
        <View style={styles.cardFooter}>
          <View style={styles.statusBadge}>
            <CustomText style={styles.statusText}>{item.status}</CustomText>
          </View>
        </View>
        
        {/* View Details Button */}
        <TouchableOpacity style={styles.viewDetailsButton}>
          <CustomText style={styles.viewDetailsText}>View Details</CustomText>
        </TouchableOpacity>
      </TouchableOpacity>
    </Animatable.View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <CustomText style={styles.headerTitle}>Previous Jobs</CustomText>
        <TouchableOpacity 
          style={styles.filtersButton}
          onPress={handleToggleFilters}
        >
          <CustomText style={styles.filtersText}>Filters</CustomText>
          <Feather 
            name={showFilters ? "chevron-up" : "chevron-down"} 
            size={16} 
            color="#6f60bf" 
            style={{ marginLeft: moderateScale(5) }}
          />
        </TouchableOpacity>
      </View>

      {/* Filters Section - Toggle */}
      {showFilters && (
        <Animatable.View 
          animation="slideInDown" 
          duration={300}
          style={styles.filtersContainer}
        >
          <View style={styles.filterRow}>
            <View style={styles.filterSection}>
              <CustomText style={styles.filterLabel}>Date Range</CustomText>
              <DropDownPicker
                open={openDateRange}
                value={dateRangeValue}
                items={dateRangeItems}
                setOpen={setOpenDateRange}
                setValue={setDateRangeValue}
                setItems={setDateRangeItems}
                style={styles.dropdown}
                dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 2000 }]}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.dropdownPlaceholder}
                zIndex={2000}
                zIndexInverse={1000}
              />
            </View>

            <View style={styles.filterSection}>
              <CustomText style={styles.filterLabel}>Location</CustomText>
              <DropDownPicker
                open={openLocation}
                value={locationValue}
                items={locationItems}
                setOpen={setOpenLocation}
                setValue={setLocationValue}
                setItems={setLocationItems}
                style={styles.dropdown}
                dropDownContainerStyle={[styles.dropdownContainer, { zIndex: 1000 }]}
                textStyle={styles.dropdownText}
                placeholderStyle={styles.dropdownPlaceholder}
                zIndex={1000}
                zIndexInverse={2000}
              />
            </View>
          </View>

          {/* Filter Buttons */}
          <View style={styles.filterButtonsContainer}>
            <TouchableOpacity
              onPress={handleClearFilters}
              style={styles.clearButton}
            >
              <CustomText style={styles.clearButtonText}>Clear</CustomText>
            </TouchableOpacity>
            
            <TouchableOpacity
              onPress={handleApplyFilters}
              style={styles.applyButton}
            >
              <CustomText style={styles.applyButtonText}>Apply</CustomText>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      )}

      {/* Horizontal Scrolling Jobs Cards */}
      <FlatList
        data={jobsData}
        renderItem={renderJobCard}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        ItemSeparatorComponent={() => <View style={styles.cardSeparator} />}
        decelerationRate="fast"
        snapToInterval={width * 0.45 + moderateScale(15)}
        snapToAlignment="start"
      />
    </View>
  );
};

export default PreviousJobs;

const styles = StyleSheet.create({
  container: {
    marginVertical: moderateScale(10),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: moderateScale(10),
    paddingHorizontal: moderateScale(5),
  },
  headerTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: Colors.black,
  },
  filtersButton: {
    flexDirection: 'row',
    alignItems: 'center',
    // paddingHorizontal: moderateScale(5),
    // paddingVertical: moderateScale(8),
  },
  filtersText: {
    fontSize: moderateScale(14),
    color: '#6f60bf',
    fontWeight: '600',
  },
  filtersContainer: {
    backgroundColor: Colors.white,
    borderRadius: moderateScale(15),
    padding: moderateScale(10),
    marginBottom: moderateScale(8),
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  filterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: moderateScale(20),
    gap: moderateScale(5),
  },
  filterSection: {
    flex: 1,
  },
  filterLabel: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: Colors.black,
    marginBottom: moderateScale(8),
  },
  dropdown: {
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(8),
    borderWidth: 1,
    height: moderateScale(45),
  },
  dropdownContainer: {
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(8),
    elevation: 5,
  },
  dropdownText: {
    fontSize: moderateScale(14),
    color: Colors.black,
  },
  dropdownPlaceholder: {
    fontSize: moderateScale(14),
    color: Colors.gray,
  },
  filterButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: moderateScale(10),
  },
  clearButton: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    borderColor: Colors.gray,
  },
  clearButtonText: {
    fontSize: moderateScale(14),
    color: Colors.gray,
    fontWeight: '500',
  },
  applyButton: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(10),
    borderRadius: moderateScale(8),
    backgroundColor: '#6f60bf',
  },
  applyButtonText: {
    fontSize: moderateScale(14),
    color: Colors.white,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: moderateScale(5),
  },
  jobCard: {
    width: width * 0.65,
    borderRadius: moderateScale(12),
    padding: moderateScale(10),
    height: moderateScale(230),
    justifyContent: 'space-between',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    // elevation: 6,
  },
  cardSeparator: {
    width: moderateScale(15),
  },
  cardHeader: {
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  iconContainer: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(8),
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: moderateScale(18),
  },
  jobTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: Colors.white,
    marginBottom: moderateScale(8),
    lineHeight: moderateScale(18),
    textAlign: 'left',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(6),
  },
  infoText: {
    fontSize: moderateScale(11),
    color: 'rgba(255,255,255,0.9)',
    marginLeft: moderateScale(4),
    flex: 1,
  },
  cardFooter: {
    marginBottom: moderateScale(12),
  },
  statusBadge: {
    backgroundColor: '#4CAF50',
    alignSelf: 'flex-start',
    paddingHorizontal: moderateScale(8),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(10),
  },
  statusText: {
    fontSize: moderateScale(10),
    color: Colors.white,
    fontWeight: '600',
  },
  viewDetailsButton: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: moderateScale(6),
    paddingVertical: moderateScale(8),
    alignItems: 'center',
  },
  viewDetailsText: {
    fontSize: moderateScale(14),
    color: Colors.white,
    fontWeight: '600',
  },
});