import React, {useEffect, useState} from 'react';
import {
  TextInput,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {auth} from '../../firebase';
import {useNavigation} from '@react-navigation/native';
import normalize from 'react-native-normalize';
import LinkButton from '../components/link-button.component';
import SplashScreen from 'react-native-splash-screen';
import {TextInputComponent} from '../components/input.component';
import {isEmail, isPassword} from '../utils/strings.util';
import {getErrorMessage} from '../utils/firebase.util';

const styles = StyleSheet.create({
  // Containers
  loginContainer: {paddingTop: normalize(20), flex: 1},
  policyContainer: {
    padding: normalize(30),
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#fff',
  },
  container: {
    padding: normalize(20),
    height: '100%',
    flex: 1,
    backgroundColor: '#333',
  },

  // Login & Register Buttons
  button: {
    elevation: 8,
    backgroundColor: '#00ffb3',
    borderRadius: 15,
    paddingVertical: normalize(15),
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

  // Logo
  logoContainer: {
    paddingTop: normalize(50),
    paddingBottom: normalize(10),
    paddingHorizontal: normalize(10),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  logo: {
    width: normalize(50),
    height: normalize(50),
  },
  logoText: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlignVertical: 'center',
    alignSelf: 'center',
    marginLeft: normalize(20),
  },

  // Policy
  policyText: {color: '#c1c1c1', textAlign: 'center'},
});

function Login() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // After register or login, get redirected to the counter screen
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Counter');
      } else {
        // no users logged in
        SplashScreen.hide();
      }
    });
    return unsubscribe;
  }, [navigation]);

  const isValid = () => {
    if (!email || !password) {
      return false;
    }
    return isEmail(email);
  };

  // function to sign up the user
  const handleSignUp = () => {
    if (!isValid()) {
      setTouched(true);
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
      })
      .catch(error => {
        let message = getErrorMessage(error.code);

        Alert.alert('Fehler', message);
      });
  };

  // function to sign the user in
  const handleSignIn = () => {
    if (!isValid()) {
      setTouched(true);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
      })
      .catch(error => {
        let message = getErrorMessage(error.code);

        Alert.alert('Fehler', message);
      });
  };

  return (
    <ScrollView
      bounces={false}
      automaticallyAdjustsScrollIndicatorInsets={true}
      style={styles.container}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require('../assets/img/logo.png')} />
        <Text style={styles.logoText}>Shisha Counter</Text>
      </View>

      <View style={styles.loginContainer}>
        <TextInputComponent
          label={'Ihre E-Mail'}
          value={email}
          onChangeText={text => setEmail(text)}
          error={
            isEmail(email) ? null : 'Bitte geben Sie eine gültige E-Mail ein.'
          }
          touched={touched}
        />
        <TextInputComponent
          label={'Ihr Passwort'}
          value={password}
          secureTextEntry
          onChangeText={text => setPassword(text)}
          error={
            isPassword(password)
              ? null
              : 'Ihr Passwort muss mindestens 6 Zeichen lang sein, eine Zahl, ein Sonderzeichen und ein Groß-, Kleinbuchstaben enthalten.'
          }
          touched={touched}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Anmelden</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Registieren</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.policyContainer}>
        <LinkButton url="https://www.jade-hookah.de/impressum">
          <Text style={styles.policyText}>
            Beim Anmelden in der App akzeptieren Sie die Datenschutzbestimmungen
            und die AGBs!
          </Text>
        </LinkButton>
      </View>
    </ScrollView>
  );
}

export default React.memo(Login);
