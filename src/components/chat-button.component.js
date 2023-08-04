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
        source={require('../assets/img/chat_icon.png')}
        style={{width: 30, height: 30}}
      />
    </TouchableOpacity>
  );
};

export default ChatButtonComponent;
