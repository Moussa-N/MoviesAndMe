import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer, createBottomTabNavigator } from 'react-navigation'
import Search from '../Components/Search'
import FilmDetail from '../Components/FilmDetail'
import Favorites from '../Components/Favorites'



const SearchStackNavigator = createStackNavigator({

    Search: {

        screen: Search,
        navigationOptions:{

            title: "Rechercher"

        }
    },

    FilmDetail: {

        screen: FilmDetail

    }
})


const MoviesTabNavigator = createBottomTabNavigator ({
    Search: {
        screen: SearchStackNavigator,
        navigationOptions: {
            tabBarOptions: () => { //rendu icone par les images
                return <Image
                    source={ require('../Images/ic_search.png')}
                    style= {Style.icon} />
            }
        }
    },

    Favorites: {
        screen: Favorites,
        navigationOptions: {
            tabBarOptions: () => {
                return <Image
                    source={ require('../Images/ic_favorite.png')}
                    style= {Style.icon} />
                }
        }
    },

    tabBarOptions: {
        showLabel: false, // On masque les titre
        showIcon: true, //On affiche les images
        activeBackgroundColor: "#DDDDDD",
        inactiveBackgroundColor: "FFFFFF"
    }
})


const styles = StyleSheet.create({
    icon: {
        width: 30,
        height: 30
    }
})

export default createAppContainer(MoviesTabNavigator)