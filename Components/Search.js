import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'

    class Search extends React.Component {

        constructor(props) {
            super(props)
                
                this.page = 0
                this.totalPages = 0
                this.searchedText= ""
            // Creer les  proprietes de  notre component custom Search
                this.state = { 
                
                    films: [],
                    isLoading: false // Par defaut a false car il n'y a pas de chargement tant qu'on ne lance pas de recherche
            }

           // this.searchedText= ""
        }

            _loadFilms() {

                if (this.searchedText.length > 0 ) { //Seulement si le texte recherche n'est pas vide

                    this.setState({ isLoading: true }) // Lancement du chargement

                    getFilmsFromApiWithSearchedText(this.searchedText, this.page+1).then(data => {
                        this.page = data.page
                        this.totalPages = data.total_pages
                        this.setState({ 
                            films: [ ...this.state.films, ...data.results ], // = films: this.state.films.concat(data.results)
                            isLoading: false // Arret du chargement
                        })
                    })
            }
            }


            _displayLoading(){

                if (this.state.isLoading) {

                    return (
                        <View style={styles.loading_container}>
                            <ActivityIndicator size='large' />
                        </View>
                    )
                }

            }


            _searchTextInputChanged(text) {

                this.searchedText = text //Modification du  texte recherche a chaque saisie de texte, sana passer par le setState
            }

            _searchFilms () {

                this.page = 0
                this.totalPages = 0
                this.setState({
                    films: []
                }, () => {

                    console.log("Page : " + this.page + " / TotalPages : " + this.totalPages + " / Nombres de films : " + this.state.films.length );
                
                this._loadFilms()

                })                
            }

            _displayDetailForFilm = (idFilm) => {

                this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })                
            }

        render() {
            return(
            
                <View style={styles.main_container}>

                <TextInput 
                    onSubimitEditing= {() => this._searchFilms()} 
                    onChangeText= {(text) => this._searchTextInputChanged(text)}
                    style={styles.textinput}
                    placeholder="Titre du film"
                />

                <Button style={{ height: 50, }} title="Rechercher" onPress={() => this._searchFilms() }/>

                <FlatList
                    data={this.state.films}

                    extraData= { this.props.favoritesFilm }
    // extraData pour expliquer a la FlatList aue d'autres donnees doivent etre prises en compte si on lui demande de se re-rendre
                    
                    keyExtractor={(item) => item.id.toString()}
                    
                    renderItem={({item}) => 
                        <FilmItem 
                            film={item} 
        // Ajout d'une props isFilmFavorite pour indiquer a l'item d'afficher un coeur ou non
                            isFilmFavorite={(this.props.favoritesFilm.findIndex(film => film.id === item.id) !== -1) ? true : false}
                            displayDetailForFilm={this._displayDetailForFilm}/>}
                />

                onEndReachedThreshold={0.5}
                    onEndReached={() => {
                        if (this.page < this.totalPages) {

                            this._loadFilms()
                        }
                    }}

                {this._displayLoading()}
            
                </View>
            )
         }
    }

    const styles = StyleSheet.create ({

        main_container: {
            
            flex: 1
        },

        textinput : {

            marginLeft: 5,
            marginRight: 5,
            height: 50,
            borderColor: '#000000',
            borderWidth: 1,
            paddingLeft: 5,
    },

    loading_container : {

        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})


const mapStateToProps = state => {
    return {
        favoritesFilm: state.favoritesFilm
    }
}

export default connect(mapStateToProps)(Search)