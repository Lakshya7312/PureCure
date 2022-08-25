import React from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  ScrollView,
} from "react-native";

import MyHeader from "../components/MyHeader";

import { RFValue } from "react-native-responsive-fontsize";

export default class EFormScreen extends React.Component {
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
          <Text style={styles.text}>Choose an option</Text>
          <Pressable
            style={[styles.button, { marginTop: RFValue(40) }]}
            onPress={() => {
              this.props.navigation.navigate("QRCode");
            }}
          >
            <Text style={styles.buttonText}>Scan QR Code</Text>
          </Pressable>
          <Pressable
            style={styles.button}
            onPress={() => {
              this.props.navigation.navigate("NFC");
            }}
          >
            <Text style={styles.buttonText}>NFC</Text>
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
    fontSize: RFValue(30),
    alignSelf: "center",
    color: "#000",
    fontWeight: "bold",
    marginTop: RFValue(20),
  },

  button: {
    width: RFValue(250),
    height: RFValue(45),
    backgroundColor: "#7280f1",
    borderRadius: 50,
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
});
