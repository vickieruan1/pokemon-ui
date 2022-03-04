import { FETCH_HOME_FAILURE, FETCH_HOME_REQUEST, FETCH_HOME_SUCCESS } from "./homeTypes"

const initialState = {
    loading: false,
    data: [],
    error: ""
}

const homeReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_HOME_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_HOME_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ""
            }
        case FETCH_HOME_FAILURE:
            return {
                ...state,
                loading: false,
                data: [],
                error: action.payload
            }
        default: 
            return state
    }
}

export default homeReducer