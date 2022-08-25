import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Alert,
  ToastAndroid,
  Platform,
  StatusBar,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import MyHeader from "../components/MyHeader";

import { RFValue } from "react-native-responsive-fontsize";

export default class PathologyScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedLab: "",
      selectedDay: "",
      selectedTime: "",
    };
  }

  checkTextInput = () => {
    if (
      !this.state.selectedDay.trim() ||
      !this.state.selectedLab.trim() ||
      !this.state.selectedTime.trim()
    ) {
      const message = "Please fill all the required fields!";
      if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", message);
      }
    } else {
      Alert.alert(
        "Appointment Confirmed!",
        `Our lab representative from ${this.state.selectedLab} will reach you between ${this.state.selectedTime} on ${this.state.selectedDay}.`
      );
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          hidden={false}
          backgroundColor="#f8f8f8"
          translucent={true}
        />
        <MyHeader />
        <ScrollView>
          <Text style={styles.head1}>Choose a Lab:</Text>
          <SelectDropdown
            data={["Dr. Lal Path Lab", "Nidaan Pathology Centre", "Modi Path Lab", "Om Sai Path Lab"]}
            defaultButtonText="Select a Lab"
            onSelect={(value) => {
              this.setState({ selectedLab: value });
            }}
            buttonStyle={styles.labButton}
            buttonTextStyle={{ color: "#000" }}
            dropdownStyle={{ borderRadius: 25 }}
          />
          <Text style={styles.head1}>Choose a Day:</Text>
          <SelectDropdown
            data={[
              "Monday",
              "Wednesday",
              "Thursday",
              "Friday",
              "Saturday",
              "Sunday",
            ]}
            defaultButtonText="Select a Day"
            onSelect={(value) => {
              this.setState({ selectedDay: value });
            }}
            buttonStyle={styles.labButton}
            buttonTextStyle={{ color: "#000" }}
            dropdownStyle={{ borderRadius: 25 }}
          />
          <Text style={styles.head1}>Choose a Time:</Text>
          <SelectDropdown
            data={[
              "9:00 a.m. - 10:00 a.m.",
              "10:00 a.m. - 11:00 a.m.",
              "11:00 a.m. - 12:00 p.m.",
              "3:00 p.m. - 4:00 p.m.",
              "4:00 p.m. - 5:00 p.m.",
              "5:00 p.m. - 6:00 p.m.",
            ]}
            defaultButtonText="Select Time"
            onSelect={(value) => {
              this.setState({ selectedTime: value });
            }}
            buttonStyle={styles.labButton}
            buttonTextStyle={{ color: "#000" }}
            dropdownStyle={{ borderRadius: 25 }}
          />
          <Pressable
            style={styles.button}
            onPress={() => {
              this.checkTextInput();
            }}
          >
            <Text style={styles.buttonText}>Book Appointment</Text>
          </Pressable>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ecf7",
  },

  head1: {
    fontSize: RFValue(20),
    fontWeight: "bold",
    marginTop: RFValue(20),
    marginLeft: RFValue(20),
  },

  labButton: {
    width: RFValue(250),
    height: RFValue(40),
    marginTop: RFValue(25),
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    borderColor: "#7280f1",
    borderWidth: 3,
    backgroundColor: "#e9ecf7",
  },

  button: {
    width: RFValue(250),
    height: RFValue(50),
    backgroundColor: "#7280f1",
    borderRadius: 50,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: RFValue(100),
  },

  buttonText: {
    fontSize: RFValue(15),
    alignSelf: "center",
    color: "#fff",
  },
});
