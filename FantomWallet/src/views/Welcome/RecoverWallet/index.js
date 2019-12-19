// @flow
import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Clipboard,
  TouchableWithoutFeedback
} from "react-native";
import { connect } from "react-redux";
import Button from "../../../components/general/Button";
import { NavigationService, routes } from "~/navigation/helpers";

import { generateWallet as generateWalletAction } from "~/redux/keys/actions";
import { generateWalletUsingPrivateKey as generateWalletUsingPrivateKeyAction } from "~/redux/keys/actions";

import styles from "./styles";
import HeaderView from "./components/header";

type Props = {
  generateWallet: ({ mnemonic: string }) => void,
  generateWalletUsingPrivateKey: ({ privateKey: string }) => void,
  navigation: {
    navigate: string => void,
    goBack: () => void
  }
};

const getErrorView = (text, dismiss) => {
  return (
    <View style={styles.errorView}>
      <View style={styles.errorModalView}>
        <Text style={styles.errorTextHeading}>{text}</Text>
        <TouchableOpacity onPress={() => dismiss("")} style={styles.backButton}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const RecoverWalletContainer = ({
  generateWallet,
  navigation,
  generateWalletUsingPrivateKey
}: Props) => {
  const [mnemonic, setMnemonic] = useState("");
  const [privateKey, setPrivateKey] = useState("");
  const [errorType, setErrorType] = useState("");
  const [active, setActive] = useState(true);

  const onLeftIconPress = () => {
    const backToHome = navigation.getParam("backToHome", false);
    if (backToHome) {
      NavigationService.navigate(routes.HomeScreen.Settings);
    } else NavigationService.pop();
  };

  const onChangeView = value => {
    setActive(value);
  };

  /**
   * isValidSeed() :  This function is meant to check that captcha entered by user is valid or not.
   *    If invalid then error message is displayed.
   */
  const isValidSeed = _mnemonic => {
    const mnemonicKey = _mnemonic.split(" ");
    return mnemonicKey.length === 12;
  };

  const handleRecoverWallet = () => {
    const _mnemonic = mnemonic
      .replace(/' '/g, "") // TODO: flow??? legacy
      .replace(",", "")
      .replace("  ", " ")
      .trim();

    if (!isValidSeed(_mnemonic)) {
      setErrorType("phrase");
      return;
    }
    setErrorType("");
    generateWallet({
      mnemonic: _mnemonic,
      cb: (publicKey: string) =>
        NavigationService.navigate(routes.root.WalletImported, { publicKey })
    });
  };

  const handleRecoverWalletUsingPrivateKey = () => {
    generateWalletUsingPrivateKey({
      privateKey,
      cb: () => NavigationService.navigate(routes.root.WalletImported)
    });
  };

  const changeMnemonic = text => {
    setMnemonic(text);
    setErrorType("");
  };

  const readMnemonicFromClipboard = async () => {
    const clipboardContent = await Clipboard.getString();
    setMnemonic(clipboardContent);
  };

  const readPrivateKeyFromClipboard = async () => {
    const clipboardContent = await Clipboard.getString();
    setPrivateKey(clipboardContent);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <HeaderView
          onLeftIconPress={onLeftIconPress}
          active={active}
          onChangeView={onChangeView}
        />
        {/* View for the Phrase Tab */}
        {active && (
          <View style={styles.phraseContainer}>
            <Text style={styles.phraseHeading}>Phrase</Text>
            <View style={styles.inputView}>
              <TextInput
                autoCorrect={false}
                value={mnemonic}
                multiline={true}
                onChangeText={changeMnemonic}
                style={styles.textInput}
              ></TextInput>
              <TouchableOpacity
                style={styles.pasteButton}
                onPress={() => readMnemonicFromClipboard()}
              >
                <Text style={styles.pasterText}>Paste</Text>
              </TouchableOpacity>
            </View>

            <Text style={styles.noteText}>
              12 or 24 words separated by single spaces
            </Text>
            <Button
              onPress={handleRecoverWallet}
              buttonStyle={styles.buttonStyle}
              buttonText={styles.buttonText}
              text="Import"
            />
          </View>
        )}

        {/* View for the Private Key  Tab */}
        {!active && (
          <View style={styles.phraseContainer}>
            <Text style={styles.phraseHeading}>Private key</Text>
            <View style={styles.privateInputView}>
              <TextInput
                multiline={true}
                style={styles.textInput}
                value={privateKey}
                onChangeText={text => setPrivateKey(text)}
              ></TextInput>
              <TouchableOpacity
                style={styles.pasteButton}
                onPress={() => readPrivateKeyFromClipboard()}
              >
                <Text style={styles.pasterText}>Paste</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.noteText}>64 alphanumeric characters</Text>
            <Button
              buttonStyle={styles.buttonStyle}
              buttonText={styles.buttonText}
              onPress={handleRecoverWalletUsingPrivateKey}
              text="Import"
            />
          </View>
        )}

        {/* {getErrorView("Incorrect private key")}  */}

        {errorType === "phrase" &&
          getErrorView("Incorrect passphrase", setErrorType)}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default connect(null, {
  generateWallet: generateWalletAction,
  generateWalletUsingPrivateKey: generateWalletUsingPrivateKeyAction
})(RecoverWalletContainer);
