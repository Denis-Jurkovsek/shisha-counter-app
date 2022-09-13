import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import normalize from 'react-native-normalize/src/index';
import {Col, Grid, Row} from 'react-native-easy-grid';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#23262B',
    width: normalize(160),
    height: normalize(70),
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
  heart: {
    width: normalize(20),
    height: normalize(20),
    bottom: normalize(30),
    left: normalize(120),
  },
});

const FavoriteCard = props => {
  return (
    <View style={styles.card}>
      <Row>
        <Col>
          <Col>
            <Text style={styles.cardName}>Traubman</Text>
            <Text style={styles.username}>@username</Text>
          </Col>
          <Image
            style={styles.heart}
            source={require('../assets/img/emoji_4.png')}
          />
        </Col>
      </Row>
    </View>
  );
};

export default FavoriteCard;
