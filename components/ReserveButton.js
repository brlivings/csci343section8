import { Pressable, StyleSheet, Text, View, useWindowDimensions } from "react-native";

import Colors from "../constants/colors";

// ReserveButton is the big orange button at the bottom of the form.
// onPress gets passed in from the screen so the button doesn't need to
// know anything about the reservation itself
function ReserveButton({ children, onPress }) {
  const { width, height } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 600;

  return (
    <View style={styles.buttonOuter}>
      <Pressable
        onPress={onPress}
        // android gets a ripple, ios just fades a little when pressed
        android_ripple={{ color: Colors.emberOrange }}
        style={({ pressed }) =>
          pressed ? [styles.buttonInner, styles.pressed] : styles.buttonInner
        }
      >
        <Text style={[styles.buttonText, isTablet && styles.buttonTextTablet]}>
          {children}
        </Text>
      </Pressable>
    </View>
  );
}

export default ReserveButton;

const styles = StyleSheet.create({
  buttonOuter: {
    borderRadius: 28,
    overflow: "hidden",
    marginTop: 22,
    alignSelf: "center",
    width: "80%",
    maxWidth: 420,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonInner: {
    backgroundColor: Colors.campfireOrange,
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  pressed: {
    opacity: 0.8,
  },
  buttonText: {
    fontFamily: "latoBold",
    fontSize: 20,
    color: Colors.white,
    textAlign: "center",
    letterSpacing: 1,
  },
  buttonTextTablet: {
    fontSize: 26,
  },
});
