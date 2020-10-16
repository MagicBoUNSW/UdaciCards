import React from "react";
import {View, Text, StyleSheet, TouchableWithoutFeedback, ScrollView} from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    deck: {
        padding: 15
    },
    text: {
        textAlign: "center",
        fontSize: 26
    },
    button: {
        alignItems: "center",
        padding: 15,
        backgroundColor: "blue",
        margin: 15
    }
});

class DeckList extends React.Component{
    render() {
        const { decks } = this.props.screenProps;
        console.log(decks)
        return (
            <ScrollView style={styles.container}>
                {
                    Object.keys(decks).map(key => {
                        const deck = decks[key];
                        return (
                            <TouchableWithoutFeedback
                                key={key}
                                onPress={() => {
                                    this.props.navigation.navigate("DeckView", {
                                        deck
                                    });
                                }}
                            >
                                <View style={styles.deck}>
                                    <Text style={styles.text}>{deck.title}</Text>
                                    <Text style={[styles.text, {fontSize: 16}]}>
                                        {deck.questions.length} flashcards
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        );
                    })
                }
            </ScrollView>
        );
    }
}


export default DeckList
