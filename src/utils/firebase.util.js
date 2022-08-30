export const getErrorMessage = errorCode => {
  let message = 'Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut.';

  switch (errorCode) {
    case 'auth/too-many-requests':
      message = 'Zu viele Anfragen, versuchen Sie es später erneut.';
      break;
    case 'auth/wrong-password':
      message = 'Falsches Passwort.';
      break;
    case 'auth/user-not-found':
      message = 'Benutzer nicht gefunden.';
      break;
    case 'auth/user-disabled':
      message = 'Benutzer deaktiviert.';
      break;
    case 'auth/invalid-email':
      message = 'Ungültige E-Mail-Adresse.';
      break;
    case 'auth/email-already-in-use':
      message = 'E-Mail-Adresse bereits in Verwendung.';
      break;
    case 'auth/weak-password':
      message = 'Passwort zu schwach.';
      break;
    default:
      break;
  }

  return message;
};
