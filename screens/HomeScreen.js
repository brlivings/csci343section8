import { useState } from "react";
import {
  Alert,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import Title from "../components/Title";
import ReserveButton from "../components/ReserveButton";
import WheelSelector from "../components/WheelSelector";
import Colors from "../constants/colors";

// the max numbers the wheels are allowed to go up to
const maxGuests = 15;
const maxCampsites = 5;

// turns a Date into something readable like "Fri, Oct 16, 2026 at 2:00 PM"
// I wrote this by hand so it looks the same on every device
function formatDateTime(date) {
  if (!date) {
    return "Tap to choose";
  }

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  let hours = date.getHours();
  const amPm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  if (hours === 0) {
    hours = 12;
  }
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return (
    dayNames[date.getDay()] + ", " +
    monthNames[date.getMonth()] + " " + date.getDate() + ", " +
    date.getFullYear() + " at " + hours + ":" + minutes + " " + amPm
  );
}

function HomeScreen() {
  // screen size is used to switch the layout for tablets and landscape
  const { width, height } = useWindowDimensions();
  const isTablet = Math.min(width, height) >= 600;
  const isLandscape = width > height;

  // the user's choices on the form
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const [numberOfCampsites, setNumberOfCampsites] = useState(1);

  // which popup is open right now (only one can be open at a time)
  const [checkInPickerVisible, setCheckInPickerVisible] = useState(false);
  const [checkOutPickerVisible, setCheckOutPickerVisible] = useState(false);
  const [guestWheelVisible, setGuestWheelVisible] = useState(false);
  const [campsiteWheelVisible, setCampsiteWheelVisible] = useState(false);

  // this stays null until reserve now is pressed, then it holds a copy
  // of the selections so they show up under the button
  const [reservation, setReservation] = useState(null);

  // ---- check in picker ----
  function checkInConfirmHandler(pickedDate) {
    setCheckInDate(pickedDate);
    setCheckInPickerVisible(false);
  }

  // ---- check out picker ----
  function checkOutConfirmHandler(pickedDate) {
    setCheckOutDate(pickedDate);
    setCheckOutPickerVisible(false);
  }

  // ---- guest wheel ----
  function guestConfirmHandler(pickedNumber) {
    setNumberOfGuests(pickedNumber);
    setGuestWheelVisible(false);
  }

  // ---- campsite wheel ----
  function campsiteConfirmHandler(pickedNumber) {
    setNumberOfCampsites(pickedNumber);
    setCampsiteWheelVisible(false);
  }

  // runs when reserve now is pressed. checks that the dates make sense
  // and then saves everything so it gets displayed
  function reserveHandler() {
    if (!checkInDate || !checkOutDate) {
      Alert.alert("Missing Dates", "Please pick a check in and a check out date.");
      return;
    }

    if (checkOutDate <= checkInDate) {
      Alert.alert("Check Your Dates", "Check out has to be after check in.");
      return;
    }

    setReservation({
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: numberOfGuests,
      campsites: numberOfCampsites,
    });
  }

  // the minimum check out date is the check in date if there is one
  const checkOutMinimum = checkInDate ? checkInDate : new Date();

  return (
    <ImageBackground
      source={require("../assets/images/camping.jpg")}
      resizeMode="cover"
      style={styles.background}
      imageStyle={styles.backgroundImage}
    >
      {/* color overlay on top of the picture so everything is readable */}
      <View style={styles.overlay}>
        <SafeAreaView style={styles.safeArea}>
          <ScrollView
            contentContainerStyle={[
              styles.scrollContent,
              isTablet && styles.scrollContentTablet,
            ]}
          >
            <Title subtitle="CONWAY, SOUTH CAROLINA">Waccamaw River Campground</Title>

            <View style={[styles.formCard, isTablet && styles.formCardTablet]}>
              {/* in landscape the four options go into two columns */}
              <View style={isLandscape ? styles.rowLayout : null}>
                <View style={isLandscape ? styles.column : null}>
                  <Text style={[styles.label, isTablet && styles.labelTablet]}>Check In</Text>
                  <Pressable
                    style={styles.selectorBox}
                    onPress={() => setCheckInPickerVisible(true)}
                  >
                    <Text style={[styles.selectorText, isTablet && styles.selectorTextTablet]}>
                      {formatDateTime(checkInDate)}
                    </Text>
                  </Pressable>

                  <Text style={[styles.label, isTablet && styles.labelTablet]}>Check Out</Text>
                  <Pressable
                    style={styles.selectorBox}
                    onPress={() => setCheckOutPickerVisible(true)}
                  >
                    <Text style={[styles.selectorText, isTablet && styles.selectorTextTablet]}>
                      {formatDateTime(checkOutDate)}
                    </Text>
                  </Pressable>
                </View>

                <View style={isLandscape ? styles.column : null}>
                  <Text style={[styles.label, isTablet && styles.labelTablet]}>
                    Number of Guests
                  </Text>
                  <Pressable
                    style={styles.selectorBox}
                    onPress={() => setGuestWheelVisible(true)}
                  >
                    <Text style={[styles.selectorText, isTablet && styles.selectorTextTablet]}>
                      {numberOfGuests} {numberOfGuests === 1 ? "Guest" : "Guests"}
                    </Text>
                  </Pressable>

                  <Text style={[styles.label, isTablet && styles.labelTablet]}>
                    Number of Campsites
                  </Text>
                  <Pressable
                    style={styles.selectorBox}
                    onPress={() => setCampsiteWheelVisible(true)}
                  >
                    <Text style={[styles.selectorText, isTablet && styles.selectorTextTablet]}>
                      {numberOfCampsites} {numberOfCampsites === 1 ? "Campsite" : "Campsites"}
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>

            <ReserveButton onPress={reserveHandler}>RESERVE NOW</ReserveButton>

            {/* only shows up after the button has been pressed */}
            {reservation && (
              <View style={[styles.resultsCard, isTablet && styles.formCardTablet]}>
                <Text style={[styles.resultsTitle, isTablet && styles.resultsTitleTablet]}>
                  Your Reservation
                </Text>
                <Text style={[styles.resultsText, isTablet && styles.resultsTextTablet]}>
                  Check In: {formatDateTime(reservation.checkIn)}
                </Text>
                <Text style={[styles.resultsText, isTablet && styles.resultsTextTablet]}>
                  Check Out: {formatDateTime(reservation.checkOut)}
                </Text>
                <Text style={[styles.resultsText, isTablet && styles.resultsTextTablet]}>
                  Guests: {reservation.guests}
                </Text>
                <Text style={[styles.resultsText, isTablet && styles.resultsTextTablet]}>
                  Campsites: {reservation.campsites}
                </Text>
              </View>
            )}
          </ScrollView>
        </SafeAreaView>
      </View>

      {/* the popups. these stay open until the user confirms or cancels */}
      <DateTimePickerModal
        isVisible={checkInPickerVisible}
        mode="datetime"
        date={checkInDate ? checkInDate : new Date()}
        minimumDate={new Date()}
        onConfirm={checkInConfirmHandler}
        onCancel={() => setCheckInPickerVisible(false)}
      />
      <DateTimePickerModal
        isVisible={checkOutPickerVisible}
        mode="datetime"
        date={checkOutDate ? checkOutDate : checkOutMinimum}
        minimumDate={checkOutMinimum}
        onConfirm={checkOutConfirmHandler}
        onCancel={() => setCheckOutPickerVisible(false)}
      />
      <WheelSelector
        visible={guestWheelVisible}
        label="Number of Guests"
        maxNumber={maxGuests}
        selectedValue={numberOfGuests}
        onConfirm={guestConfirmHandler}
        onCancel={() => setGuestWheelVisible(false)}
      />
      <WheelSelector
        visible={campsiteWheelVisible}
        label="Number of Campsites"
        maxNumber={maxCampsites}
        selectedValue={numberOfCampsites}
        onConfirm={campsiteConfirmHandler}
        onCancel={() => setCampsiteWheelVisible(false)}
      />
    </ImageBackground>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  // makes the picture stretch to fill the screen on phones and tablets
  backgroundImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    flex: 1,
    backgroundColor: Colors.overlay,
  },
  safeArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  scrollContentTablet: {
    paddingHorizontal: 60,
  },
  formCard: {
    backgroundColor: Colors.cardBackground,
    borderRadius: 16,
    padding: 18,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: Colors.pineGreen,
  },
  formCardTablet: {
    maxWidth: 820,
    padding: 28,
  },
  rowLayout: {
    flexDirection: "row",
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
  },
  label: {
    fontFamily: "mountain",
    fontSize: 20,
    color: Colors.pineGreen,
    marginTop: 8,
    marginBottom: 6,
  },
  labelTablet: {
    fontSize: 28,
  },
  selectorBox: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.campfireOrange,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 6,
  },
  selectorText: {
    fontFamily: "latoRegular",
    fontSize: 16,
    color: Colors.bark,
  },
  selectorTextTablet: {
    fontSize: 22,
  },
  resultsCard: {
    backgroundColor: Colors.pineGreen,
    borderRadius: 16,
    padding: 18,
    marginTop: 22,
    width: "100%",
    maxWidth: 560,
    alignSelf: "center",
    borderWidth: 2,
    borderColor: Colors.canvas,
  },
  resultsTitle: {
    fontFamily: "mountain",
    fontSize: 26,
    color: Colors.canvas,
    textAlign: "center",
    marginBottom: 10,
  },
  resultsTitleTablet: {
    fontSize: 36,
  },
  resultsText: {
    fontFamily: "latoRegular",
    fontSize: 16,
    color: Colors.canvas,
    marginBottom: 6,
  },
  resultsTextTablet: {
    fontSize: 22,
  },
});
