import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import normalize from 'react-native-normalize';

interface ITobaccoCardProps {
  name: string;
  username: string;
  rating: number;
  mixture: string[];
  color: string;
}

const TobaccoCard: React.FC<ITobaccoCardProps> = ({
  name,
  username,
  rating,
  mixture,
}) => {
  return (
    <View style={styles.card}>
      <Text style={styles.cardName}>{name}</Text>

      <Text style={styles.mixText}>10% Pynkman</Text>
      <Text style={styles.mixText}>50% Black Nana</Text>
      <Text style={styles.mixText}>10% Supernova</Text>
      <Text style={styles.mixText}>10% Needls</Text>
      <Text style={styles.mixText}>30% Kashmir</Text>

      <Text style={styles.username}>Mixed by @{username}</Text>
      <Image
        style={styles.emojiRating}
        source={require('../assets/img/emoji_1.png')}
      />

      <View style={styles.chip}>
        <Text style={{color: '#fff'}}>{rating}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'rgba(255, 0, 0, 0.2)',
    width: normalize(330),
    height: normalize(400),
    borderRadius: 40,
  },
  cardName: {
    color: '#FF0000',
    fontWeight: 'bold',
    paddingLeft: normalize(20),
    paddingTop: normalize(20),
    fontSize: 40,
  },
  username: {fontSize: 15, color: '#626262'},
  mixText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: normalize(20),
    paddingTop: normalize(10),
  },
  emojiRating: {width: 160, height: 160, alignSelf: 'flex-end', opacity: 0.5},
  chip: {
    backgroundColor: '#4D4D4D',
    width: 50,
    height: 20,
    marginTop: 5,
    borderRadius: 10,
    alignItems: 'center',
  },
});

export default TobaccoCard;
