import {
  FirebaseAuthApplicationVerifier,
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from 'expo-firebase-recaptcha';
import * as React from 'react';
import { Alert, ScrollView, StyleSheet, StyleProp, TextStyle } from 'react-native';

import HeadingText from '../components/HeadingText';
import ListButton from '../components/ListButton';

const firebaseConfig = {
  apiKey: 'AIzaSyDKP919EwHK1U3Q1bgJdQEwZCHs_z6lEK4',
  authDomain: 'expo-firebase-demo.firebaseapp.com',
  databaseURL: 'https://expo-firebase-demo.firebaseio.com',
  projectId: 'expo-firebase-demo',
  storageBucket: 'expo-firebase-demo.appspot.com',
  messagingSenderId: '192261076942',
  appId: '1:192261076942:web:0bc88d1971ffb0c1359d9f',
  measurementId: 'G-10P86NHER4',
};

interface State {
  title?: string;
  cancelLabel?: string;
  invisible: boolean;
  firebaseConfig?: any;
  inProgress: boolean;
  textStyle?: StyleProp<TextStyle>;
  linkStyle?: StyleProp<TextStyle>;
}

export default class FirebaseRecaptchaScreen extends React.Component<object, State> {
  static navigationOptions = {
    title: 'FirebaseRecaptcha',
  };

  state: State = {
    firebaseConfig,
    invisible: false,
    inProgress: false,
    textStyle: undefined,
    linkStyle: undefined,
  };

  recaptchaVerifier: FirebaseAuthApplicationVerifier | null = null;

  render() {
    const {
      title,
      cancelLabel,
      invisible,
      firebaseConfig,
      inProgress,
      textStyle,
      linkStyle,
    } = this.state;
    const modalProps: any = {
      ...(title && { title }),
      ...(cancelLabel && { cancelLabel }),
      ...(firebaseConfig && { firebaseConfig }),
    };
    return (
      <ScrollView style={{ padding: 10 }}>
        <ListButton
          onPress={this.requestRecaptchaToken}
          title={inProgress ? 'Requesting reCAPTCHA token...' : 'Request reCAPTCHA token'}
        />
        <ListButton
          onPress={() => this.setState(state => ({ invisible: !state.invisible }))}
          title={`Toggle invisible reCAPTCHA (${invisible ? 'On' : 'Off'})`}
        />
        <ListButton
          onPress={() =>
            this.setState(state => ({ title: state.title ? undefined : 'Prove you are human!' }))
          }
          title={`Toggle custom title (${title ? 'On' : 'Off'})`}
        />
        <ListButton
          onPress={() =>
            this.setState(state => ({ cancelLabel: state.cancelLabel ? undefined : 'Close' }))
          }
          title={`Toggle custom cancel label (${cancelLabel ? 'On' : 'Off'})`}
        />
        <FirebaseRecaptchaVerifierModal
          ref={ref => (this.recaptchaVerifier = ref)}
          invisible={invisible}
          {...modalProps}
        />

        <HeadingText>reCAPTCHA banner</HeadingText>
        <ListButton
          onPress={() =>
            this.setState(state => ({
              textStyle: state.textStyle ? undefined : styles.invisibleRecaptchaText,
            }))
          }
          title={`Toggle custom banner text-style" (${textStyle ? 'On' : 'Off'})`}
        />
        <ListButton
          onPress={() =>
            this.setState(state => ({
              linkStyle: state.linkStyle ? undefined : styles.invisibleRecaptchaLink,
            }))
          }
          title={`Toggle custom banner link-style" (${linkStyle ? 'On' : 'Off'})`}
        />
        <FirebaseRecaptchaBanner
          style={styles.banner}
          textStyle={textStyle}
          linkStyle={linkStyle}
        />
      </ScrollView>
    );
  }

  private requestRecaptchaToken = async () => {
    this.setState({ inProgress: true });
    try {
      // @ts-ignore
      const token = await this.recaptchaVerifier.verify();
      setTimeout(
        () =>
          Alert.alert('Congratulations, you are not a bot! 🧑', `token: ${token.slice(0, 10)}...`),
        1000
      );
    } catch (e) {
      setTimeout(() => Alert.alert('Error!', e.message), 1000);
    }
    setTimeout(() => this.setState({ inProgress: false }), 1000);
  };
}

const styles = StyleSheet.create({
  banner: {
    marginVertical: 10,
  },
  invisibleRecaptchaText: {
    opacity: 1,
    fontSize: 14,
  },
  invisibleRecaptchaLink: {
    fontWeight: 'bold',
    color: 'purple',
  },
});
