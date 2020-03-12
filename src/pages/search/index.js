import React, {Component, Fragment} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  ScrollView,
  Button,
  StatusBar,
  Clipboard,
  Platform,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import Icon from 'react-native-vector-icons/FontAwesome';

import axios from '../../api/api';
import firebase, {RNFirebase} from 'react-native-firebase';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default class Search extends Component {
  state = {
    search: '',
    firebase_messaging_token: '',
    firebase_messaging_message: '',
    firebase_notification: '',
    firebase_send: '',
  };

  changeValueSearch = s => {
    this.setState({search: s});
  };
  pegaDados = () => {
    axios
      .get(
        `https://pokeapi.co/api/v2/pokemon/${this.state.search.toLowerCase()}`,
      )
      .then(data => {
        console.log(data),
          this.props.navigation.navigate('Dex', {
            data: data,
          });
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const {search} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}> Pesquisar Pokémon</Text>

        <View style={styles.containerSearch}>
          <TextInput
            style={styles.input}
            value={search}
            onChange={e => {
              this.changeValueSearch(e.nativeEvent.text);
            }}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              this.pegaDados();
            }}>
            <Icon name={'search'} size={30} style={styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f00',
  },
  title: {
    alignSelf: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    marginTop: 10,
  },
  containerSearch: {
    marginTop: 20,
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  input: {
    flex: 1,
    backgroundColor: '#fff',
    marginRight: 30,
  },
  button: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
  },
  icon: {
    alignSelf: 'center',
  },
  buttonText: {
    alignSelf: 'center',
  },
});
