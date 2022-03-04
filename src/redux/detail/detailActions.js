import { FETCH_DETAIL_FAILURE, FETCH_DETAIL_REQUEST, FETCH_DETAIL_SUCCESS } from "./detailTypes"
import axios from 'axios'

export const fetchDetailRequest = () => {
    return {
        type: FETCH_DETAIL_REQUEST
    }
}

const fetchDetailSuccess = data => {
    return {
        type: FETCH_DETAIL_SUCCESS,
        payload: data
    }
}

const fetchDetailFailure = error => {
    return {
        type: FETCH_DETAIL_FAILURE,
        payload: error
    }
}

export const fetchDetail = (id) => {
    return (dispatch) => {
        fetchDetailRequest()
        axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
            .then(pokemonResponse => {
                const speciesUrl = pokemonResponse.data.species.url
                axios.get(speciesUrl)
                .then(speciesResponse => {
                    const evolutionUrl = speciesResponse.data.evolution_chain.url
                    axios.get(evolutionUrl)
                    .then(evolutionResponse => {
                        const evolutions = [evolutionResponse.data.chain.species]
                        let evo = evolutionResponse.data.chain.evolves_to[0]
                        while (evo != null) {
                            evolutions.push(evo.species)
                            evo = evo.evolves_to[0]
                        }
                        const index = evolutions.findIndex(({url})=> url.match(/\d+/g)[1] === id)

                        const processedData = {
                            ...pokemonResponse.data,
                            typeArray: pokemonResponse.data.types.map((item) => item.type.name),
                            evolveTo: evolutions.length - 1 >= index + 1 ? evolutions[index + 1]: null,
                            evolveFrom: index - 1 >= 0 ? evolutions[index - 1]: null
                        }
                        dispatch(fetchDetailSuccess(processedData))
                    })

                })
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchDetailFailure(errorMsg))
            })
    }
}

