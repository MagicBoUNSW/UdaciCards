import React from "react";
import {
    createBottomTabNavigator
} from "react-navigation-tabs";
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation'
import DeckList from "../components/DeckList";
import AddDesk from "../components/AddDesk";
import {Icon} from 'react-native-elements'
import AddCard from "../components/AddCard";
import QuizView from "../components/QuizView";
import DeckView from "../components/DeckView";
import {blue, green, white} from "../data/colors";

const Tabs = createBottomTabNavigator(
    {
        Decks: {
            screen: DeckList,
            navigationOptions: {
                tabBarLabel: "Decks",
                tabBarIcon: ({focused, tintColor}) => (
                    <Icon
                        name={focused ? "home" : "home"}
                        size={25}
                        color={tintColor}
                    />
                )
            }
        },

        "Add Desk": {
            screen: AddDesk,
            navigationOptions: {
                tabBarLabel: "Add Deck",
                tabBarIcon: ({ focused, tintColor }) => (
                    <Icon
                        name={focused ? "add" : "add"}
                        size={25}
                        color={tintColor}
                    />
                )
            }
        }
    },
    {
        tabBarOptions: {
            activeTintColor: blue,
            inactiveTintColor: green
        }
    },
    {
        initialRouteName: "Home"
    }
);

export default createAppContainer(createStackNavigator(
    {
        DeckList: {
            screen: Tabs,
            navigationOptions: {
                headerStyle: {
                    backgroundColor: blue
                },
                headerTintColor: white,
                headerTitleStyle: {
                    fontWeight: "bold"
                }
            }
        },
        DeckView: {
            screen: DeckView
        },
        AddCard: {
            screen: AddCard
        },
        QuizView: {
            screen: QuizView
        }
    },
    {
        initialRouteName: "DeckList"
    }
));

