import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  Button,
  Platform,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithCredential,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {auth} from '../../firebase';
import {useNavigation} from '@react-navigation/native';
import {Row, Grid} from 'react-native-easy-grid';
import normalize from 'react-native-normalize';
import Icon from 'react-native-vector-icons/AntDesign';
import LinkButton from '../components/link-button.component';
import firebase from 'firebase/compat';

const styles = StyleSheet.create({
  // Containers
  loginContainer: {padding: normalize(20)},
  policyContainer: {
    padding: normalize(30),
    justifyContent: 'center',
    textAlign: 'center',
    color: '#fff',
  },
  container: {padding: normalize(20), flex: 1, backgroundColor: '#333'},

  // Login & Register Buttons
  button: {
    elevation: 8,
    backgroundColor: '#00ffb3',
    borderRadius: 15,
    paddingVertical: normalize(18),
    margin: normalize(10),
  },
  buttonApple: {
    elevation: 8,
    backgroundColor: '#09101D',
    borderRadius: 15,
    paddingVertical: normalize(18),
    margin: normalize(10),
  },
  buttonGoogle: {
    elevation: 8,
    backgroundColor: '#5384EC',
    borderRadius: 15,
    paddingVertical: normalize(18),
    margin: normalize(10),
  },
  buttonText: {fontSize: 15, color: '#fff', alignSelf: 'center'},
  input: {
    height: normalize(55),
    margin: normalize(12),
    borderWidth: 1,
    padding: normalize(10),
    color: '#fff',
    borderColor: '#fff',
    borderRadius: 10,
  },

  // Logo
  logoContainer: {paddingTop: normalize(50), paddingBottom: normalize(10)},
  logo: {width: normalize(50), height: normalize(50), left: normalize(35)},
  logoText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    left: normalize(95),
    top: normalize(7),
  },

  // ---- OR ----
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: normalize(35),
    paddingRight: normalize(35),
  },
  orStyle: {flex: 1, height: 1, backgroundColor: '#fff'},
  orText: {
    width: normalize(50),
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold',
    marginLeft: 5,
    marginRight: 5,
  },
  lineStyle: {flex: 1, height: 1, backgroundColor: '#fff'},

  // Policy
  policyText: {color: '#c1c1c1', textAlign: 'center'},
});

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // After register or login, get redirected to the counter screen
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Counter');
      }
    });
    return unsubscribe;
  }, []);

  // function to sign up the user
  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Registered with: ', user.email);
      })
      .catch(error => alert(error.message));
  };

  // function to sign the user in
  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log('Logged in with: ', user.email);
      })
      .catch(error => alert(error.message));
  };

  // Google SSO
  const signInWithGoogle = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.logoContainer}>
        <Row>
          <Image
            style={styles.logo}
            source={require('../assets/img/logo.png')}
          />
        </Row>
        <Text style={styles.logoText}>Sign up</Text>
      </View>

      <View style={styles.loginContainer}>
        <TextInput
          style={styles.input}
          onChangeText={text => setEmail(text)}
          placeholder="Enter your email"
          placeholderTextColor="white"
          value={email}
        />
        <TextInput
          style={styles.input}
          onChangeText={text => setPassword(text)}
          placeholder="Enter your password"
          placeholderTextColor="white"
          value={password}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.orContainer}>
        <View style={styles.orStyle} />
        <View>
          <Text style={styles.orText}>OR</Text>
        </View>
        <View style={styles.lineStyle} />
      </View>

      <View style={styles.loginContainer}>
        <TouchableOpacity style={styles.buttonApple}>
          <Text style={styles.buttonText}>
            <Icon name="apple1" size={17} /> Continue with Apple
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.buttonGoogle}
          onPress={signInWithGoogle}>
          <Text style={styles.buttonText}>
            <Icon name="google" size={17} /> Continue with Google
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.policyContainer}>
        <LinkButton url="https://www.jade-hookah.de/impressum">
          <Text style={styles.policyText}>
            You accept the conditions and privacy policy by login into the app.
          </Text>
        </LinkButton>
      </View>
    </SafeAreaView>
  );
}

export default React.memo(Login);
