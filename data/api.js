import React from "react";
import { AsyncStorage } from "react-native";
const DECKS_KEY = "UdaciCards:decks";
const NOTIFICATION_KEY = "UdaciCards:notifications";
import { Notifications } from "expo";
import * as Permissions from 'expo-permissions'

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

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY).then(
        Notifications.cancelAllScheduledNotificationsAsync
    );
}

function createNotification() {
    return {
        title: "Your quiz!",
        body: "Remember to do your quiz for today!",
        ios: {
            sound: true
        }
    };
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then(data => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
                    if (status === "granted") {
                        Notifications.cancelAllScheduledNotificationsAsync();

                        let tomorrow = new Date();
                        tomorrow.setDate(tomorrow.getDate() + 1);
                        tomorrow.setHours(0);
                        tomorrow.setMinutes(1);

                        Notifications.scheduleLocalNotificationAsync(createNotification(), {
                            time: tomorrow,
                            repeat: "day"
                        });

                        AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
                    }
                });
            }
        });
}
