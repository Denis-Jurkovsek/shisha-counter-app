import {SingleSignOnService} from './sso.class';
import {authorize} from 'react-native-app-auth';
import jwt_decode from 'jwt-decode';
import {loginAccount} from 'hooks/api/auth.api.hook';
import {Alert} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {Screens} from 'navigation/screens.list';
import {showToast} from 'classes/utils/toast.class';
import {LeftRightSlideAnimation} from 'navigation/animations/right-left.animations';

export class GoogleSsoClass implements SingleSignOnService {
  config = {
    issuer: 'https://accounts.google.com',
    clientId:
      '27272436575-60g28t4vi0oigr4d9f1bnfq7l9b5m53i.apps.googleusercontent.com',
    redirectUrl:
      // eslint-disable-next-line max-len
      'com.googleusercontent.apps.27272436575-60g28t4vi0oigr4d9f1bnfq7l9b5m53i:/oauth2redirect/google',
    scopes: ['openid', 'profile', 'email'],
  };

  async singeSignOnLogin(
    appStore: any,
    userStore: any,
    i18n: any,
    componentId: string,
  ): Promise<void> {
    appStore.setLoading(true);

    try {
      const result = await authorize(this.config);
      const {idToken} = result;
      const jwtDecode: any = jwt_decode(idToken);

      i18n.changeLanguage(jwtDecode.locale).then(() => {
        this.userLogin(
          jwtDecode.email,
          jwtDecode.name,
          idToken,
          componentId,
          appStore,
          userStore,
        );
      });
    } catch (error) {
      appStore.setLoading(false);
    }
  }

  userLogin(
    email: string,
    name: string,
    token: string,
    componentId: string,
    appStore: any,
    userStore: any,
  ): void {
    loginAccount(token, email, name)
      /**
       *
       */
      .then(res => {
        let {data} = res.data;

        if (data.device.blocked) {
          /**
           *
           */
          Alert.alert('Blocked Device', 'Please contact us');
          appStore.setLoading(false);
        } else {
          try {
            /**
             *
             */
            userStore.login(data);
            appStore.setLoading(false);

            Navigation.showModal({
              component: {
                name: Screens.OUTSIDE.SUCCESS,
              },
            });
          } catch (err) {
            console.error(err);
          }
        }
      })
      .catch(err => {
        /**
         *
         */
        appStore.setLoading(false);

        if (err.response !== undefined) {
          if (err.response.status === 409) {
            Navigation.setRoot({
              root: {
                component: {
                  name: Screens.OUTSIDE.SETUP,
                  passProps: {
                    name,
                    email,
                    idToken: token,
                  },
                  options: {
                    animations: LeftRightSlideAnimation(),
                  },
                },
              },
            });
          }
        } else {
          showToast('Cant connect to server!');
        }
      });
  }
}
