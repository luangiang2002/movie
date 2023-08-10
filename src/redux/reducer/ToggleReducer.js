import { SHORT_LIST_FAIL, SHORT_LIST_REQUEST, SHORT_LIST_SUCCESS } from '../actionType';

export const ShortReducer = (state = { short: [], loading: true }, action) => {
    const { payload, type } = action;

    switch (type) {
        case SHORT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
            };
        case SHORT_LIST_SUCCESS:
            return {
                ...state,
                short: payload,
                loading: false,
            };
        case SHORT_LIST_FAIL:
            return {
                ...state,
                short: null,
                error: payload,
            };

        default:
            return state;
    }
};
