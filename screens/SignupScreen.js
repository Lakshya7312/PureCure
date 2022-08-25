import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ToastAndroid,
  Platform,
  Modal,
  Pressable,
  StatusBar,
} from "react-native";

import { TextInputMask } from "react-native-masked-text";
import SelectDropdown from "react-native-select-dropdown";

import app from "../config";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

import { RFValue } from "react-native-responsive-fontsize";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const auth = getAuth(app);
const db = getFirestore(app);

export default class SignupScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      emergencyContact1: "",
      emergencyContact2: "",
      emergencyContact3: "",
      dob: "",
      gender: "",
      address: "",
      bGroup: "",
      verification: "",
      // Optional Section
      allergies: "",
      medicalHistory: "",
      insuranceCompany: "",
      insuranceNumber: "",
      preferredHospital1: "",
      preferredHospital2: "",
      preferredHospital3: "",
      isModalVisible: false,
    };
  }

  checkTextInput = () => {
    if (
      !this.state.email.trim() ||
      !this.state.password.trim() ||
      !this.state.confirmPassword.trim() ||
      !this.state.name.trim() ||
      !this.state.emergencyContact1.trim() ||
      !this.state.emergencyContact2.trim() ||
      !this.state.emergencyContact3.trim() ||
      !this.state.dob.trim() ||
      !this.state.gender.trim() ||
      !this.state.email.trim() ||
      !this.state.address.trim() ||
      !this.state.bGroup.trim() ||
      !this.state.verification.trim()
    ) {
      const message = "Please fill all the required fields!";
      if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", message);
      }
    } else {
      this.setState({ isModalVisible: true });
    }
  };

  signup = (email, password, confirmPassword) => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
          addDoc(collection(db, "users"), {
            email: this.state.email,
            password: this.state.password,
            name: this.state.name,
            dateOfBirth: this.state.dob,
            gender: this.state.gender,
            address: this.state.address,
            bloodGroup: this.state.bGroup,
            verification: this.state.verification,
            allergies: this.state.allergies,
            medicalHistory: this.state.medicalHistory,
            insuranceCompany: this.state.insuranceCompany,
            insuranceNumber: this.state.insuranceNumber,
            emergencyContact1: this.state.emergencyContact1,
            emergencyContact2: this.state.emergencyContact2,
            emergencyContact3: this.state.emergencyContact3,
            preferredHospital1: this.state.preferredHospital1,
            preferredHospital2: this.state.preferredHospital2,
            preferredHospital3: this.state.preferredHospital3,
          });
          Alert.alert(
            "Success",
            `Account created successfully!\nLogin to continue`
          );
          this.props.navigation.navigate("Login");
        })
        .catch((error) => {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          return Alert.alert("Error", errorMessage);
        });
    }
  };

  render() {
    return (
      <KeyboardAwareScrollView>
        <View style={styles.container}>
          <StatusBar
            barStyle="dark-content"
            hidden={false}
            backgroundColor="#fff"
            translucent={true}
          />
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible}
            onRequestClose={() => {
              this.setState({ isModalVisible: false });
            }}
          >
            <View style={styles.modalView}>
              <KeyboardAwareScrollView>
                <Text style={styles.modalText}>Optional Section</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Allergies (if any)"
                  keyboardType="default"
                  placeholderTextColor={"#000"}
                  onChangeText={(text) => {
                    this.setState({ allergies: text });
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Medical History (if any)"
                  keyboardType="default"
                  placeholderTextColor={"#000"}
                  onChangeText={(text) => {
                    this.setState({ medicalHistory: text });
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Health Insurance Company"
                  keyboardType="default"
                  placeholderTextColor={"#000"}
                  onChangeText={(text) => {
                    this.setState({ insuranceCompany: text });
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Health Insurance Number"
                  keyboardType="number-pad"
                  placeholderTextColor={"#000"}
                  onChangeText={(text) => {
                    this.setState({ insuranceNumber: text });
                  }}
                />
                <TextInput
                  style={styles.input}
                  placeholder="Preferred Hospital #1"
                  keyboardType="default"
                  placeholderTextColor={"#000"}
                  onChangeText={(text) => {
                    this.setState({
                      preferredHospital1: text,
                    });
                  }}
                />
                <TextInput
                  style={[styles.input, { marginTop: RFValue(10) }]}
                  placeholder="Preferred Hospital #2"
                  keyboardType="default"
                  placeholderTextColor={"#000"}
                  onChangeText={(text) => {
                    this.setState({
                      preferredHospital2: text,
                    });
                  }}
                />
                <TextInput
                  style={[styles.input, { marginTop: RFValue(10) }]}
                  placeholder="Preferred Hospital #3"
                  keyboardType="default"
                  placeholderTextColor={"#000"}
                  onChangeText={(text) => {
                    this.setState({
                      preferredHospital3: text,
                    });
                  }}
                />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    this.signup(
                      this.state.email,
                      this.state.password,
                      this.state.confirmPassword
                    );
                    this.setState({ isModalVisible: false });
                  }}
                >
                  <Text style={styles.textStyle}>Sign Up</Text>
                </Pressable>
              </KeyboardAwareScrollView>
            </View>
          </Modal>
          <ScrollView>
            <Text style={styles.head1}>Let's Get Started</Text>
            <Text
              style={[
                styles.head1,
                { fontSize: RFValue(15), marginTop: RFValue(2) },
              ]}
            >
              All inputs below are required to be filled
            </Text>
            <TextInput
              style={[styles.input, { marginTop: RFValue(30) }]}
              placeholder="Email"
              placeholderTextColor={"#000"}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              placeholderTextColor={"#000"}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              placeholderTextColor={"#000"}
              autoCapitalize="none"
              secureTextEntry={true}
              onChangeText={(text) => {
                this.setState({ confirmPassword: text });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Name"
              placeholderTextColor={"#000"}
              onChangeText={(text) => {
                this.setState({ name: text });
              }}
            />
            <TextInput
              style={styles.input}
              placeholder="Emergency Contact #1"
              keyboardType="phone-pad"
              maxLength={10}
              placeholderTextColor={"#000"}
              onChangeText={(text) => {
                this.setState({
                  emergencyContact1: text,
                });
              }}
            />
            <TextInput
              style={[styles.input, { marginTop: RFValue(10) }]}
              placeholder="Emergency Contact #2"
              keyboardType="phone-pad"
              maxLength={10}
              placeholderTextColor={"#000"}
              onChangeText={(text) => {
                this.setState({
                  emergencyContact2: text,
                });
              }}
            />
            <TextInput
              style={[styles.input, { marginTop: RFValue(10) }]}
              placeholder="Emergency Contact #3"
              keyboardType="phone-pad"
              maxLength={10}
              placeholderTextColor={"#000"}
              onChangeText={(text) => {
                this.setState({
                  emergencyContact3: text,
                });
              }}
            />
            <TextInputMask
              style={styles.input}
              placeholder="Date of Birth: DD/MM/YYYY"
              placeholderTextColor={"#000"}
              type={"datetime"}
              options={{ format: "DD/MM/YYYY" }}
              value={this.state.dob}
              onChangeText={(text) => {
                this.setState({ dob: text });
              }}
              ref={(ref) => (this.datetimeField = ref)}
            />
            <SelectDropdown
              data={["Male", "Female"]}
              defaultButtonText={"Gender"}
              onSelect={(selectedItem) => {
                this.setState({ gender: selectedItem });
              }}
              buttonStyle={styles.genderMenu}
              buttonTextStyle={{ color: "#000" }}
              dropdownStyle={{ borderRadius: 30 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              keyboardType="default"
              placeholderTextColor={"#000"}
              onChangeText={(text) => {
                this.setState({ address: text });
              }}
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
            <TextInput
              style={[styles.input, { fontSize: RFValue(9) }]}
              placeholder="Aadhar/Pan Card/Passport/Driving Licence Number"
              keyboardType="number-pad"
              placeholderTextColor={"#000"}
              onChangeText={(text) => {
                this.setState({ verification: text });
              }}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                this.checkTextInput();
              }}
            >
              <Text style={styles.buttonText}>Next</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ecf7",
  },

  head1: {
    color: "#000",
    fontSize: RFValue(30),
    alignSelf: "center",
    fontWeight: "bold",
    marginTop: RFValue(30),
  },

  input: {
    width: RFValue(250),
    height: RFValue(40),
    borderColor: "#0F3D3E",
    borderWidth: 2,
    borderRadius: 30,
    color: "#000",
    marginTop: RFValue(30),
    textAlign: "center",
    alignSelf: "center",
    justifyContent: "center",
  },

  genderMenu: {
    width: RFValue(250),
    height: RFValue(40),
    borderRadius: 30,
    alignSelf: "center",
    justifyContent: "center",
    marginTop: RFValue(30),
    borderColor: "#0F3D3E",
    borderWidth: 2,
    backgroundColor: "#e9ecf7",
  },

  button: {
    width: RFValue(200),
    height: RFValue(40),
    backgroundColor: "#7280f1",
    borderRadius: 40,
    borderWidth: 2,
    borderColor: "#7280f1",
    alignSelf: "center",
    marginTop: RFValue(30),
    marginBottom: RFValue(10),
    textAlign: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#fff",
    alignSelf: "center",
    fontSize: RFValue(15),
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
  },

  modalView: {
    backgroundColor: "#e9ecf7",
    padding: 35,
    alignItems: "center",
    height: "100%",
    width: "100%",
  },

  buttonClose: {
    backgroundColor: "#7280f1",
  },

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
    fontSize: RFValue(20),
  },
});
