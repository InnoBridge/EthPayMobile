import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { usePushNotification } from "./usePushNotification";
import React from "react";

export default function App() {
  const { expoPushToken, notification } = usePushNotification();
  const data = JSON.stringify(notification, undefined, 2);

  console.log("data: ", data);

  return (
    <View style={styles.container}>
      <Text>EthPay App</Text>
      <Text>By InnoBridge</Text>
      {/* <Text>Push Token: {expoPushToken?.data ?? ""}</Text> */}
      <Text>
        Notification Message: {notification?.request.content.body ?? ""}
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
