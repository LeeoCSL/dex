import React, {Component} from 'react';
import {Text, View} from 'react-native';

import axios from '../../api/api';

export default class Ability extends Component {
  state = {
    abilityUrl: '',
    dataHab: '',
  };

  static navigationOptions = ({ navigation }) => ({
    title: `${navigation.state.params.title}`,
     
    });

  componentDidMount() {
    this.setState({abilityUrl: this.props.navigation.state.params.link}, () => {
      console.log(this.state.abilityUrl);
    });
    const link = this.props.navigation.state.params.link;
    axios
      .get(link)
      .then(data => {
        this.setState({dataHab: data}, console.log(data));
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    const {dataHab} = this.state;
    console.log('dataHab', dataHab);

    return (
      <View style={{backgroundColor: '#f00', flex: 1}}>
      
      

        {dataHab ? (
          
          <View style={{marginTop: 20, marginHorizontal: 20}}>
            {dataHab.data.effect_entries.map(item => {
              return <Text style={{fontSize: 18}}>{item.effect}</Text>;
            })}
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  }
}
