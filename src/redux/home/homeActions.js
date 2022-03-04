import { FETCH_HOME_FAILURE, FETCH_HOME_REQUEST, FETCH_HOME_SUCCESS } from "./homeTypes"
import axios from 'axios'

export const fetchHomeRequest = () => {
    return {
        type: FETCH_HOME_REQUEST
    }
}

const fetchHomeSuccess = data => {
    return {
        type: FETCH_HOME_SUCCESS,
        payload: data
    }
}

const fetchHomeFailure = error => {
    return {
        type: FETCH_HOME_FAILURE,
        payload: error
    }
}

//fetchHome action creaters, by using thunk middlewre, this fn will expect return another function
export const fetchHome = () => {
    return (dispatch) => {
        fetchHomeRequest()
        axios.get("https://pokeapi.co/api/v2/pokemon?limit=151")
            .then(response => {
                const data = response.data.results
                dispatch(fetchHomeSuccess(data))
            })
            .catch(error => {
                const errorMsg = error.message
                dispatch(fetchHomeFailure(errorMsg))
            })
    }
}