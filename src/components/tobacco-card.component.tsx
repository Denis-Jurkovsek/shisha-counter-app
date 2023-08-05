
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import normalize from 'react-native-normalize';

interface ITobaccoCardProps {
  name: string;
  username: string;
  rating: number;
  mixture: {
    name: string;
    percent: number;
  }[];
  color: string;
}

const TobaccoCard: React.FC<ITobaccoCardProps> = ({
  name,
  username,
  rating,
  mixture,
  color
}) => {


  const ratingImage = () => {
    switch (rating) {
      case 1:
        return require('../assets/img/emojis/1.png');
      case 2:
        return require('../assets/img/emojis/2.png');
      case 3:
        return require('../assets/img/emojis/3.png');
      case 4:
        return require('../assets/img/emojis/4.png');
      case 5:
        return require('../assets/img/emojis/5.png');
      case 6:
        return require('../assets/img/emojis/6.png');
      case 7:
        return require('../assets/img/emojis/7.png');
      case 8:
        return require('../assets/img/emojis/8.png');
      case 9:
        return require('../assets/img/emojis/9.png');
      case 10:
        return require('../assets/img/emojis/10.png');
      default:
        return require('../assets/img/emojis/5.png');
    }
  };


  return (
    <View style={ {
      ...styles.card,
      backgroundColor: `${color}20`,
    } }>
      <Text style={ {
        ...styles.cardName,
        color: `${color}`,
      } }>{ name }</Text>

      {
        mixture.map((mix) => {
          return (
            <Text style={ styles.mixText } key={ mix.name }>
              { mix.percent }% { mix.name }
            </Text>
          );
        }
        )
      }

      <Text style={ styles.username }>Mixed by @{ username }</Text>
      <Image
        style={ styles.emojiRating }
        source={ ratingImage() }

      />

      <View style={ styles.chip }>
        <Text style={ { color: '#fff' } }>{ rating }</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: normalize(330),
    height: normalize(400),
    borderRadius: 40,
    marginTop: normalize(10),
  },
  cardName: {
    color: '#FF0000',
    fontWeight: 'bold',
    paddingLeft: normalize(20),
    paddingTop: normalize(20),
    fontSize: 40,
  },
  username: { fontSize: 15, color: '#626262' },
  mixText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: normalize(20),
    paddingTop: normalize(10),
  },
  emojiRating: { width: 160, height: 160, alignSelf: 'flex-end', opacity: 0.5 },
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
