import { CHANGE_THEME } from '../actionType';

export const changeTheme = (mode) => (dispatch) => {
    dispatch({
        type: CHANGE_THEME,
        payload: mode,
    });
};
