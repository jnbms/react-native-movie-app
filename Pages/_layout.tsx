
import { ScrollView, StyleSheet, View } from "react-native";

export default function GlobalLayout({children}: any): JSX.Element {
  return (
    <View style={{backgroundColor: "black",height: 300}}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
    scrollview: {
        backgroundColor: "black",
        color: "white"
    }
})