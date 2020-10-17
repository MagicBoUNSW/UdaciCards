import React from "react";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";


const styles = StyleSheet.create({
    containerComplete: {
        flex: 1,
        padding: 20,
        justifyContent: "space-between"
    },
    Invalid: {flex: 1, justifyContent: "center"},
    Quiz: {flex: 1, padding: 20},
    button: {
        alignItems: "center",
        padding: 10,
        margin: 10
    },
    text: {fontSize: 28, textAlign: "center"},
    title: {
        fontSize: 40,
        textAlign: "center",
        fontWeight: "bold"
    }
});

class QuizView extends React.Component {
    componentWillMount() {
        this.init();
    }

    init = () => {
        const deck = this.props.navigation.getParam("deck");
        this.setState({
            deck,
            answeredCards: [],
            currentCard:
                deck.questions[Math.floor(Math.random() * deck.questions.length)]
        });
    };


    answer = Correct => {
        const {
            answeredCards,
            currentCard,
            deck: {questions}
        } = this.state;
        let answered = answeredCards;
        answered.push({
            question: currentCard.question,
            Correct
        });

        const nextCards = questions.filter(i => {
            return answeredCards.findIndex(a => a.question === i.question) < 0;
        });

        this.setState(state => {
            return {
                ...state,
                showAnswer: false,
                currentCard:
                    nextCards[Math.floor(Math.random() * nextCards.length)],
                answeredCards: answered,
            };
        });
    };


    render() {
        const {answeredCards, currentCard, deck, showAnswer} = this.state;
        console.log(currentCard)
        return deck.questions.length == 0 ? (
            <View style={styles.Invalid}>
                <Text style={{fontSize: 22, textAlign: "center"}}>
                    There are no cards in the deck.
                </Text>
            </View>
        ) : currentCard ? (
            <View style={styles.Quiz}>
                <View style={{flex: 1}}>
                    <Text>
                        {answeredCards.length + 1} / {deck.questions.length}
                    </Text>
                    <TouchableOpacity
                        style={{backgroundColor: "transparent"}}
                        onPress={() => this.setState({showAnswer: !showAnswer})}
                    >
                    {showAnswer
                        ?
                        <Text style={styles.title}>ANSWER</Text>
                        :
                        <Text style={styles.title}>QUESTION</Text>
                    }
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={{backgroundColor: "transparent"}}
                        onPress={() => this.setState({showAnswer: !showAnswer})}
                    >

                        {showAnswer
                            ?
                            <Text style={styles.text}>{currentCard.answer}</Text>
                            :
                            <Text style={styles.text}>{currentCard.question}</Text>
                        }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: "blue"}]}
                    onPress={() => this.setState({showAnswer: !showAnswer})}
                >
                    {showAnswer
                        ?
                        <Text style={{color: "#FFFFFF"}}>Show question</Text>
                        :
                        <Text style={{color: "#FFFFFF"}}>Show answer</Text>
                    }
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: "red"}]}
                    onPress={() => {
                        this.answer(true);
                    }}
                >
                    <Text style={{color: "#FFFFFF"}}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, {backgroundColor: "green"}]}
                    onPress={() => {
                        this.answer(false);
                    }}
                >
                    <Text style={{color: "#FFFFFF"}}>Incorrect</Text>
                </TouchableOpacity>
            </View>
        ) : (
            <View style={styles.containerComplete}>
                <Text style={styles.text}>Quiz Complete !</Text>
                <Text style={styles.text}>
                    You corrected {" "}
                    {(
                        (answeredCards.filter(i => {
                                return i.Correct;
                            }).length /
                            deck.questions.length) *
                        100
                    ).toFixed(3)}
                    %
                </Text>
                <View>
                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: "#008000"}]}
                        onPress={() => {
                            this.init();
                        }}
                    >
                        <Text style={{color: "#FFFFFF"}}>Restart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, {backgroundColor: "#000000"}]}
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}
                    >
                        <Text style={{color: "#FFFFFF"}}>Return to Deck</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}


export default QuizView
