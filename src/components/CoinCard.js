import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
} from 'react-native';
import { images } from '../Utils/CoinIcons';
import styles from '../styles/coin-card-style'

const {
    container,
    image,
    moneySymbol,
    upperRow,
    coinSymbol,
    coinName,
    coinPrice,
    statisticsContainer,
    seperator,
    percentChangePlus,
    percentChangeMinus
} = styles;

const CoinCard = ({ symbol, coin_name, price_usd, percent_change_24h, percent_change_7d }) => {


    return (
        <View style={container}>
          <View style={upperRow}>
            <Image style={styles.image} source={{ uri: images[symbol] }} />
            <Text style={coinSymbol}>{symbol}</Text>
            <Text style={seperator}>|</Text>
            <Text style={coinName}>{coin_name}</Text>
            <Text style={coinPrice}>{price_usd}
                <Text style={moneySymbol}> $ </Text>
            </Text>
          </View>
          <View style={statisticsContainer}>
            <Text>24h:
              <Text style={percent_change_24h < 0 ? percentChangeMinus : percentChangePlus }> {percent_change_24h} % </Text>
            </Text>
            <Text>7d:
              <Text style={percent_change_7d < 0 ? percentChangeMinus : percentChangePlus }> {percent_change_7d} % </Text>
            </Text>
          </View>
        </View>
    );
}



export default CoinCard;
