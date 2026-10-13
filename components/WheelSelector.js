import { useEffect, useState } from "react";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import WheelPicker from "@quidone/react-native-wheel-picker";

import Colors from "../constants/colors";

// WheelSelector pops up a modal with a scrolling number wheel in it.
// it is used for both the guests and the campsites so the max number
// and the label are passed in as props
function WheelSelector({ visible, label, maxNumber, selectedValue, onConfirm, onCancel }) {
  // keep track of what the wheel is on until the user hits done
  const [wheelValue, setWheelValue] = useState(selectedValue);

  // when the modal opens again start the wheel on the last saved number
  useEffect(() => {
    if (visible) {
      setWheelValue(selectedValue);
    }
  }, [visible, selectedValue]);

  // builds the list 1, 2, 3 ... maxNumber for the wheel
  const wheelData = [];
  for (let i = 1; i <= maxNumber; i++) {
    wheelData.push({ value: i, label: i.toString() });
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      supportedOrientations={["portrait", "landscape"]}
      onRequestClose={onCancel}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalCard}>
          <Text style={styles.modalTitle}>{label}</Text>

          <WheelPicker
            data={wheelData}
            value={wheelValue}
            onValueChanged={({ item }) => setWheelValue(item.value)}
            enableScrollByTapOnItem={true}
            visibleItemCount={5}
            width={160}
            itemTextStyle={styles.wheelItemText}
            overlayItemStyle={styles.wheelHighlight}
          />

          <View style={styles.buttonRow}>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
            <Pressable style={styles.doneButton} onPress={() => onConfirm(wheelValue)}>
              <Text style={styles.doneText}>Done</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default WheelSelector;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: Colors.modalBackdrop,
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: Colors.canvas,
    borderRadius: 16,
    paddingVertical: 18,
    paddingHorizontal: 24,
    alignItems: "center",
    width: 300,
    borderWidth: 3,
    borderColor: Colors.pineGreen,
  },
  modalTitle: {
    fontFamily: "mountain",
    fontSize: 26,
    color: Colors.pineGreen,
    marginBottom: 8,
  },
  wheelItemText: {
    fontFamily: "latoBold",
    fontSize: 24,
    color: Colors.bark,
  },
  wheelHighlight: {
    backgroundColor: Colors.sand,
    borderRadius: 8,
  },
  buttonRow: {
    flexDirection: "row",
    marginTop: 14,
  },
  cancelButton: {
    paddingVertical: 10,
    paddingHorizontal: 22,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.pineGreen,
    marginHorizontal: 6,
  },
  cancelText: {
    fontFamily: "latoBold",
    fontSize: 16,
    color: Colors.pineGreen,
  },
  doneButton: {
    paddingVertical: 10,
    paddingHorizontal: 28,
    borderRadius: 20,
    backgroundColor: Colors.pineGreen,
    marginHorizontal: 6,
  },
  doneText: {
    fontFamily: "latoBold",
    fontSize: 16,
    color: Colors.canvas,
  },
});
