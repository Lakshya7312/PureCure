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
  TextInput,
} from "react-native";
import SelectDropdown from "react-native-select-dropdown";

import { RFValue } from "react-native-responsive-fontsize";

export default class DonateBloodScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedLab: "",
      selectedDay: "",
      selectedTime: "",
      bGroup: "",
    };
  }

  checkTextInput = () => {
    if (
      !this.state.selectedDay.trim() ||
      !this.state.selectedLab.trim() ||
      !this.state.selectedTime.trim() ||
      !this.state.bGroup.trim()
    ) {
      const message = "Please fill all the required fields!";
      if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", message);
      }
    } else {
      Alert.alert(
        "Booking Confirmed!",
        `Please come to ${this.state.selectedLab} between ${this.state.selectedTime} on ${this.state.selectedDay} :)`
      );
      this.props.navigation.goBack();
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
        <ScrollView>
          <Text style={styles.head}>Donate Blood</Text>
          <Text
            style={[
              styles.head1,
              {
                marginTop: RFValue(40),
              },
            ]}
          >
            Choose a Lab:
          </Text>
          <SelectDropdown
            data={[
              "Indian Red Cross Society",
              "Jamshedpur Blood Bank",
              "Tata Blood Donation Center",
            ]}
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
            data={["Thursday", "Friday", "Saturday", "Sunday"]}
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
              "2:00 p.m. - 3:00 p.m.",
            ]}
            defaultButtonText="Select Time"
            onSelect={(value) => {
              this.setState({ selectedTime: value });
            }}
            buttonStyle={styles.labButton}
            buttonTextStyle={{ color: "#000" }}
            dropdownStyle={{ borderRadius: 25 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Blood Group"
            keyboardType="default"
            maxLength={3}
            placeholderTextColor={"#000"}
            onChangeText={(text) => {
              this.setState({ bGroup: text });
            }}
          />
          <Pressable
            style={styles.button}
            onPress={() => {
              this.checkTextInput();
            }}
          >
            <Text style={styles.buttonText}>Confirm</Text>
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

  head: {
    fontSize: RFValue(30),
    fontWeight: "bold",
    marginTop: RFValue(60),
    alignSelf: "center",
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
    marginTop: RFValue(60),
  },

  buttonText: {
    fontSize: RFValue(15),
    alignSelf: "center",
    color: "#fff",
  },

  input: {
    width: RFValue(150),
    height: RFValue(40),
    backgroundColor: "#e9ecf7",
    borderColor: "#7280f1",
    borderWidth: 3,
    borderRadius: 30,
    color: "#000",
    marginTop: RFValue(40),
    textAlign: "center",
    alignSelf: "center",
  },
});
