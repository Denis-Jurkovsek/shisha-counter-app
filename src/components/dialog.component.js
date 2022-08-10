import React from 'react';
import Dialog from 'react-native-dialog';
import {View} from 'react-native';

export const DialogComponent = props => {
  const {visible, onConfirm, onClose} = props;
  const [input, setInput] = React.useState('');

  return (
    <View>
      <Dialog.Container visible={visible} onBackdropPress={onConfirm}>
        <Dialog.Title>Köpfe geraucht</Dialog.Title>
        <Dialog.Description>
          Wie viele Köpfe hast du du bereits geraucht?
        </Dialog.Description>
        <Dialog.Input
          keyboardType={'number-pad'}
          onChangeText={input => setInput(input)}
          value={input}
          placeholder={'Köpfe'}
        />
        <Dialog.Button label="Cancel" onPress={onClose} />
        <Dialog.Button label="Weiter" onPress={() => onConfirm(input)} />
      </Dialog.Container>
    </View>
  );
};
