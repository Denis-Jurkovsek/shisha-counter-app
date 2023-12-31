import React, {useEffect, useState} from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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

function Login() {
  const [email, setEmail] = useState('');
  const [touched, setTouched] = useState(false);
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  // After register or login, get redirected to the counter screen
  useEffect(() => {
    return auth.onAuthStateChanged(user => {
      if (user) {
        navigation.replace('Counter');
      } else {
        // no users logged in
        SplashScreen.hide();
      }
    });
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
      <View>
        <Text style={styles.title}>
          Counter & <Text style={styles.subTitle}>Mixes</Text>
        </Text>

        <Text style={styles.description}>
          Trag deine Köpfe ein und tausche deine Mixes mit anderen aus!
        </Text>
      </View>

      <View style={styles.loginContainer}>
        <TextInputComponent
          label={'Deine E-Mail'}
          value={email}
          onChangeText={text => setEmail(text)}
          error={isEmail(email) ? null : 'Bitte gib eine gültige E-Mail ein.'}
          touched={touched}
        />
        <TextInputComponent
          label={'Dein Passwort'}
          value={password}
          secureTextEntry
          onChangeText={text => setPassword(text)}
          error={
            isPassword(password)
              ? null
              : 'Dein Passwort muss mindestens 6 Zeichen lang sein, eine Zahl, ein Sonderzeichen und ein Groß-, Kleinbuchstaben enthalten.'
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
        <LinkButton url="https://uniqueware.net/terms">
          <Text style={styles.policyText}>
            Beim Anmelden in der App akzeptieren Sie die Datenschutzbestimmungen
            und die AGB.
          </Text>
        </LinkButton>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  // Containers
  loginContainer: {paddingTop: normalize(50), flex: 1},
  policyContainer: {
    padding: normalize(30),
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    color: '#fff',
    top: normalize(30),
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
  buttonText: {fontSize: 16, color: '#4D4D4D', alignSelf: 'center'},

  // Title
  title: {
    paddingTop: normalize(70),
    color: '#00ffb4',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  subTitle: {
    color: '#fff',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    textAlign: 'center',
    paddingTop: normalize(10),
    paddingLeft: normalize(20),
    paddingRight: normalize(20),
    paddingBottom: normalize(20),
    fontSize: 15,
    color: '#c1c1c1',
  },

  // Policy
  policyText: {color: '#c1c1c1', textAlign: 'center'},
});

export default React.memo(Login);
