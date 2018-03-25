/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity
} from 'react-native';

import Repo from './components/Repo';
import NewRepoModal from './components/NewRepoModal';

export default class App extends Component {
  state = {
    modalVisible: false,
    repos: []
  };

  _addRepository = async (newRepoText) => {
    const repoCall = await fetch(`https://api.github.com/repos/${newRepoText}`);
    const response = await repoCall.json();

    const repository = {
      id: response.id,
      thumbnail: response.owner.avatar_url,
      title: response.name,
      author: response.owner.login
    }

    this.setState({
      modalVisible: false,
      repos: [
        ...this.state.repos,
        repository
      ]
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Minicurso React Native</Text>
          <TouchableOpacity onPress={ () => this.setState( {modalVisible: true} ) }>
            <Text style={styles.headerButton}>+</Text>
          </TouchableOpacity>
        </View>

        <ScrollView contentContainerStyle={styles.repoList}>
          { this.state.repos.map( repo => <Repo key={repo.id} data={repo} /> ) }
        </ScrollView>

        <NewRepoModal onCancel={ () => this.setState({ modalVisible:false }) } 
        onAdd={this._addRepository}
        visible={this.state.modalVisible}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
  },
  header: {
    height: (Platform.OS === 'ios') ? 70 : 50,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  headerButton: {
    fontSize:24,
    fontWeight: 'bold'
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  repoList: {
    padding: 20
  }
});
