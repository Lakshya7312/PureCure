import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  StatusBar,
  Modal,
  TextInput,
  Alert,
  ToastAndroid,
} from "react-native";

import SelectDropdown from "react-native-select-dropdown";

import MyHeader from "../components/MyHeader";

import { RFValue } from "react-native-responsive-fontsize";

export default class DonationScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      isModalVisible: false,
      isModalVisible2: false,
      amount: "",
      card: "",
      name: "",
      expiry: "",
      cvv: "",
      selectedHospital: "",
    };
  }

  checkTextInput = () => {
    if (
      !this.state.amount.trim() ||
      !this.state.card.trim() ||
      !this.state.name.trim() ||
      !this.state.expiry.trim() ||
      !this.state.cvv.trim()
    ) {
      const message = "Please fill all the required fields!";
      if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", message);
      }
    } else {
      Alert.alert(
        "Thank you!",
        `Your donation for Rs. ${this.state.amount} was completed :)`
      );
      this.setState({ isModalVisible: false });
    }
  };

  checkTextInput1 = () => {
    if (!this.state.selectedHospital.trim()) {
      const message = "Please select a hospital!";
      if (Platform.OS === "android") {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      } else {
        Alert.alert("Error", message);
      }
    } else {
      Alert.alert(
        "Thank you!",
        `You can go and donate your medicines at ${this.state.selectedHospital} :)`
      );
      this.setState({ isModalVisible2: false });
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
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible}
            onRequestClose={() => {
              this.setState({ isModalVisible: false });
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <TextInput
                  style={styles.input}
                  maxLength={6}
                  keyboardType="number-pad"
                  placeholder="Amount"
                  placeholderTextColor={"#FFF"}
                  onChangeText={(text) => {
                    this.setState({ amount: text });
                  }}
                />
                <TextInput
                  style={styles.input}
                  maxLength={16}
                  keyboardType="number-pad"
                  placeholder="Card number"
                  placeholderTextColor={"#FFF"}
                  onChangeText={(text) => {
                    this.setState({ card: text });
                  }}
                />
                <TextInput
                  style={styles.input}
                  maxLength={16}
                  keyboardType="default"
                  placeholder="Name on Card"
                  placeholderTextColor={"#FFF"}
                  onChangeText={(text) => {
                    this.setState({ name: text });
                  }}
                />
                <View style={styles.cont}>
                  <TextInput
                    style={[styles.input, { width: RFValue(130) }]}
                    maxLength={7}
                    keyboardType="number-pad"
                    placeholder="Expiry Date"
                    placeholderTextColor={"#FFF"}
                    onChangeText={(text) => {
                      this.setState({ expiry: text });
                    }}
                  />
                  <TextInput
                    style={[
                      styles.input,
                      { width: RFValue(130), marginLeft: RFValue(10) },
                    ]}
                    maxLength={3}
                    keyboardType="number-pad"
                    placeholder="CVV"
                    placeholderTextColor={"#FFF"}
                    onChangeText={(text) => {
                      this.setState({ cvv: text });
                    }}
                  />
                </View>
                <View style={styles.buttEqual}>
                  <Pressable
                    style={[styles.modalButton, { backgroundColor: "#7280f1" }]}
                    onPress={() => {
                      this.setState({ isModalVisible: false });
                    }}
                  >
                    <Text style={[styles.modalButtonText, { color: "#fff" }]}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalButton}
                    onPress={() => {
                      this.checkTextInput();
                    }}
                  >
                    <Text style={styles.modalButtonText}>Pay</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.isModalVisible2}
            onRequestClose={() => {
              this.setState({ isModalVisible2: false });
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <SelectDropdown
                  data={[
                    "Tata Main Hospital",
                    "MGM Hospital",
                    "Steel City Hospital",
                    "KGM Hospital",
                  ]}
                  defaultButtonText="Select Hospital"
                  onSelect={(value) => {
                    this.setState({ selectedHospital: value });
                  }}
                  buttonStyle={styles.labButton}
                  buttonTextStyle={{ color: "#000" }}
                  dropdownStyle={{ borderRadius: 25 }}
                />
                <View style={styles.buttEqual}>
                  <Pressable
                    style={[styles.modalButton, { backgroundColor: "#7280f1" }]}
                    onPress={() => {
                      this.setState({ isModalVisible2: false });
                    }}
                  >
                    <Text style={[styles.modalButtonText, { color: "#fff" }]}>
                      Cancel
                    </Text>
                  </Pressable>
                  <Pressable
                    style={styles.modalButton}
                    onPress={() => {
                      this.checkTextInput1();
                    }}
                  >
                    <Text style={styles.modalButtonText}>Confirm</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Text style={styles.text}>Donations</Text>
          <Pressable
            style={styles.button}
            onPress={() => {
              this.setState({ isModalVisible: true });
            }}
          >
            <Text
              style={styles.buttonText}
              onPress={() => {
                this.setState({ isModalVisible: true });
              }}
            >
              Donate money for a cause
            </Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("Blood");
            }}
          >
            <Text style={styles.buttonText}>Blood Donation</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              this.setState({ isModalVisible2: true });
            }}
          >
            <Text style={styles.buttonText}>Donate left over medicines</Text>
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

  heading: {
    fontSize: RFValue(27),
    fontWeight: "bold",
    color: "#fff",
    alignSelf: "center",
  },

  text: {
    fontSize: RFValue(40),
    alignSelf: "center",
    color: "#000",
    fontWeight: "bold",
    marginTop: RFValue(20),
    marginBottom: RFValue(20),
  },

  button: {
    width: "90%",
    height: RFValue(45),
    backgroundColor: "#7280f1",
    borderRadius: 10,
    alignSelf: "center",
    textAlign: "center",
    justifyContent: "center",
    marginTop: RFValue(20),
  },

  buttonText: {
    fontSize: RFValue(15),
    alignSelf: "center",
    color: "#fff",
  },

  cont: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: RFValue(20),
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: RFValue(22),
  },

  modalView: {
    margin: RFValue(20),
    borderRadius: 20,
    padding: RFValue(35),
    alignItems: "center",
    backgroundColor: "#7280f1",
    width: "95%",
    height: "60%",
    borderColor: "#000",
    borderWidth: 2,
  },

  input: {
    width: RFValue(270),
    height: RFValue(40),
    backgroundColor: "#7280f1",
    borderColor: "#fff",
    borderWidth: 2,
    alignSelf: "center",
    borderRadius: 30,
    color: "#fff",
    marginTop: RFValue(10),
    textAlign: "center",
  },

  buttEqual: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: RFValue(30),
    padding: RFValue(20),
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },

  modalButton: {
    width: RFValue(85),
    height: RFValue(35),
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    marginLeft: RFValue(20),
  },

  modalButtonText: {
    color: "#000",
    alignSelf: "center",
    fontSize: RFValue(15),
    textAlign: "center",
    textAlignVertical: "center",
    fontWeight: "bold",
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
});
