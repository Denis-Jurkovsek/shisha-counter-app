import React, {useCallback, useEffect, useState} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {SafeAreaView} from 'react-native-safe-area-context';
import {db} from '../../firebase';
import {getDoc, doc, setDoc} from 'firebase/firestore/lite';

const ChatScreen = () => {
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);

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
          text: 'Hallo, ich bin Shisha AI. Frag mich alles zum Thema Shisha!',
          createdAt: new Date(),
          quickReplies: {
            type: 'radio', // or 'checkbox',
            keepIt: true,
            values: [
              {
                title: 'Mix mir was',
                value: 'Mix mir was',
              },
              {
                title: 'Wie viel kostet eine Shisha?',
                value: 'Wie viel kostet eine Shisha?',
              },
            ],
          },
          user: {
            _id: 2,
            name: 'Shisha AI',
            avatar: '',
          },
        },
      ]);
    });
  }, []);

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages),
    );

    // send the message to chatgpt
    const docRef = doc(db, 'chatgpt', 'qhLgP3zcfeYVve55pPuM');
    setDoc(docRef, {
      prompt: messages[0].text,
    });

    // get response
    // wait 5 seconds for the response

    setTyping(true);

    setTimeout(() => {
      setTyping(false);
      getResponse().then(data => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, [
            {
              _id: Math.round(Math.random() * 1000000),
              text: data.response,
              createdAt: new Date(),
              user: {
                _id: 2,
                name: 'Shisha AI',
                avatar: '',
              },
            },
          ]),
        );
      });
    }, 10000);
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#333'}}>
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
        isTyping={typing}
        alignTop={true}
      />
    </SafeAreaView>
  );
};
export default ChatScreen;
