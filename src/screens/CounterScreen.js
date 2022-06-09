import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from 'react-native';
import {auth, db} from '../../firebase';
import {getDoc, doc, setDoc} from 'firebase/firestore/lite';
import normalize from 'react-native-normalize';
import {Row, Grid} from 'react-native-easy-grid';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';

const styles = StyleSheet.create({
  bg: {flex: 1, alignItems: 'center', backgroundColor: '#333'},
  height: {height: '100%'},

  // Colors
  grey: {color: '#c1c1c1'},
  white: {color: '#fff', fontWeight: 'bold', fontSize: 18},

  // Positioning
  center: {justifyContent: 'center'},
  left: {justifyContent: 'flex-start'},

  // Title
  title: {
    color: '#00ffb4',
    fontSize: 35,
    fontWeight: 'bold',
    top: normalize(65),
  },
  subTitle: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: normalize(60),
  },

  // Counter
  counter: {color: '#00ffb4', fontSize: 100, fontWeight: 'bold'},
  counterText: {
    color: '#c1c1c1',
    fontSize: 20,
    fontWeight: 'bold',
    bottom: normalize(10),
  },

  // Background Image
  backgroundImage: {
    width: '100%',
    height: '100%',
    padding: normalize(50),
    paddingVertical: 0,
    overflow: 'hidden',
  },
  imageStyle: {
    resizeMode: 'cover',
    height: normalize(800),
    top: normalize(120),
    left: normalize(-110),
    opacity: 0.4,
  },

  // Button
  button: {paddingLeft: normalize(30), paddingRight: normalize(30)},
});

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      user: auth.currentUser,
      uuid: auth.currentUser.uid,
      loading: true,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    this.setData();
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
      if (state.isConnected >= true) {
        this.getDocument()
          .then(data => {
            this.setState({counter: data.count, loading: false});

            SplashScreen.hide();
          })
          .catch(() => {
            // Create data for the first time
            this.setData();

            SplashScreen.hide();
          });
      } else {
        // Replace maybe to a redirect or something
        Alert.alert(
          'Internet Verbindung',
          'Sie benötigen Internet um die App nutzen zu können.',
        );
      }
    });
  }

  // Getting the document data of one UUID
  getDocument = async () => {
    const docRef = doc(db, 'counters', this.state.uuid);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      return null;
    }
  };

  // If no document with the uuid exists, create new. If one exists update this document
  setData = async () => {
    setDoc(doc(db, 'counters', this.state.uuid), {
      count: this.state.counter,
      uuid: this.state.uuid,
    });
  };

  // Function to add plus one to the counter
  addCount = () => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected >= true) {
        this.setState({counter: this.state.counter + 1});
      } else {
        // Replace maybe to a redirect or something
        Alert.alert(
          'Internet Verbindung',
          'Sie benötigen Internet um die App nutzen zu können.',
        );
      }
    });
  };

  // Function to subtract one from the counter
  removeCount = () => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected >= true) {
        if (this.state.counter > 0) {
          this.setState({counter: this.state.counter - 1});
        }
      } else {
        // Replace maybe to a redirect or something
        Alert.alert(
          'Internet Verbindung',
          'Sie benötigen Internet um die App nutzen zu können.',
        );
      }
    });
  };

  // Function to reset the counter
  resetCount = () => {
    Alert.alert(
      'Counter zurücksetzen?',
      'Es ist nicht möglich den Counter danach wiederherzustellen!',
      [
        {
          text: 'Abbrechen',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Zurücksetzen',
          onPress: () => {
            NetInfo.fetch().then(state => {
              if (state.isConnected >= true) {
                if (this.state.counter > 0) {
                  this.setState({counter: 0});
                }
              } else {
                // Replace maybe to a redirect or something
                Alert.alert(
                  'Internet Verbindung',
                  'Sie benötigen Internet um die App nutzen zu können.',
                );
              }
            });
          },
        },
      ],
    );
  };

  // Function to sign out
  handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.replace('Login');
      })
      .catch(error => {
        Alert.alert(
          'Fehler',
          'Es ist ein Fehler aufgetreten, versuchen Sie es erneut.',
        );
      });
  };

  // Get the current date
  day = new Date().getDate();
  month = new Date().getMonth() + 1;
  fullMonth = this.month.toString().padStart(2, '0');
  year = new Date().getFullYear();

  render() {
    return (
      <View style={[styles.bg]}>
        <Grid>
          <ImageBackground
            source={require('../assets/hookah.png')}
            style={styles.backgroundImage}
            imageStyle={styles.imageStyle}>
            <Row size={45} style={styles.left}>
              <View style={styles.height}>
                <Text style={styles.title}>Jade Hookah</Text>
                <Text style={styles.subTitle}>Shisha Counter</Text>
                <Text style={styles.grey}>
                  {this.day}.{this.fullMonth}.{this.year}
                </Text>
              </View>
            </Row>

            <Row size={45} style={styles.center}>
              <View>
                <Text style={styles.counter}>{this.state.counter}</Text>
                <Text style={styles.counterText}>Köpfe</Text>
              </View>
            </Row>

            <Row size={10} style={styles.center}>
              <TouchableOpacity style={styles.button}>
                <Text onPress={this.removeCount} style={styles.white}>
                  -1 Kopf
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text onPress={this.resetCount} style={styles.white}>
                  Zurücksetzen
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text onPress={this.addCount} style={styles.white}>
                  +1 Kopf
                </Text>
              </TouchableOpacity>
            </Row>
          </ImageBackground>
        </Grid>
      </View>
    );
  }
}

export default Counter;
