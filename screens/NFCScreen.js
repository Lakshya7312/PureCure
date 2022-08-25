import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";

export default class NFCScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>NFC</Text>
        <Image
          source={require("../images/nfc.png")}
          containerStyle={{ alignSelf: "center" }}
          style={styles.img}
        />
        <Text style={[styles.text, { fontSize: RFValue(26), marginTop: RFValue(30) }]}>
          Connect to transfer data
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ecf7",
  },

  text: {
    alignSelf: "center",
    fontSize: RFValue(40),
    color: "#000",
    fontWeight: "bold",
    marginTop: RFValue(80),
  },

  img: {
    width: RFValue(340),
    height: RFValue(290),
    alignSelf: "center",
    marginTop: RFValue(40),
    borderRadius: 10,
  },
});
