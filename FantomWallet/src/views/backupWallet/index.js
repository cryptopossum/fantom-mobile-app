import React, { Component } from "react";
import { View, WebView, StatusBar, Text } from "react-native";
import { SafeAreaView } from "react-navigation";
import CheckBox from "../../general/checkBox";
import styles from "./style";
import Button from "../../components/general/Button";
import { Colors } from "../../theme";
import { NavigationService, routes } from "~/navigation/helpers";
import Header from "~/components/Header";
export default class BackupWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEnable: false
    };
  }
  onLeftIconPress = () => {
    const {navigation}=this.props
    const backToHome = navigation.getParam("backToHome", false);
    if (backToHome) {
      NavigationService.navigate(routes.HomeScreen.Settings);
    } else NavigationService.pop();
  };

  render() {
    const { isEnable } = this.state;

    return (
      <View style={styles.mainContainerStyle}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* <StatusBar barStyle="light-content" /> */}
          <Header
            onLeftIconPress={this.onLeftIconPress}
            headerStyle={styles.headerStyle}
            leftButtonIcon="chevron-left"
            leftIconColor="black"
            leftIconSize={30}
          />
          <View style={styles.headerTextView}>
            <View style={styles.mainHeadingContainer}>
              <Text style={styles.mainHeading}>Back up your wallet now!</Text>
            </View>
            <View style={styles.subHeadingContainer}>
              <Text style={styles.subHeading}>
                In the next step you will see 12 words that allow you recover
                the wallet.
              </Text>
            </View>
          </View>
          <View style={styles.flex1}>
            <View style={styles.termsContainer}>
              <Text style={styles.termsText}>
                The recovery words are the only way to recover the wallet. If
                you lose these words, you will lose access to your wallet.
              </Text>
            </View>
          </View>
          <View style={styles.flex1}>
            <View style={styles.checkBoxContainer}>
              <CheckBox
                onChange={() => this.setState({ isEnable: !isEnable })}
              />
              <Text style={{ ...styles.termsText, paddingLeft: 6 }}>
                I understand
              </Text>
            </View>
            <Button
              buttonStyle={{
                ...styles.buttonStyle,
                backgroundColor: isEnable
                  ? Colors.royalBlue
                  : Colors.greyOpacity
              }}
              textStyle={styles.buttonText}
              text={"CONTINUE"}
              onPress={() => {
                if (isEnable) {
                  NavigationService.navigate(routes.root.CreateMnemonic);
                }
              }}
            />
          </View>
        </SafeAreaView>
      </View>
    );
  }
}
