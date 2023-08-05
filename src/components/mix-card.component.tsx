
import { collection, doc, getDocs } from 'firebase/firestore/lite';
import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Col, Grid, Row } from 'react-native-easy-grid';
import normalize from 'react-native-normalize';
import { auth, db } from '../../firebase';
import { updateDoc } from "firebase/firestore";

interface IMixCardProps {
  Id: string;
  name: string;
  username: string;
  rating: number;
  flavours: {
    name: string;
    percent: number;
  }[];
  color: string;
  strength: number;
}

const MixCard: React.FC<IMixCardProps> = ({
  Id,
  name,
  username,
  rating,
  flavours,
  color,
  strength
}) => {

  // Get the image of the rating
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

  // Check if the mix name is too long
  if (name.length > 15) {
    name = name.substring(0, 15);
  }


  // Save the mix into firebase userObject
  const saveMix = async () => {
    const userRef = collection(db, 'users');
    const userSnapshot = await getDocs(userRef);
    const userList = userSnapshot.docs.map(doc => doc.data());

    console.log('Save mix ' + userList[0].favorit_mixes);
    console.log(auth.currentUser?.uid);

    // Set the favorit mix
    const userDoc = doc(db, 'users', `${auth.currentUser?.uid}`);

    // Update the favorite mixes array in the user object
    await updateDoc(userDoc, {
      favorit_mixes: [
        ...userList[0].favorit_mixes,
        {
          author: 'test',
          Id: 2
        },
      ],
    });

  };

  return (
    <View style={ {
      ...styles.card,
      backgroundColor: `${color}20`,
    } }>
      <Grid>

        <Row size={ 0.2 } style={ {
          display: 'flex',
          justifyContent: 'flex-end',
          marginTop: normalize(10),
          marginRight: normalize(20),
        } }>
          <Pressable style={ styles.chip }
            onPress={
              () => saveMix()
            }>
            <Grid>
              <Image
                source={ require('../assets/img/hearth_icon.png') }
                style={ {
                  width: 15,
                  height: 15,
                  marginTop: normalize(4),
                  marginRight: normalize(2),
                } }
              />
              <Text style={ {
                ...styles.username,
                paddingTop: normalize(2),
              } }>Save</Text>
            </Grid>
          </Pressable>
        </Row>

        <Row size={ 1 }>
          <Text style={ {
            ...styles.cardName,
            color: `${color}`,
          } }>

            { name }
            {
              name.length > 15 ? '...' : ''
            }

          </Text>
        </Row>

        <Col size={ 1.5 }>
          { flavours.map((flavour) => {
            return (
              <Row>
                <Text style={ styles.mixText } key={ flavour.name }>
                  { flavour.percent }% { flavour.name }
                </Text>
              </Row>
            );
          })
          }
        </Col>

        <Row size={ 0.5 }>
          <View style={ {
            width: normalize(20),
            height: normalize(50),
            borderRadius: 100,
            backgroundColor: '#fff',
            marginLeft: normalize(20),
          } }>
          </View>

          <Col>
            <Text
              style={ {
                fontWeight: 'bold',
                color: '#fff',
                paddingLeft: normalize(5),
                paddingTop: normalize(8),
                fontSize: 15,
              } }
            >
              Stärke
            </Text>

            <Text style={ {
              color: '#fff',
              paddingLeft: normalize(5),
              fontSize: 15,
            } }>
              { strength }/10
            </Text>
          </Col>

        </Row>

        <Row size={ 1 } style={ {
          display: 'flex',
          justifyContent: 'flex-end',
        } }>
          <Image
            style={ styles.emojiRating }
            source={ ratingImage() }
          />
        </Row>

        <Row size={ 0.5 }>
          <Text style={ {
            ...styles.username,
            paddingLeft: normalize(20),
          } }>Mixed by @{ username }</Text>
        </Row>
      </Grid>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: normalize(330),
    height: normalize(330),
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
  },
  emojiRating: {
    width: 180, height: 180, alignSelf: 'flex-end', opacity: 0.5, resizeMode: 'contain',
  },
  chip: {
    backgroundColor: '#fff',
    width: 70,
    height: 25,
    marginTop: 5,
    borderRadius: 20,
    alignItems: 'center',
  },
});

export default MixCard;
