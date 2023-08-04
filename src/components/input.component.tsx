import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import normalize from 'react-native-normalize/src/index';
import {TextInputProps} from 'react-native';

interface ITextAreaComponentProps extends TextInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  disabled?: boolean;
  onPress?: () => void;
  touched?: boolean | undefined;
  error?:
    | string
    | string[]
    | undefined;
  returnKeyType?: 'done' | 'next' | 'search' | 'go' | 'send';
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  onSubmit?: () => void;
}

export const TextInputComponent = React.memo(
  (props: ITextAreaComponentProps) => {
    return (
      <View style={[styles.marginBottom]}>
        <View
          style={[
            styles.fillWidth,
            styles.bgLightGrey,
            styles.borderRadiusPrimary,
            {
              paddingLeft: normalize(5),
              paddingTop: normalize(5),
              height: 50,
            },
          ]}>
          <Text
            style={{
              fontSize: styles.fontTiny.fontSize,
              paddingRight: 5,
              marginLeft: 7,
              paddingTop: 2,
              color: styles.colorHint.color,
            }}>
            {props.label}
          </Text>
          <TextInput
            value={props.value}
            onChangeText={props.onChangeText}
            onSubmitEditing={props.onSubmit}
            maxLength={props.maxLength}
            textBreakStrategy={'highQuality'}
            {...props}
            style={[
              {
                flex: 1,
                paddingLeft: 10,
              },
              styles.colorWhite,
            ]}
          />
        </View>

        {props.error && props.touched && (
          <Text style={[styles.fontTiny, styles.marginLeft, styles.colorError]}>
            {props.error}
          </Text>
        )}
      </View>
    );
  },
);

const styles = StyleSheet.create({
  marginBottom: {
    marginBottom: 10,
  },
  marginLeft: {
    marginLeft: 10,
  },
  fontTiny: {
    fontSize: normalize(12),
  },
  colorSuccess: {
    color: '#00b300',
  },
  colorError: {
    color: '#ff0000',
  },
  colorHint: {
    color: '#9e9e9e',
  },
  fillWidth: {
    width: '100%',
  },
  bgLightGrey: {
    backgroundColor: '#242424',
  },
  borderRadiusPrimary: {
    borderRadius: 5,
  },
  colorWhite: {
    color: '#fff',
  },
});
