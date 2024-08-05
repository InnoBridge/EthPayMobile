import { usePushNotification } from "./usePushNotification";
import * as React from "react";
import Navigation from "./src/Navigation";

export default function App() {
  const { expoPushToken, notification } = usePushNotification();
  const data = JSON.stringify(notification, undefined, 2);

  console.log("data: ", data);

  return (
    // <View style={styles.container}>
    //   <Text>EthPay App</Text>
    //   <Text>By InnoBridge</Text>
    //   {/* <Text>Push Token: {expoPushToken?.data ?? ""}</Text> */}
    //   <Text>
    //     Notification Message: {notification?.request.content.body ?? ""}
    //   </Text>
    //   <StatusBar style="auto" />
    // </View>
    <Navigation />
  );
}
