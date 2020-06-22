import React from 'react'
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native'
import { getImageFromApi } from '../API/TMDBApi'


    class FilmItem extends React.Component {

        _displayFavoriteImage() {
            if (this.props.isFilmFavorite) {
                // Si la props isFilmFavorite vaut true, on affiche le coeur
                return (
                    <Image
                        style= {styles.favorite_image}
                        source={require('../Images/ic_favorite.png')}
                    />
                )
            }
        }
        render() {

            const film = this.props.film

            const displayDetailForFilm = this.props.displayDetailForFilm

// De ligne 21 a 23 egual aussi a const { film, displayDetailForFilm } = this.props
            
            
            return(

                <TouchableOpacity 
                    onPress={() => displayDetailForFilm(film.id) }
                    style={styles.main_container}>

                    <Image
                        style={styles.image}
                        source={{uri: getImageFromApi(film.poster_path)}}
                    />

                <View style={styles.content_container}>

                    <View style={styles.header_container}>

                        {this._displayFavoriteImage()}

                        <Text style={styles.title_text}>{film.title} </Text>
                        <Text style={styles.vote_text}> {film.vote_average} </Text>
                    </View>
                

                <View style={styles.description_container}>
                    <Text style={styles.description_text} numberOfLines={6} >{film.overview}</Text>
                    {/* numberofLines permet de couper un texte sur un certains nombres de lignes si celui ci est trop long. Ici sur 6 lignes*/}
                </View>

                <View style={styles.date_container}>
                    <Text style={styles.date_text} > Sorti le {film.release_date} </Text>
                </View>

                </View>
                </TouchableOpacity>
            )
        }
    }


        const styles = StyleSheet.create ({

            main_container: {

                flexDirection: 'row',
                height: 190
            },

            image: {

                width:120,
                height: 180,
                margin: 5,
                color: '#666666'
            },

            content_container: {

                flex: 1,
                margin: 5
            },

            header_container: {

                flex: 3,
                flexDirection: 'row'
            },

            title_text: {

                fontSize: 20,
                fontWeight: "bold",
                flex: 1,
                flexWrap: 'wrap',
                paddingRight: 5
            },

            vote_text: {

                fontSize: 26,
                fontWeight: 'bold',
                color: '#666666'
            },

            description_container: {

                flex: 7
            },

            description_text: {

                fontStyle: 'italic',
                color: '#666666'
            },

            date_container: {

                flex: 1
            },

            date_text: {

                fontSize: 14,
                textAlign: 'right'

            },

            favorite_image: {
                width: 25,
                height: 25,
                marginRight: 5
            }
        })

export default FilmItem