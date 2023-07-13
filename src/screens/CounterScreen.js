import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
  Alert,
  SafeAreaView,
} from 'react-native';
import {auth, db} from '../../firebase';
import {getDoc, doc, setDoc} from 'firebase/firestore/lite';
import normalize from 'react-native-normalize';
import {Row, Grid} from 'react-native-easy-grid';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import {DialogComponent} from '../components/dialog.component';

class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      counter: 0,
      dialogVisible: false,
      user: auth.currentUser,
      uuid: auth.currentUser.uid,
      loading: true,
    };
  }

  // If the component updates, call setData
  componentDidUpdate(prevProps, prevState, snapshot) {
    this.setData();
  }

  // If the component mounts, call getDocument
  componentDidMount() {
    NetInfo.fetch().then(state => {
      if (state.isConnected >= true) {
        this.getDocument()
          .then(data => {
            this.setState({counter: data.count, loading: false});

            SplashScreen.hide();
          })
          .catch(() => {
            // Create data if no document exists
            this.setData();
            SplashScreen.hide();

            // Prompt to enter how many hookahs the user already smoked
            this.setState({dialogVisible: true});
          });
      } else {
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

  // Function to count up
  addCount = () => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected >= true) {
        this.setState({counter: this.state.counter + 1});
      } else {
        Alert.alert(
          'Internet Verbindung',
          'Sie benötigen Internet um die App nutzen zu können.',
        );
      }
    });
  };

  // Function to set the counter to a specific number
  setCount = count => {
    if (count === undefined || count === null) {
      this.setCount(0);
      this.setState({dialogVisible: false});
      return;
    }

    // Check if the input is a number
    if (!this.isNumber(count)) {
      Alert.alert('Fehler', 'Bitte geben Sie nur Zahlen ein!');
      return;
    }

    NetInfo.fetch().then(async state => {
      if (state.isConnected >= true) {
        this.setState({counter: +count});
        this.setState({dialogVisible: false});
      } else {
        Alert.alert(
          'Internet Verbindung',
          'Sie benötigen Internet um die App nutzen zu können.',
        );
      }
    });
  };

  // Function to count down
  removeCount = () => {
    NetInfo.fetch().then(async state => {
      if (state.isConnected >= true) {
        if (this.state.counter > 0) {
          this.setState({counter: this.state.counter - 1});
        }
      } else {
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

  // Check if string only contains numbers
  isNumber = str => {
    return /^\d+$/.test(str);
  };

  render() {
    return (
      <View style={[styles.bg]}>
        <DialogComponent
          visible={this.state.dialogVisible}
          onClose={() => this.setState({dialogVisible: false})}
          onConfirm={e => {
            this.setCount(e);
          }}
        />

        <Grid>
          <ImageBackground
            source={require('../assets/img/counter-bg.png')}
            style={styles.backgroundImage}
            imageStyle={styles.imageStyle}>
            <SafeAreaView style={{flex: 1}}>
              <TouchableOpacity
                style={styles.resetButton}
                onPress={this.resetCount}>
                <Text style={styles.buttonText}>Counter Zurücksetzen</Text>
              </TouchableOpacity>

              <Row size={45} style={styles.center}>
                <View style={styles.height}>
                  <Text style={styles.title}>Der Jade Kopf</Text>
                  <Text style={styles.subTitle}>COUNTER</Text>
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
                  <Text
                    onPress={() => this.props.navigation.navigate('Mix')}
                    style={styles.primary}>
                    Mixes
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.button}>
                  <Text onPress={this.addCount} style={styles.white}>
                    +1 Kopf
                  </Text>
                </TouchableOpacity>
              </Row>
            </SafeAreaView>
          </ImageBackground>
        </Grid>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bg: {flex: 1, alignItems: 'center', backgroundColor: '#333'},
  height: {height: '100%'},

  // Colors
  grey: {
    color: '#c1c1c1',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
  },
  white: {color: '#fff', fontWeight: 'bold', fontSize: 18},
  primary: {color: '#00ffb4', fontWeight: 'bold', fontSize: 18},

  // Positioning
  center: {justifyContent: 'center'},
  left: {justifyContent: 'flex-start'},

  // Title
  title: {
    color: '#00ffb4',
    fontSize: 35,
    fontWeight: 'bold',
    top: normalize(65),
    textAlign: 'center',
  },
  subTitle: {
    color: '#fff',
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: normalize(60),
    textAlign: 'center',
  },

  // Counter
  counter: {
    color: '#00ffb4',
    fontSize: 100,
    fontWeight: 'bold',
    bottom: normalize(70),
  },
  counterText: {
    textAlign: 'center',
    color: '#c1c1c1',
    fontSize: 22,
    fontWeight: 'bold',
    bottom: normalize(85),
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
    height: normalize(450),
    width: normalize(500),
    top: normalize(250),
    left: normalize(-150),
    opacity: 0.2,
  },

  // Button
  button: {paddingLeft: normalize(30), paddingRight: normalize(30)},
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  resetButton: {
    marginTop: normalize(20),
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
  },
});

export default Counter;
