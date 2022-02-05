import React from 'react';
import {TouchableOpacity, Text, Linking} from 'react-native';

const LinkButton = props => {
  const {url, children = {}} = props;

  const onPress = () =>
    Linking.canOpenURL(url).then(() => {
      Linking.openURL(url);
    });

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{textAlign: 'center'}}>{children}</Text>
    </TouchableOpacity>
  );
};

export default LinkButton;
