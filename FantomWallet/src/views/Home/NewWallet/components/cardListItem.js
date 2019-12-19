import React from "react";
import { View, Text} from "react-native";
import styles from "../styles";




const CardListItem = ({data,isHiddenText}) => {
  const { amount,amountUnit } = data;
  return data.map(item => {
    return (
      <View style={styles.listItemContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.listItemTitle}>Fantom</Text>
          <Text style={styles.listItemTitle}>
            {isHiddenText ? "********" : `${amount} ${amountUnit}`}
          </Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.balanceText}>{`$${amount}`}</Text>
          <Text style={styles.balanceText}>{isHiddenText ? "" : `$${amount}`}</Text>
        </View>
      </View>
    );
  }); 
};
export default CardListItem;
