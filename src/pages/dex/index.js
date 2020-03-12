/* eslint-disable prettier/prettier */
import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import axios from '../../api/api'

export default class Dex extends Component {
  
  state={
    dados: this.props.navigation.state.params.data,
    spriteShiny: false
  }

  componentWillMount(){
  
  }

  getEvo = () => {
    const id = this.state.dados.data.id;
    console.log(id)
    axios.get(`https://pokeapi.co/api/v2/evolution-chain/${id}`).then(data => {
        console.log('evo', data)
    })
    .catch(error => {
      console.log(error)
    })

  }

  getPrev(){
    const idSearch = this.state.dados.data.id-1
    axios.get(`https://pokeapi.co/api/v2/pokemon/${idSearch}`).then(data => {
        this.setState({dados: data, spriteShiny: false})
    })
    .catch(error => {
      console.log(error)
    })
  }

  getNetx(){
    const idSearch = this.state.dados.data.id+1
    axios.get(`https://pokeapi.co/api/v2/pokemon/${idSearch}`).then(data => {
        this.setState({dados: data, spriteShiny: false})
    })
    .catch(error => {
      console.log(error)
    })
  }
  
  render() {
    const {dados, spriteShiny} = this.state;

    console.log('deu aq', dados);
    
    return (
      <View style={styles.container}>
        <View style={styles.nameContainer}>
        <Text style={styles.number}> {dados.data.id} </Text>
          <Text style={styles.nome}>
            {' '}
            {dados.data.name.charAt(0).toUpperCase() +
              dados.data.name.slice(1)}{' '}
          </Text>

          <View style={{
            alignItems: 'center',
            margin: 10
          }}>
            <Text style={{color: '#fff'}}>
              Tipo
            </Text>
            {dados.data.types.map(tipo => {
              return(
                <Text style={{color: '#fff'}}>
                  {tipo.type.name.charAt(0).toUpperCase() +
                    tipo.type.name.slice(1)}
                </Text>
              )
            })}
          </View>
      </View>
      
      { !spriteShiny ?
      <View style={styles.containerImage}>
        <Image source={{uri: dados.data.sprites.front_default}} style={styles.sprite}>
        </Image>
        <Image source={{uri: dados.data.sprites.back_default}} style={styles.sprite}>
        </Image>
      </View>
      :
      <View style={styles.containerImage}>
        <Image source={{uri: dados.data.sprites.front_shiny}} style={styles.sprite}>
        </Image>
        <Image source={{uri: dados.data.sprites.back_shiny}} style={styles.sprite}>
        </Image>
      </View>
      }
      <TouchableOpacity style={styles.button}
      onPress={() => {this.setState({spriteShiny: !spriteShiny})}}>
        <Text style={styles.buttonText}>
          {!spriteShiny ? "Ver sprite shiny" : "Ver sprite normal"}
        </Text>
      </TouchableOpacity>

      <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 10, marginBottom: 10}}>
      
        <View style={styles.containerHeight}>
          <Text style={styles.titleHeight}>Altura</Text>
          <Text style={styles.textHeight}>{dados.data.height}</Text>
        </View>

        <View style={styles.containerWeight}>
          <Text style={styles.titleWeight}>Peso</Text>
          <Text style={styles.textWeight}>{dados.data.weight}</Text>
        </View>

      </View>

      <View style={styles.containerHabilidades}>
      <Text style={styles.titleHabilidades}> Habilidades </Text>
      <View style={styles.conteinerItensHabilidades}>
        {
          dados.data.abilities.map(item =>{
            return(
              <TouchableOpacity style={styles.buttonAbility}
              onPress={() => this.props.navigation.navigate('Ability', {
                title: item.ability.name.charAt(0).toUpperCase() + item.ability.name.slice(1),
                link: item.ability.url
              })}>
                <Text style={styles.buttonTextAbility}>
                  {item.ability.name.charAt(0).toUpperCase() + item.ability.name.slice(1)}
                </Text>
              </TouchableOpacity>
            )
          })
        }
      </View>
      </View>

      <View style={{flexDirection: 'row', justifyContent: 'space-between', marginHorizontal: 20, marginVertical: 50}}>
        <TouchableOpacity onPress={() => { this.getPrev()}}>
        <Text style={{color: '#fff'}}>
          Anterior
        </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => { this.getNetx()}}>

        <Text style={{color: '#fff'}}>
          Próximo
        </Text>
        </TouchableOpacity>
      </View>

      </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f00',
    flex: 1,
  },
  nameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  nome: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#fff',
    alignSelf: 'center',


  },
  number: {
    margin: 10,
    fontSize: 16,

  },
  containerImage:{
    flexDirection: 'row',
    justifyContent: 'center'
  },
  sprite: {
    width: 150, 
    height: 150, 
    alignSelf: 'center',
  },
  button:{
    alignSelf: 'center'
  },
  buttonText:{
    color: '#fff'
  },
  containerHeight:{
    justifyContent: 'space-evenly',
    marginHorizontal: 120,
    marginVertical: 5  
  },
  titleHeight:{
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center'

  },
  textHeight:{
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center'


  },
  containerWeight:{
    
    justifyContent: 'space-evenly',
    marginHorizontal: 120,
    marginVertical: 5
    },
    titleWeight:{
      color: '#fff',
      fontSize: 18,
      alignSelf: 'center'


    },
    textWeight:{
      color: '#fff',
      fontSize: 18,
      alignSelf: 'center'


    },
    
  containerHabilidades:{
    marginTop: 10,  
  },
  titleHabilidades:{
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 10
  },
  conteinerItensHabilidades:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  buttonAbility:{

  },
  buttonTextAbility:{
    fontSize: 16,
    color: '#fff'
  }
});
