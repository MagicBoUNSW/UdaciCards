import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainRoute from './routes/MainRoute'
import {getDecks} from "./data/api";


export default class App extends React.Component {
    state = {
        decks: {}
    };
    refresh = () => {
        getDecks().then(decks =>
            this.setState({ decks: decks ? decks : {} })
        );
    };

    componentDidMount() {
        this.refresh();
    }

  render() {
    return (
        <View style={{ flex: 1 }}>
          <MainRoute
              screenProps={{
                decks: this.state.decks,
                  refresh: () => this.refresh()
              }}
          />
        </View>
    );
  }
}
