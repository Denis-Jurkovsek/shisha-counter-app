import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import normalize from 'react-native-normalize/src/index';
import {Col, Grid, Row} from 'react-native-easy-grid';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#23262B',
    width: normalize(325),
    height: normalize(170),
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
  cardMixture: {color: '#00ffb3'},
  emojiRating: {width: 60, height: 60, alignSelf: 'center'},
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
      <Text style={styles.cardName}>Doppel Pynkman</Text>
      <Image
        style={styles.emojiRating}
        source={require('../assets/img/emoji_4.png')}
      />
      <Grid>
        <Row>
          <Col>
            <Text style={styles.tobaccoName}>Pynkman</Text>
            <View style={styles.chip}>
              <Text>50%</Text>
            </View>
          </Col>
          <Col>
            <Text style={styles.tobaccoName}>Pynkman</Text>
            <View style={styles.chip}>
              <Text>50%</Text>
            </View>
          </Col>
          <Col>
            <Text style={styles.tobaccoName}>Pynkman</Text>
            <View style={styles.chip}>
              <Text>50%</Text>
            </View>
          </Col>
          <Col>
            <Text style={styles.tobaccoName}>Pynkman</Text>
            <View style={styles.chip}>
              <Text>50%</Text>
            </View>
          </Col>
        </Row>
      </Grid>
    </View>
  );
};

export default TobaccoCard;
