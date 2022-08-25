import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { RFValue } from "react-native-responsive-fontsize";

export default class ReportScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require("../images/noData.png")} style={styles.image} />
        <Text style={styles.text}>No reports found...</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9ecf7",
  },

  image: {
    width: "90%",
    height: "50%",
    alignSelf: "center",
    marginTop: RFValue(130),
  },

  text: {
    fontWeight: "bold",
    fontSize: RFValue(20),
    alignSelf: "center",
    marginTop: RFValue(20),
  },
});
