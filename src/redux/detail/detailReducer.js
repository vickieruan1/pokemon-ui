import { FETCH_DETAIL_FAILURE, FETCH_DETAIL_REQUEST, FETCH_DETAIL_SUCCESS } from "./detailTypes"

const initialState = {
    loading: false,
    data: [],
    error: ""
}

const detailReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_DETAIL_REQUEST:
            return {
                ...state,
                loading: true
            }
        case FETCH_DETAIL_SUCCESS:
            return {
                ...state,
                loading: false,
                data: action.payload,
                error: ""
            }
        case FETCH_DETAIL_FAILURE:
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

export default detailReducer