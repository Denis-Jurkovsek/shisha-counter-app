import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Rating} from 'react-native-ratings';
import normalize from 'react-native-normalize/src/index';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#23262B',
    width: normalize(141),
    height: normalize(140),
    padding: normalize(15),
    marginTop: normalize(15),
    borderRadius: 15,
    margin: normalize(10),
  },
  cardName: {color: '#fff', fontWeight: 'bold'},
  cardMixture: {color: '#00ffb3'},
});

const TobaccoCard = props => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardName}>Doppel Pynkman</Text>
      <Text style={styles.whiteText}>Was ist drin?</Text>
      <Text style={styles.cardMixture}>50% Pynkman{'\n'}50% Doppelapfel</Text>
      <Rating
        type="custom"
        ratingBackgroundColor="#c8c7c8"
        tintColor="#23262B"
        ratingCount={5}
        imageSize={21}
        style={{
          paddingVertical: normalize(10),
        }}
      />
    </View>
  );
};

export default TobaccoCard;
