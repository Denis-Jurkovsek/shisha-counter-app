import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import normalize from 'react-native-normalize/src/index';
import {Col, Grid, Row} from 'react-native-easy-grid';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#23262B',
    width: normalize(160),
    height: normalize(150),
    padding: normalize(15),
    marginTop: normalize(15),
    borderRadius: 15,
    margin: normalize(10),
  },
  cardName: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
  },
  username: {fontSize: 10, textAlign: 'center'},
  detailText: {
    fontSize: 20,
    textAlign: 'center',
    color: '#00ffb4',
    fontWeight: 'bold',
  },
  cardMixture: {color: '#00ffb3'},
  emojiRating: {width: 45, height: 45, alignSelf: 'center'},
  chip: {
    backgroundColor: '#4D4D4D',
    width: 50,
    height: 20,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
  tobaccoName: {color: '#00ffb3'},
});

const TobaccoCard = props => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardName}>Traubman</Text>
      <Text style={styles.username}>@username</Text>
      <Image
        style={styles.emojiRating}
        source={require('../assets/img/emoji_1.png')}
      />
      <Text style={styles.detailText}>Siehe mehr</Text>
    </View>
  );
};

export default TobaccoCard;
