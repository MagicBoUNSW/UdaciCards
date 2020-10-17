import React from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity} from "react-native";
import {addCard, formatTitle} from "../data/api";


const styles = StyleSheet.create({
    button: {
        alignItems: "center",
        padding: 10,
        backgroundColor: "blue",
        margin: 10
    },
    container: { flex: 1, padding: 20 },
    input: {
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        padding: 5
    }
});

class AddCard extends React.Component{
    constructor(props) {
        super(props);
        this.state = { question: "", answer: "" };
    }

    submit() {
        const deck = this.props.navigation.getParam("deck", {});
        console.log(deck)
        const {question,answer} = this.state
        if (question === '' ){
            alert("Please enter a question for this card.");
        } else if (answer === ''){
            alert("Please enter a answer for this card.");
        } else {
            addCard(formatTitle(deck.title), {
                question: this.state.question,
                answer: this.state.answer
            }).then(() => {
                this.props.navigation.state.params.refreshDeck();
                this.props.navigation.goBack();
                alert("Card added successfully!");
            });
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        style={[styles.input, { marginBottom: 10 }]}
                        placeholder="Question"
                        maxLength={40}
                        value={this.state.question}
                        onChangeText={question => this.setState({ question })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Answer"
                        maxLength={40}
                        value={this.state.answer}
                        onChangeText={answer => this.setState({ answer })}

                    />
                </View>
                <TouchableOpacity
                    style={[styles.button, { marginBottom:50 }]}
                    onPress={() => {
                        this.submit();
                    }}
                >
                    <Text style={{ color: "#FFFFFF" }}>Submit</Text>
                </TouchableOpacity>
            </View>
        );
    }
}


export default AddCard
