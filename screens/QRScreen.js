import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";

import { BarCodeScanner } from "expo-barcode-scanner";

export default class QRScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      hasPermission: null,
      scanned: false,
    };
  }

  getBarCodeScannerPermissions = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });
  };

  handleBarCodeScanned = ({ type, data }) => {
    this.setState({ scanned: true });
    Alert.alert("Scanned", `Barcode with data ${data} has been scanned!`);
  };

  componentDidMount() {
    this.getBarCodeScannerPermissions();
  }

  render() {
    if (this.state.hasPermission === null) {
      return <Text>Requesting Camera Permission </Text>;
    }
    if (this.state.hasPermission === false) {
      return (
        <View>
          <Text>No access to camera!</Text>
          <Button
            title={"Give access"}
            onPress={() => this.getBarCodeScannerPermissions()}
          />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={
            this.state.scanned ? undefined : this.handleBarCodeScanned
          }
          style={StyleSheet.absoluteFillObject}
        />
        {this.state.scanned && (
          <Button
            title={"Tap to Scan Again"}
            onPress={() => this.setState({ scanned: false })}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
});
