import { StyleSheet, Text, View, useWindowDimensions } from "react-native";

import Colors from "../constants/colors";

// Title shows the campground name at the top of the home screen.
// the subtitle is optional so this can be reused on other screens later
function Title({ children, subtitle }) {
  const { width, height } = useWindowDimensions();

  // the shortest side tells us if we are on a tablet no matter how it is rotated
  const isTablet = Math.min(width, height) >= 600;

  return (
    <View style={styles.titleContainer}>
      <Text style={[styles.titleText, isTablet && styles.titleTextTablet]}>
        {children}
      </Text>
      {subtitle && (
        <Text style={[styles.subtitleText, isTablet && styles.subtitleTextTablet]}>
          {subtitle}
        </Text>
      )}
    </View>
  );
}

export default Title;

const styles = StyleSheet.create({
  titleContainer: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 3,
    borderBottomColor: Colors.campfireOrange,
    marginBottom: 18,
  },
  titleText: {
    fontFamily: "mountain",
    fontSize: 36,
    color: Colors.canvas,
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.6)",
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 4,
  },
  titleTextTablet: {
    fontSize: 56,
  },
  subtitleText: {
    fontFamily: "latoBold",
    fontSize: 15,
    color: Colors.sand,
    letterSpacing: 2,
    marginTop: 4,
  },
  subtitleTextTablet: {
    fontSize: 20,
  },
});
