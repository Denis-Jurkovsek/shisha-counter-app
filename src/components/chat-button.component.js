import {Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const ChatButtonComponent = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('Chat');
      }}>
      <Image
        source={require('../assets/img/chat.png')}
        style={{width: 50, height: 50}}
      />
    </TouchableOpacity>
  );
};

export default ChatButtonComponent;
