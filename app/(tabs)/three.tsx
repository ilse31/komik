import React from "react";

import { SafeAreaView, StyleSheet } from "react-native";
import WebView from "react-native-webview";
import EditScreenInfo from "../../components/EditScreenInfo";
import { Text, View } from "../../components/Themed";
import AndroidSafeArea from "../../components/AndroidSafeArea";

type Props = {};

const three = (props: Props) => {
  return (
    <SafeAreaView style={AndroidSafeArea.AndroidSafeArea}>
      <View>
        <View>
          <Text lightColor='rgba(0,0,0,0.8)' darkColor='rgba(255,255,255,0.8)'>
            Open up the code for this screen:
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default three;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
