import React, {Component, useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {auth, db} from '../../firebase';
import {getDoc, doc, setDoc} from 'firebase/firestore/lite';

import normalize from 'react-native-normalize';
import {Row, Grid} from 'react-native-easy-grid';

const styles = StyleSheet.create({
  bg: {flex: 1, alignItems: 'center', backgroundColor: '#333'},
  height: {height: 100},

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

const backgroundImage = {
  uri: 'https://shop.kvze.studio/media/d5/0d/f7/1635945163/STEELOHNESCHLAUCHOhne-Schlauch-8.png',
};

class Counter extends Component {
  // Todo Loading after set the counter being offline
  // Todo Orientation lock
  // Todo SafeAreaView

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
    this.getDocument()
      .then(data => {
        this.setState({counter: data.count, loading: false});
      })
      .catch(() => {
        // Create data for the first time
        this.setData();
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
    this.setState({counter: this.state.counter + 1});
  };

  // Function to subtract one from the counter
  removeCount = () => {
    if (this.state.counter > 0) {
      this.setState({counter: this.state.counter - 1});
    }
  };

  // Function to reset the counter
  // TODO: Add if-condition: If the user want really to reset his counter.
  resetCount = () => {
    if (this.state.counter > 0) {
      this.setState({counter: 0});
    }
  };

  // Function to sign out
  handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        this.props.navigation.replace('Login');
      })
      .catch(error => alert(error.message));
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
            source={backgroundImage}
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
                <Text style={styles.counterText}>Pfeifen</Text>
              </View>
            </Row>

            <Row size={10} style={styles.center}>
              <TouchableOpacity style={styles.button}>
                <Text onPress={this.removeCount} style={styles.white}>
                  Remove
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text onPress={this.resetCount} style={styles.white}>
                  Reset
                </Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.button}>
                <Text onPress={this.addCount} style={styles.white}>
                  Add
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
