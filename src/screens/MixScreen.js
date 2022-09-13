import React, {Component, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import normalize from 'react-native-normalize/src/index';
import TobaccoCard from '../components/tobacco-card.component';
import {Col, Grid, Row} from 'react-native-easy-grid';
import FavoriteCard from '../components/favorit-card.component';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: normalize(20),
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

const Mix = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <ScrollView style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          Community <Text style={styles.subtitle}>MIXES.</Text>
        </Text>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity onPress={() => setModalVisible(!modalVisible)}>
              <Image
                style={{
                  width: 20,
                  height: 20,
                  alignSelf: 'flex-end',
                }}
                source={require('../assets/img/close_icon.png')}
              />
            </TouchableOpacity>
            <Text style={styles.modalText}>Doppel Pynkman</Text>
            <Text style={{fontSize: 20, color: '#808080', textAlign: 'center'}}>
              Was ist drin?
            </Text>

            <Grid>
              <Row style={styles.flavourBackground}>
                <Col>
                  <Text
                    style={{
                      fontSize: 25,
                      color: '#00ffb3',
                      fontWeight: 'bold',
                      marginLeft: normalize(15),
                      marginTop: normalize(5),
                    }}>
                    Pynkman
                  </Text>
                </Col>
                <Col>
                  <View style={styles.chip}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>
                      33%
                    </Text>
                  </View>
                </Col>
              </Row>

              <Row style={styles.flavourBackground}>
                <Col>
                  <Text
                    style={{
                      fontSize: 25,
                      color: '#00ffb3',
                      fontWeight: 'bold',
                      marginLeft: normalize(15),
                      marginTop: normalize(5),
                    }}>
                    Pynkman
                  </Text>
                </Col>
                <Col>
                  <View style={styles.chip}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>
                      33%
                    </Text>
                  </View>
                </Col>
              </Row>
              <Row style={styles.flavourBackground}>
                <Col>
                  <Text
                    style={{
                      fontSize: 25,
                      color: '#00ffb3',
                      fontWeight: 'bold',
                      marginLeft: normalize(15),
                      marginTop: normalize(5),
                    }}>
                    Pynkman
                  </Text>
                </Col>
                <Col>
                  <View style={styles.chip}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>
                      33%
                    </Text>
                  </View>
                </Col>
              </Row>
              <Row style={styles.flavourBackground}>
                <Col>
                  <Text
                    style={{
                      fontSize: 25,
                      color: '#00ffb3',
                      fontWeight: 'bold',
                      marginLeft: normalize(15),
                      marginTop: normalize(5),
                    }}>
                    Pynkman
                  </Text>
                </Col>
                <Col>
                  <View style={styles.chip}>
                    <Text
                      style={{
                        fontSize: 20,
                        color: '#fff',
                        fontWeight: 'bold',
                      }}>
                      33%
                    </Text>
                  </View>
                </Col>
              </Row>
            </Grid>

            <Image
              style={styles.emoji}
              source={require('../assets/img/emoji_4.png')}
            />

            <TouchableOpacity style={styles.button}>
              <Text style={styles.textStyle}>
                Mark as favourite
                <Image
                  style={{width: 15, height: 15}}
                  source={require('../assets/img/hearth_icon.png')}
                />
              </Text>
            </TouchableOpacity>

            <Text style={{textAlign: 'center', color: '#808080'}}>
              Created by <Text style={{fontWeight: 'bold'}}>@username</Text>
            </Text>
          </View>
        </View>
      </Modal>

      <Grid>
        <Text style={styles.favText}>Favorites</Text>
        <Row>
          <Col>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <FavoriteCard />
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <FavoriteCard />
            </TouchableOpacity>
          </Col>
        </Row>
        <Text style={styles.discoverText}>Discover</Text>
        <Row>
          <Col>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TobaccoCard />
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TobaccoCard />
            </TouchableOpacity>
          </Col>
        </Row>
        <Row>
          <Col>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TobaccoCard />
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TobaccoCard />
            </TouchableOpacity>
          </Col>
        </Row>
        <Row>
          <Col>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TobaccoCard />
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TobaccoCard />
            </TouchableOpacity>
          </Col>
        </Row>
        <Row>
          <Col>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TobaccoCard />
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TobaccoCard />
            </TouchableOpacity>
          </Col>
        </Row>
        <Row style={{paddingBottom: normalize(100)}}>
          <Col>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TobaccoCard />
            </TouchableOpacity>
          </Col>
          <Col>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <TobaccoCard />
            </TouchableOpacity>
          </Col>
        </Row>
      </Grid>
    </ScrollView>
  );
};

export default Mix;
