import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import normalize from 'react-native-normalize/src/index';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(20),
    backgroundColor: '#333',
  },
  textContainer: {
    padding: normalize(20),
    backgroundColor: 'yellow',
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
    width: normalize(245),
    margin: normalize(12),
    borderWidth: 1,
    padding: normalize(10),
    color: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
  },

  quarterInput: {
    height: normalize(55),
    width: normalize(60),
    margin: normalize(12),
    borderWidth: 1,
    padding: normalize(10),
    color: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
    textAlign: 'center',
  },
  // Buttons
  buttonText: {fontSize: 15, color: '#fff', alignSelf: 'center'},
  button: {
    elevation: 8,
    backgroundColor: '#00ffb3',
    borderRadius: 15,
    paddingVertical: normalize(18),
    margin: normalize(10),
  },

  // Cards
  mixContainer: {
    padding: normalize(15),
  },

  // Emojis
  emojiContainer: {justifyContent: 'flex-end', backgroundColor: 'red'},
  emoji: {width: 50, height: 50},
});

const rating_image = require('../assets/img/hookah.png');

class MixCreator extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Create your own</Text>
          <Text style={styles.subtitle}>MIXES.</Text>
        </View>

        <View style={{backgroundColor: 'orange'}}>
          <TextInput
            style={styles.input}
            placeholder="Ihre E-Mail"
            placeholderTextColor="white"
          />
          <TextInput
            style={styles.input}
            placeholder="Ihr Passwort"
            placeholderTextColor="white"
            secureTextEntry
          />

          <View style={styles.emojiContainer}>
            <Image
              style={styles.emoji}
              source={require('../assets/img/emoji_4.png')}
            />
            <Image
              style={styles.emoji}
              source={require('../assets/img/emoji_4.png')}
            />
            <Image
              style={styles.emoji}
              source={require('../assets/img/emoji_4.png')}
            />
            <Image
              style={styles.emoji}
              source={require('../assets/img/emoji_4.png')}
            />
          </View>

          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Anmelden</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MixCreator;
