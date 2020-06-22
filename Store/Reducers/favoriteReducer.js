const initialState = { favoritesFilm: []}


function toggleFavorite(state = initialState, action) {

    let nextState
    switch(action, type){
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoriteFilm.findIndex(item => item.id === action.value.id)
            if (favoriteFilmIndex !== -1) {
                // Suppression
                nextState = {
                    ...state,
                    favoritesFilm: state.favoritesFilm.filter( (item, index) => index !== favoriteFilmIndex)
                }
            }
            else {
                // Ajout
                nextState = {
                    ...state,
                    favoritesFilm: [ ...state.favoritesFilm, action.value ]
                }
            }
            return nexState || state
        default:
            return state
    }
}

export default toggleFavorite