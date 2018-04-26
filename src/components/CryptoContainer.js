import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, TextInput } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';

import FetchCoinData from './../Actions/FetchCoinData';
import CoinCard from './CoinCard';

class CryptoContainer extends Component {
  constructor(props) {
    super(props);
    this.state = { filterText: '' };
  }

  handleChange(filterText) {
    this.setState({ filterText })
  }

  componentWillMount() {
    this.props.FetchCoinData();
  }

  renderCoinCards() {
    const { crypto } = this.props;
    const { filterText} = this.state;

    return crypto.data.filter(({ name }) => {
      return name.toLowerCase().includes(filterText.toLowerCase())
    }).map((coin) =>
      <CoinCard
        key={coin.name}
        coin_name={coin.name}
        symbol={coin.symbol}
        price_usd={coin.price_usd}
        percent_change_24h={coin.percent_change_24h}
        percent_change_7d={coin.percent_change_7d}
      />
    )
  }

  render() {
    const { crypto } = this.props;
    const { contentContainer } = styles;

    if (crypto.isFetching) {
      return (
        <View>
          <Spinner
            visible={crypto.isFetching}
            textContent={"Loading..."}
            textStyle={{color: '#253145'}}
            animation="fade"
          />
        </View>
      )
    }

    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={this.handleChange.bind(this)}
          value={this.state.filterText}
        />
        <ScrollView contentContainerStyle={contentContainer}>
          {this.renderCoinCards()}
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  contentContainer: {
      paddingBottom: 100,
      paddingTop: 55
  }
}

function mapStateToProps(state) {
  return {
      crypto: state.crypto
  }
}

export default connect(mapStateToProps, { FetchCoinData })(CryptoContainer)
