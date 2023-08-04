import React, {useEffect, useState} from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import normalize from 'react-native-normalize/src/index';
import {collection, doc, getDoc, getDocs} from 'firebase/firestore/lite';
import {db} from '../../firebase';
import TobaccoCard from '../components/tobacco-card.component';

const Mix = () => {
  // Get a specific mix
  const [mixData, setMixData] = useState(null);

  useEffect(() => {
    const getMixData = async () => {
      const docRef = doc(db, 'mixes', 'j6tv3wCakqDQ8sWx3fkX');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        console.log('Document data:', data);
        setMixData(data);
      } else {
        console.log('No such document!');
      }
    };

    // get all mixes
    const getMixes = async () => {
      const mixRef = collection(db, 'mixes');
      const mixSnapshot = await getDocs(mixRef);
      const mixList = mixSnapshot.docs.map(doc => doc.data());
      console.log('MIX LIST:', mixList);
    };

    getMixes();
    getMixData();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Discover <Text style={styles.subtitle}>MIXES.</Text>
        </Text>
      </View>

      <TobaccoCard
        mixture={mixData}
        name="Traubmann"
        rating={'sd‚'}
        username="jade.hookah"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(20),
    backgroundColor: '#262626',
  },
  textContainer: {
    padding: normalize(20),
  },
  title: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    paddingTop: normalize(50),
  },
  subtitle: {
    color: '#00ffb4',
    fontSize: 40,
    fontWeight: 'bold',
  },
  whiteText: {
    color: '#fff',
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

  chip: {
    backgroundColor: '#4D4D4D',
    width: 100,
    height: 25,
    marginTop: normalize(10),
    marginLeft: normalize(20),
    borderRadius: 10,
    alignItems: 'center',
  },

  // Cards
  mixContainer: {
    padding: normalize(15),
  },

  // Input
  flavourBackground: {
    width: 250,
    height: 40,
    backgroundColor: '#333333',
    borderRadius: 10,
    marginTop: normalize(15),
  },

  // Modal
  centeredView: {
    height: '100%',
    backgroundColor: '#333',
    justifyContent: 'center',
  },
  modalView: {
    height: 500,
    margin: normalize(20),
    backgroundColor: '#23262B',
    borderRadius: 20,
    padding: normalize(35),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontSize: 25,
    textAlign: 'center',
    color: '#fff',
    fontWeight: '600',
  },
  emoji: {width: 80, height: 80, alignSelf: 'center'},
  favText: {
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: normalize(20),
    fontSize: 17,
  },
  discoverText: {
    paddingTop: normalize(10),
    fontWeight: 'bold',
    color: '#00ffb4',
    marginLeft: normalize(20),
    fontSize: 17,
  },
});

export default Mix;
