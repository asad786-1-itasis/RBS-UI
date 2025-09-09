import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Modal,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
} from 'react-native';
import { moderateScale } from 'react-native-size-matters';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/MaterialIcons';
import CustomText from '../Components/CustomText';

const { height } = Dimensions.get('window');

const Invoices = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  // Dummy Data
  const invoiceData = [
    {
      id: 1,
      date: 'March 15, 2024',
      day: 'Friday',
      amount: 465.0,
      hours: 10,
      status: 'Active',
      invoiceNumber: 'INV-2024-075',
      checkIn: '07:00 AM',
      checkOut: '05:30 PM',
      regularHours: 8,
      regularRate: 40,
      regularAmount: 320.0,
      overtimeHours: 2,
      overtimeRate: 60,
      overtimeAmount: 120.0,
    },
    {
      id: 2,
      date: 'March 14, 2024',
      day: 'Thursday',
      amount: 380.0,
      hours: 8.5,
      status: 'Completed',
      invoiceNumber: 'INV-2024-074',
      checkIn: '07:00 AM',
      checkOut: '03:30 PM',
      regularHours: 8,
      regularRate: 40,
      regularAmount: 320.0,
      overtimeHours: 0.5,
      overtimeRate: 60,
      overtimeAmount: 30.0,
    },
    {
      id: 3,
      date: 'March 13, 2024',
      day: 'Wednesday',
      amount: 400.0,
      hours: 9,
      status: 'Completed',
      invoiceNumber: 'INV-2024-073',
      checkIn: '08:00 AM',
      checkOut: '05:00 PM',
      regularHours: 8,
      regularRate: 40,
      regularAmount: 320.0,
      overtimeHours: 1,
      overtimeRate: 60,
      overtimeAmount: 60.0,
    },
  ];

  const openModal = (invoice) => {
    setSelectedInvoice(invoice);
    setModalVisible(true);
  };
  

  const closeModal = () => {
    setModalVisible(false);
    setSelectedInvoice(null);
  };

  // ===== Card UI =====
  const renderInvoiceCard = (invoice) => {
    // har card ka color uski id ke hisaab se
    let borderColor = '#1976D2'; // default blue
    let buttonColor = '#1976D2';
    let badgeBg = '#E3F2FD';
    let finalAmountColor = '#1976D2';

    if (invoice.id === 1) {
      borderColor = '#2E7D32'; // green
      buttonColor = '#2E7D32';
      badgeBg = '#E8F5E8';
      finalAmountColor = '#2E7D32';
    } else if (invoice.id === 2) {
      borderColor = '#1976D2'; // blue
      buttonColor = '#1976D2';
      badgeBg = '#E3F2FD';
      finalAmountColor = '#1976D2';
    } else if (invoice.id === 3) {
      borderColor = 'rgb(43, 43, 43)';// black
      buttonColor = 'rgb(43, 43, 43)';
      badgeBg = '#E0E0E0';
      finalAmountColor = 'rgb(43, 43, 43)';
    }
 

    return (
        <Animatable.View
          key={invoice.id}
          animation="fadeInUp"
          duration={600}
          delay={invoice.id * 200} // har card thoda delay se animate hoga
        >
          <View
            style={[styles.invoiceCard, { borderLeftColor: borderColor }]}
          >
            <View style={styles.cardHeader}>
              <View style={styles.dateSection}>
                <CustomText style={styles.dateTitle}>
                  {invoice.id === 1 ? 'Today - ' : ''}
                  {invoice.date}
                </CustomText>
                <CustomText style={styles.dayText}>{invoice.day}</CustomText>
                <View style={[styles.statusBadge, { backgroundColor: badgeBg }]}>
                  <CustomText style={[styles.statusText, { color: borderColor }]}>
                    {invoice.status}
                  </CustomText>
                </View>
              </View>
              <View style={styles.amountSection}>
                <CustomText style={[styles.amount, { color: borderColor }]}>
                  ${invoice.amount.toFixed(2)}
                </CustomText>
                <CustomText style={styles.hoursText}>{invoice.hours} hours</CustomText>
              </View>
            </View>
      
            {/* Breakdown */}
            <View style={styles.breakdown}>
              <View style={styles.breakdownRow}>
                <CustomText style={styles.breakdownLabel}>
                  Regular Hours ({invoice.regularHours}h)
                </CustomText>
                <CustomText style={styles.breakdownAmount}>
                  ${invoice.regularAmount.toFixed(2)}
                </CustomText>
              </View>
              <View style={styles.breakdownRow}>
                <CustomText style={[styles.breakdownLabel, { color: '#FF9800' }]}>
                  Overtime ({invoice.overtimeHours}h)
                </CustomText>
                <CustomText style={[styles.breakdownAmount, { color: '#FF9800' }]}>
                  ${invoice.overtimeAmount.toFixed(2)}
                </CustomText>
              </View>
      
              <View style={styles.divider} />
      
              <View style={styles.breakdownRow}>
                <CustomText
                  style={[
                    styles.breakdownLabel,
                    { color: finalAmountColor, fontWeight: '600' },
                  ]}
                >
                  Final Amount (Client Pays)
                </CustomText>
                <CustomText
                  style={[
                    styles.breakdownAmount,
                    { color: finalAmountColor, fontWeight: '600' },
                  ]}
                >
                  ${invoice.amount.toFixed(2)}
                </CustomText>
              </View>
            </View>
      
            <TouchableOpacity
              style={[styles.viewDetailsButton, { backgroundColor: buttonColor }]}
              onPress={() => openModal({ ...invoice, borderColor, badgeBg })}
            >
              <CustomText style={styles.viewDetailsText}>View Details</CustomText>
            </TouchableOpacity>
          </View>
        </Animatable.View>
      );
      
  };

  return (
    <SafeAreaView style={styles.container}>
          {/* Header */}
          <View style={styles.header}>
          <CustomText style={styles.title}>Daily Invoices</CustomText>
          <CustomText style={styles.subtitle}>
            Track your daily earnings and hours
          </CustomText>
        </View>

        <View style={styles.summaryCard}>
          <CustomText style={styles.summaryTitle}>This Week Summary</CustomText>
          <View style={styles.summaryContent}>
            <View style={styles.summaryItem}>
              <CustomText style={styles.summaryLabel}>Total Hours</CustomText>
              <CustomText style={styles.summaryValue}>42.5h</CustomText>
            </View>
            <View style={styles.summaryItem}>
              <CustomText style={styles.summaryLabel}>Total Earnings</CustomText>
              <CustomText style={styles.summaryValue}>$1,785.00</CustomText>
            </View>
          </View>
        </View>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
      


        {/* Invoice Cards */}
        
        <View style={styles.invoicesContainer}>
          {invoiceData.map(renderInvoiceCard)}
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}>
        <View style={styles.modalOverlay}>
          <Animatable.View
            animation="slideInUp"
            duration={300}
            style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <CustomText style={styles.modalTitle}>{selectedInvoice?.date}</CustomText>
              <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
                <Icon name="close" size={moderateScale(24)} color="#666" />
              </TouchableOpacity>
            </View>

            <ScrollView
              style={styles.modalScrollView}
              showsVerticalScrollIndicator={false}>
              {selectedInvoice && (
                <>
                  {/* Invoice Info */}
                  <View style={styles.modalSection}>
                    {/* Top Row */}
                    <View style={styles.infoRow}>
                      <View>
                        <CustomText style={styles.infoLabel}>Invoice #</CustomText>
                        <CustomText style={styles.infoValue}>{selectedInvoice.invoiceNumber}</CustomText>
                      </View>

                      <View>
                        <CustomText style={styles.infoLabel}>Date</CustomText>
                        <CustomText style={styles.infoValue}>{selectedInvoice.date}</CustomText>
                      </View>
                    </View>

                    {/* Bottom Row */}
                    <View style={styles.infoRow}>
                      <View style={[styles.statusBox, { backgroundColor: selectedInvoice.badgeBg }]}>
                        <CustomText style={[styles.statusText, { color: selectedInvoice.borderColor }]}>
                          {selectedInvoice.status}
                        </CustomText>
                      </View>

                      <CustomText style={[styles.amount, { color: selectedInvoice.borderColor }]}>
                        ${selectedInvoice.amount.toFixed(2)}
                      </CustomText>
                    </View>
                  </View>

                  {/* Time Details */}
                  <View style={styles.timeDetailsCard}>
                    <CustomText style={styles.sectionTitle}>Time Details</CustomText>
                    <View style={styles.timeRow}>
                      <View>
                        <CustomText style={styles.timeLabel}>Check In</CustomText>
                        <CustomText style={styles.timeValue}>
                          {selectedInvoice.checkIn}
                        </CustomText>
                      </View>
                      <View>
                        <CustomText style={styles.timeLabel}>Check Out</CustomText>
                        <CustomText style={styles.timeValue}>
                          {selectedInvoice.checkOut}
                        </CustomText>
                      </View>
                    </View>
                  </View>

                  {/* Payment Breakdown */}
                  <View style={styles.paymentSection}>
                    <CustomText style={styles.sectionTitle}>Payment Breakdown</CustomText>

                    <View style={styles.paymentCard1}>
                      <View style={styles.paymentHeader}>
                        <CustomText style={styles.paymentType}>Regular Hours</CustomText>
                        <CustomText style={styles.paymentAmount}>
                          ${selectedInvoice.regularAmount.toFixed(2)}
                        </CustomText>
                      </View>
                      <CustomText style={styles.paymentDetails}>
                        {selectedInvoice.regularHours} hours × $
                        {selectedInvoice.regularRate}/hour
                      </CustomText>
                    </View>

                    {selectedInvoice.overtimeHours > 0 && (
                      <View style={styles.paymentCard}>
                        <View style={styles.paymentHeader}>
                          <CustomText style={[styles.paymentType, { color: '#FF9800' }]}>
                            Overtime Hours
                          </CustomText>
                          <CustomText style={[styles.paymentAmount, { color: '#FF9800' }]}>
                            ${selectedInvoice.overtimeAmount.toFixed(2)}
                          </CustomText>
                        </View>
                        <CustomText style={[styles.paymentDetails, { color: '#FF9800' }]}>
                          {selectedInvoice.overtimeHours} hours × $
                          {selectedInvoice.overtimeRate}/hour (1.5x rate)
                        </CustomText>
                      </View>
                    )}

                    <View style={styles.finalAmountCard}>
                      <View style={styles.finalAmountRow}>
                        <CustomText style={styles.finalAmountLabel}>
                          Final Amount (Client Pays)
                        </CustomText>
                        <CustomText style={styles.finalAmountValue}>
                          ${selectedInvoice.amount.toFixed(2)}
                        </CustomText>
                      </View>
                    </View>
                  </View>

                  {/* Notes Section */}
                  <View style={styles.notesContainer}>
                    <CustomText style={styles.notesTitle}>Notes</CustomText>
                    <CustomText style={styles.notesText}>
                      Foundation concrete pour project. Overtime approved for critical deadline.
                    </CustomText>
                  </View>

                  {/* Buttons Section */}
                  <View style={styles.buttonsContainer}>
                    <TouchableOpacity style={styles.button}>
                      <Icon
                        name="email"
                        size={moderateScale(20)}
                        color="#FFF"
                        style={styles.buttonIcon}
                      />
                      <CustomText style={styles.buttonText}>Email Invoice</CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.secondaryButton]}>
                      <Icon
                        name="download"
                        size={moderateScale(20)}
                        color="white"
                        style={styles.buttonIcon}
                      />
                      <CustomText style={[styles.buttonText, styles.secondaryButtonText]}>
                        Download PDF
                      </CustomText>
                    </TouchableOpacity>

                    <TouchableOpacity style={[styles.button, styles.tertiaryButton]}>
                      <Icon
                        name="access-time"
                        size={moderateScale(20)}
                        color="white"
                        style={styles.buttonIcon}
                      />
                      <CustomText style={[styles.buttonText, styles.tertiaryButtonText]}>
                        Request Time Adjustment
                      </CustomText>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </ScrollView>
          </Animatable.View>
        </View>
      </Modal>
    </SafeAreaView>
    
  );
};

// ===== Styles (responsive with moderateScale) =====
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5' },
  scrollView: { flex: 1 },
  header: {
    backgroundColor: '#fff',
    marginHorizontal: moderateScale(15),
    borderRadius: moderateScale(15),
    padding: moderateScale(20),
    marginVertical: moderateScale(20),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: moderateScale(2) },
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),

    // 🔽 Shadow for Android
    elevation: 4,


  },
  title: { fontSize: moderateScale(24), fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: moderateScale(14), color: '#666' },

  invoicesContainer: { paddingHorizontal: moderateScale(15), paddingBottom: moderateScale(60), paddingTop: moderateScale(10) },
  invoiceCard: {
    backgroundColor: '#FFF',
    borderRadius: moderateScale(10),
    padding: moderateScale(20),
    marginBottom: moderateScale(15),
    borderLeftWidth: moderateScale(5),
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(4),
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  dateSection: { flex: 1 },
  dateTitle: { fontSize: moderateScale(18), fontWeight: 'bold', color: '#333' },
  dayText: { fontSize: moderateScale(14), color: '#666', marginBottom: moderateScale(6) },
  statusBadge: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(12),
    alignSelf: 'flex-start',
  },
  statusText: { fontSize: moderateScale(12), fontWeight: '600' },
  amountSection: { alignItems: 'flex-end' },
  amount: { fontSize: moderateScale(20), fontWeight: 'bold' },
  hoursText: { fontSize: moderateScale(14), color: '#666' },

  breakdown: { marginTop: moderateScale(10), marginBottom: moderateScale(10) },
  breakdownRow: { flexDirection: 'row', justifyContent: 'space-between' },
  breakdownLabel: { fontSize: moderateScale(14), color: '#666' },
  breakdownAmount: { fontSize: moderateScale(14), fontWeight: '500' },

  viewDetailsButton: {
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    alignItems: 'center',
  },
  viewDetailsText: { color: '#FFF', fontSize: moderateScale(16), fontWeight: '600' },

  // Modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFF',
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    maxHeight: height * 0.70,
    paddingBottom: moderateScale(30),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: moderateScale(20),
  },
  modalTitle: { fontSize: moderateScale(20), fontWeight: 'bold', color: '#333' },
  closeButton: { padding: moderateScale(5) },
  modalScrollView: { paddingHorizontal: moderateScale(20) },

  // modalSection: { marginBottom: moderateScale(20) },
  // infoRow: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   marginBottom: moderateScale(8),
  // },
  // infoLabel: { fontSize: moderateScale(14), color: '#999' },
  // infoValue: { fontSize: moderateScale(14), fontWeight: '600', color: '#333' },
  modalSection: {
    marginBottom: moderateScale(20),
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: moderateScale(15),
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 2,

  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: moderateScale(12),
  },
  infoLabel: {
    fontSize: moderateScale(13),
    color: "#999",
    marginBottom: 3,
  },
  infoValue: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "#000",
  },
  statusBox: {
    paddingHorizontal: moderateScale(10),
    paddingVertical: moderateScale(5),
    borderRadius: 12,
  },
  statusText: {
    fontWeight: "600",
    fontSize: moderateScale(13),
  },
  amount: {
    fontSize: moderateScale(18),
    fontWeight: "700",
  },


  timeDetailsCard: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(12),
    padding: moderateScale(20),
    marginBottom: moderateScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: moderateScale(10),
  },
  timeRow: { flexDirection: 'row', justifyContent: 'space-between' },
  timeLabel: { fontSize: moderateScale(14), color: '#999' },
  timeValue: { fontSize: moderateScale(16), fontWeight: '600', color: '#333' },

  paymentSection: { marginBottom: moderateScale(20) },
  paymentCard: {
    backgroundColor: 'rgba(241, 221, 160, 0.5)',
    padding: moderateScale(15),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(10),
  },
  paymentCard1: {
    backgroundColor: '#E3F2FD',
    padding: moderateScale(15),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(10),
  },

  paymentHeader: { flexDirection: 'row', justifyContent: 'space-between' },
  paymentType: { fontSize: moderateScale(18), fontWeight: '800', color: 'blue' },
  paymentAmount: { fontSize: moderateScale(18), fontWeight: '800', color: 'blue' },
  paymentDetails: { fontSize: moderateScale(16), color: 'blue', marginTop: moderateScale(10) },

  finalAmountCard: {
    backgroundColor: '#1E63EE',
    padding: moderateScale(15),
    borderRadius: moderateScale(12),
    marginTop: moderateScale(10),
  },
  finalAmountRow: { flexDirection: 'row', justifyContent: 'space-between',alignItems:'center'},
  finalAmountLabel: { fontSize: moderateScale(16), color: '#FFF', fontWeight: 'bold' ,paddingVertical:moderateScale(18) },
  finalAmountValue: { fontSize: moderateScale(20), color: '#FFF', fontWeight: 'bold' },
  notesContainer: {
    backgroundColor: 'rgba(241, 221, 160, 0.5)',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: moderateScale(12),
    padding: moderateScale(15),
    marginBottom: moderateScale(20),
  },
  notesTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    color: '#333',
    marginBottom: moderateScale(10),
  },
  notesText: {
    fontSize: moderateScale(14),
    color: '#666',
    lineHeight: moderateScale(20),
  },
  buttonsContainer: {
    marginBottom: moderateScale(30),
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1E63EE',
    padding: moderateScale(15),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(10),
  },
  secondaryButton: {
    backgroundColor: 'rgb(43, 43, 43)',
    borderWidth: 1,
    borderColor: '#1E63EE',
  },
  tertiaryButton: {
    backgroundColor: 'orange',
    borderWidth: 1,
    borderColor: 'orange',
  },
  buttonIcon: {
    marginRight: moderateScale(10),
  },
  buttonText: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#fff',
  },
  tertiaryButtonText: {
    color: 'white',
  },
  summaryCard: {
    backgroundColor: '#1E63EE',
    marginHorizontal: moderateScale(15),
    borderRadius: moderateScale(15),
    padding: moderateScale(20),
    marginBottom: moderateScale(10),
  },
  summaryTitle: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: moderateScale(15),
  },
  summaryContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  summaryItem: {
    flex: 1,
  },
  summaryLabel: {
    fontSize: moderateScale(14),
    color: '#E3F2FD',
    marginBottom: moderateScale(5),
  },
  summaryValue: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  divider: {
    height: moderateScale(1), // thin line, scaled
    backgroundColor: "#D1D5DB", // light gray
    marginVertical: moderateScale(8),
  },
});

export default Invoices;
