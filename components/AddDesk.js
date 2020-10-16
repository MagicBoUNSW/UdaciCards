import React from "react";
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";

import { saveDeck, formatTitle } from "../data/api";

const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        padding: 10,
        backgroundColor: "blue",
        margin: 10
    },
    container: { flex: 1, padding: 20 },
    text: { textAlign: "center", fontSize: 26, marginBottom: 10 }
});

class AddDesk extends React.Component{
    constructor(props) {
        super(props);
        this.state = { text: "" };
    }

    submit() {
        const decks = this.props.navigation.getParam("decks", {});
        let titleFormatted = formatTitle(this.state.text);
        if (!titleFormatted) {
            alert("Please enter a title for this deck.");
        }
        else {
            saveDeck(titleFormatted).then(newDeck => {
                this.props.screenProps.refresh();
                this.props.navigation.goBack();
                this.props.navigation.navigate("DeckView", {
                    deck: { title: titleFormatted, questions: [] }
                });
            });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <Text style={styles.text}>What is the title of your new deck?</Text>
                    <TextInput
                        style={{
                            height: 40,
                            borderColor: "gray",
                            borderWidth: 1,
                            backgroundColor: "#FFFFFF",
                            padding: 5
                        }}
                        underlineColorAndroid="transparent"
                        placeholder="Deck Title"
                        value={this.state.text}
                        maxLength={40}
                        onChangeText={text => this.setState({ text })}
                    />
                </View>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => {
                        this.submit();
                    }}
                >
                    <Text style={{ color: "#FFFFFF" }}>Create Deck</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default AddDesk
