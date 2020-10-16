import React from "react";
import { AsyncStorage } from "react-native";
const DECKS_KEY = "UdaciCards:decks";

export function formatTitle(title) {
    return title.replace(/\s+/g, "");
}

export function getDecks() {
    return AsyncStorage.getItem(DECKS_KEY).then(JSON.parse);
}

export function getDeck(title) {
    return AsyncStorage.getItem(DECKS_KEY)
        .then(JSON.parse)
        .then(data => {
            return data[title];
        });
}

export function saveDeck(title) {
    return AsyncStorage.getItem(DECKS_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                data = {};
            }
            data[title] = { title: title, questions: [] };
            return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
        });
}

export function removeDeck(title) {
    return AsyncStorage.getItem(DECKS_KEY)
        .then(JSON.parse)
        .then(data => {
            delete data[title];
            return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
        });
}

export function addCard(title, card) {
    return AsyncStorage.getItem(DECKS_KEY)
        .then(JSON.parse)
        .then(data => {
            data[title].questions.push({
                question: card.question,
                answer: card.answer
            });
            return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
        });
}

export function removeCard(title, question) {
    return AsyncStorage.getItem(DECKS_KEY)
        .then(JSON.parse)
        .then(data => {
            data[title].questions = data[title].questions.filter(
                c => c.question !== question
            );
            return AsyncStorage.setItem(DECKS_KEY, JSON.stringify(data));
        });
}
