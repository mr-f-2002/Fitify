import React, { useContext, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { GlobalContext } from '../GlobalState';

const FoodItem = ({ item }) => {
  const { globalState, setGlobalState } = useContext(GlobalContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [caloriesToAdd, setCaloriesToAdd] = useState(0);

  const openConfirmationModal = (val) => {
    setCaloriesToAdd(val);
    setModalVisible(true);
  };

  const confirmAddition = () => {
    setGlobalState((prevState) => ({
      ...prevState,
      calorieIn: prevState.calorieIn + parseFloat(caloriesToAdd),
    }));
    setModalVisible(false);
  };

  return (
    <View style={styles.item}>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} style={styles.name}>{item.Label}</Text>
        <Text numberOfLines={1} style={styles.cal}>{item.ENERC_KCAL.toFixed(2)} cal</Text>
        <Text numberOfLines={1} style={styles.cal}>{item.Brand}</Text>
        <Text numberOfLines={1} style={styles.cal}>Fat: {item.FAT}</Text>
      </View>
      <Ionicons
        name="add-circle"
        size={34}
        color="#543310"
        onPress={() => openConfirmationModal(item.ENERC_KCAL.toFixed(2))}
      />
      
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Confirm Intake</Text>
            <Text style={styles.modalText}>Add {caloriesToAdd} calories?</Text>
            <View style={styles.modalButtons}>
              {/* <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity> */}
              <TouchableOpacity
                style={[styles.modalButton, styles.confirmButton]}
                onPress={confirmAddition}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    width: '98%',
    backgroundColor: '#F8F4E1',
    borderRadius: 4,
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingVertical: 5,
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 5,
    marginHorizontal: '1%',
    marginVertical: 2
  },
  name: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 18,
  },
  cal: {
    fontWeight: '500',
    fontSize: 14,
    color: '#9ea1a3',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fffcf0',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalHeader:{
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  modalText: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: 'lightcoral',
    marginRight: 10,
  },
  confirmButton: {
    backgroundColor: '#B5C18E',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
  },
});

export default FoodItem;
