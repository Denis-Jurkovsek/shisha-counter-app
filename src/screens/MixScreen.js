import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import normalize from 'react-native-normalize/src/index';
import {Row, Grid} from 'react-native-easy-grid';
import {Rating} from 'react-native-ratings';
import TobaccoCard from '../components/tobacco-card.component';

const styles = StyleSheet.create({
  container: {
    padding: normalize(20),
    flex: 1,
    backgroundColor: '#333',
  },
  textContainer: {
    padding: normalize(20),
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#00ffb4',
    fontSize: 40,
    fontWeight: 'bold',
  },
  whiteText: {
    color: '#fff',
  },
  // Inputs
  input: {
    height: normalize(55),
    margin: normalize(12),
    borderWidth: 1,
    padding: normalize(10),
    color: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
  },

  halfInput: {
    height: normalize(55),
    width: normalize(200),
    margin: normalize(12),
    borderWidth: 1,
    padding: normalize(10),
    color: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
  },

  quarterInput: {
    height: normalize(55),
    width: normalize(103),
    margin: normalize(12),
    borderWidth: 1,
    padding: normalize(10),
    color: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
  },

  // Buttons
  buttonText: {fontSize: 15, color: '#fff', alignSelf: 'center'},
  button: {
    elevation: 8,
    backgroundColor: '#00ffb3',
    borderRadius: 15,
    paddingVertical: normalize(18),
    margin: normalize(10),
    marginTop: normalize(150),
  },

  // Cards
  mixContainer: {
    padding: normalize(15),
  },
});

const rating_image = require('../assets/img/hookah.png');

class Mix extends Component {
  ratingCompleted(rating) {
    console.log('Rating is: ' + rating);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Create your own</Text>
          <Text style={styles.subtitle}>MIXES.</Text>
        </View>

        <View style={styles.loginContainer}>
          <TextInput
            style={styles.input}
            placeholder="Gib deinem Mix einen Namen"
            placeholderTextColor="white"
          />
          <Grid>
            <Row>
              <TextInput
                style={styles.halfInput}
                placeholder="Erste Tabaksorte"
                placeholderTextColor="white"
              />

              <TextInput
                style={styles.quarterInput}
                placeholder="Wie viel %?"
                placeholderTextColor="white"
              />
            </Row>

            <Row style={{marginTop: 60}}>
              <TextInput
                style={styles.halfInput}
                placeholder="Zweite Tabaksorte"
                placeholderTextColor="white"
              />

              <TextInput
                style={styles.quarterInput}
                placeholder="Wie viel %?"
                placeholderTextColor="white"
              />
            </Row>
          </Grid>

          <Rating
            type="star"
            ratingColor="#00ffb4"
            ratingBackgroundColor="#c8c7c8"
            tintColor="#333"
            ratingCount={5}
            imageSize={27}
            onFinishRating={this.ratingCompleted}
            style={{
              paddingVertical: normalize(10),
              top: normalize(140),
            }}
          />

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>CREATE YOUR MIX</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.mixContainer}>
          <Text style={styles.title}>
            YOUR <Text style={styles.subtitle}>MIXES.</Text>
          </Text>

          <ScrollView horizontal={true}>
            <TobaccoCard />
            <TobaccoCard />
            <TobaccoCard />
            <TobaccoCard />
            <TobaccoCard />
            <TobaccoCard />
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default Mix;
