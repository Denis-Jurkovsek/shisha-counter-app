import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {SafeAreaView} from 'react-native-safe-area-context';
import {db} from '../../firebase';
import {getDoc, doc} from 'firebase/firestore/lite';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);

  // get chatgpt response
  const getResponse = async message => {
    const docRef = doc(db, 'chatgpt', 'qhLgP3zcfeYVve55pPuM');
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      return docSnap.data();
    } else {
      console.log('No such document!');
    }
  };

  useEffect(() => {
    // get response
    getResponse().then(data => {
      setMessages([
        {
          _id: 1,
          text: data.response,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: 'Shisha Bot',
            avatar: '',
          },
        },
      ]);
    });
  }, []);

  console.log(getResponse());

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
          name: 'Deno D',
        }}
        placeholder="Frag mich alles zum Thema Shisha!"
        showUserAvatar={true}
        alwaysShowSend={true}
        scrollToBottom={true}
        inverted={true}
        renderUsernameOnMessage={true}
        isTyping={false}
        alignTop={true}
      />
    </SafeAreaView>
  );
};
export default ChatScreen;
